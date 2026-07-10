#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
from html import unescape
from datetime import datetime, timedelta, timezone
import json
import math
import os
import re
import threading
import time
import xml.etree.ElementTree as ET

try:
    import psycopg
except ImportError:
    psycopg = None


ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "4188"))
HOST = os.environ.get("HOST", "0.0.0.0" if "PORT" in os.environ else "127.0.0.1")
TIMEOUT = 12
CACHE_SECONDS = {
    "aircraft": 20,
    "route": 3600,
    "weather": 300,
    "bitcoin": 120,
    "news": 300,
    "deployment_summary": 30,
}
cache = {}
DATABASE_URL = os.environ.get("DATABASE_URL", "").strip()
DEPLOYMENT_POLL_TOKEN = os.environ.get("DEPLOYMENT_POLL_TOKEN", "").strip()
DEPLOYMENT_POLL_INTERVAL = int(os.environ.get("DEPLOYMENT_POLL_INTERVAL", "60"))
NEWQUAY_BASE = {"lat": 50.4406, "lon": -4.9954}
AIR_AMBULANCE_IDS = ["G-CRWL", "G-CNLL", "HLE01", "HLE1", "HLE20", "HLE20Z", "HELIMED01", "HELIMED1", "CAAT07", "407933", "40812C"]
AIR_AMBULANCE_HEX = ["407933", "40812C"]
deployment_state = {"last_poll_at": None, "last_error": None, "polling": False}


def json_response(handler, payload, status=200):
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def fetch_json(url):
    request = Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": "SkyWatchWallDisplay/1.0 PaulMayIndustries",
        },
    )
    with urlopen(request, timeout=TIMEOUT) as response:
        return json.loads(response.read().decode("utf-8"))


def fetch_text(url):
    request = Request(
        url,
        headers={
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "User-Agent": "SkyWatchWallDisplay/1.0",
        },
    )
    with urlopen(request, timeout=TIMEOUT) as response:
        return response.read().decode("utf-8", errors="replace")


def clean_text(value):
    return re.sub(r"\s+", " ", unescape(value or "")).strip()


def parse_airnav_time(value):
    match = re.search(r"\b([01]?\d|2[0-3]):([0-5]\d)\b", value or "")
    return f"{match.group(1).zfill(2)}:{match.group(2)}" if match else ""


def parse_airnav_route(html):
    if "Just a moment" in html and "challenges.cloudflare.com" in html:
        return None
    text = clean_text(re.sub(r"<[^>]+>", " ", html))
    airport_pattern = r"([A-Z]{3,4})\s*[-–]\s*([^|•]+?)"
    airports = re.findall(airport_pattern, text)
    origin = airports[0] if len(airports) >= 1 else None
    destination = airports[1] if len(airports) >= 2 else None

    labels = {
        "scheduledDeparture": r"(?:Scheduled departure|Departure|STD)\D{0,30}([0-2]?\d:[0-5]\d)",
        "estimatedDeparture": r"(?:Estimated departure|Actual departure|Departed)\D{0,30}([0-2]?\d:[0-5]\d)",
        "scheduledArrival": r"(?:Scheduled arrival|Arrival|STA)\D{0,30}([0-2]?\d:[0-5]\d)",
        "estimatedArrival": r"(?:Estimated arrival|ETA|Arriving)\D{0,30}([0-2]?\d:[0-5]\d)",
    }
    times = {}
    for key, pattern in labels.items():
        match = re.search(pattern, text, flags=re.I)
        if match:
            times[key] = parse_airnav_time(match.group(1))

    route = {
        "origin": {"iata": origin[0], "name": clean_text(origin[1])} if origin else None,
        "destination": {"iata": destination[0], "name": clean_text(destination[1])} if destination else None,
        **times,
    }
    if not any(route.values()):
        return None
    return route


def fetch_airnav_route(callsign):
    urls = [
        f"https://www.airnavradar.com/data/flights/{callsign}",
        f"https://www.airnavradar.com/data/flights/{callsign}/",
    ]
    for url in urls:
        route = parse_airnav_route(fetch_text(url))
        if route:
            return route
    return None


def metno_weather_code(symbol_code):
    symbol = (symbol_code or "").lower()
    if "thunder" in symbol:
        return 95
    if "snow" in symbol or "sleet" in symbol:
        return 71
    if "rain" in symbol:
        return 61
    if "fog" in symbol:
        return 45
    if "cloudy" in symbol:
        return 3
    if "partlycloudy" in symbol or "fair" in symbol:
        return 2
    return 0


def metno_rain_chance(amount, symbol_code):
    try:
        rain = float(amount or 0)
    except (TypeError, ValueError):
        rain = 0
    symbol = (symbol_code or "").lower()
    if rain >= 1:
        return 85
    if rain >= 0.4:
        return 70
    if rain >= 0.1:
        return 55
    if rain > 0:
        return 35
    if "rain" in symbol or "sleet" in symbol or "snow" in symbol:
        return 45
    if "cloud" in symbol:
        return 15
    return 5


def fetch_metno_weather(lat, lon):
    endpoint = f"https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat:.4f}&lon={lon:.4f}"
    data = fetch_json(endpoint)
    timeseries = data.get("properties", {}).get("timeseries", [])
    hourly_time = []
    hourly_temp = []
    hourly_precip = []
    hourly_chance = []
    hourly_code = []

    for item in timeseries[:36]:
        details = item.get("data", {}).get("instant", {}).get("details", {})
        next_hour = item.get("data", {}).get("next_1_hours", {})
        next_details = next_hour.get("details", {})
        symbol = next_hour.get("summary", {}).get("symbol_code") or item.get("data", {}).get("next_6_hours", {}).get("summary", {}).get("symbol_code")
        amount = next_details.get("precipitation_amount", 0)
        hourly_time.append(item.get("time"))
        hourly_temp.append(details.get("air_temperature"))
        hourly_precip.append(amount)
        hourly_chance.append(metno_rain_chance(amount, symbol))
        hourly_code.append(metno_weather_code(symbol))

    current_temp = hourly_temp[0] if hourly_temp else None
    return {
        "current": {"temperature_2m": current_temp},
        "hourly": {
            "time": hourly_time,
            "temperature_2m": hourly_temp,
            "precipitation_probability": hourly_chance,
            "precipitation": hourly_precip,
            "weather_code": hourly_code,
        },
    }


def cached(key, ttl, loader):
    now = time.time()
    item = cache.get(key)
    if item and now - item["time"] < ttl:
        return item["value"]
    value = loader()
    cache[key] = {"time": now, "value": value}
    return value


def query_number(params, name, default=None):
    raw = params.get(name, [default])[0]
    try:
        return float(raw)
    except (TypeError, ValueError):
        return default


def utc_now():
    return datetime.now(timezone.utc)


def iso(value):
    if not value:
        return None
    if isinstance(value, str):
        return value
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc).isoformat()


def central_tracker_available():
    return bool(DATABASE_URL and psycopg)


def central_tracker_status():
    if not DATABASE_URL:
        return "Central deployment tracker not configured"
    if not psycopg:
        return "Central deployment tracker unavailable - psycopg not installed"
    if deployment_state.get("last_error"):
        return f"Central deployment tracker retrying - {deployment_state['last_error']}"
    return "Central tracker live"


def db_connect():
    if not central_tracker_available():
        return None
    return psycopg.connect(DATABASE_URL, autocommit=True)


def ensure_deployment_table():
    with db_connect() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS air_ambulance_deployments (
              id BIGSERIAL PRIMARY KEY,
              active_key TEXT NOT NULL,
              aircraft_hex TEXT,
              registration TEXT,
              callsign TEXT,
              first_seen_at TIMESTAMPTZ NOT NULL,
              last_seen_at TIMESTAMPTZ NOT NULL,
              ended_at TIMESTAMPTZ,
              status TEXT,
              from_label TEXT,
              area_label TEXT,
              lat DOUBLE PRECISION,
              lon DOUBLE PRECISION,
              distance_from_newquay_base DOUBLE PRECISION,
              source TEXT,
              created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
            """
        )
        conn.execute(
            """
            CREATE UNIQUE INDEX IF NOT EXISTS idx_air_ambulance_active_sortie
            ON air_ambulance_deployments(active_key)
            WHERE ended_at IS NULL
            """
        )


def distance_miles(a, b):
    lat1, lon1, lat2, lon2 = map(math.radians, [float(a["lat"]), float(a["lon"]), float(b["lat"]), float(b["lon"])])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    h = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    return 3958.8 * 2 * math.atan2(math.sqrt(h), math.sqrt(1 - h))


def compact(value):
    return re.sub(r"[^A-Z0-9]", "", str(value or "").upper())


def aircraft_identity(item):
    return " ".join(
        str(item.get(key) or "")
        for key in ["flight", "callsign", "r", "registration", "reg", "hex", "icao", "id", "operator", "airline", "type", "t"]
    )


def matches_air_ambulance(item):
    identity = aircraft_identity(item).upper()
    compact_identity = compact(identity)
    return any(identifier.upper() in identity or compact(identifier) in compact_identity for identifier in AIR_AMBULANCE_IDS)


def normalize_aircraft(item, source):
    lat = item.get("lat")
    lon = item.get("lon")
    try:
      lat = float(lat)
      lon = float(lon)
    except (TypeError, ValueError):
      lat = lon = None
    return {
        "source": source,
        "hex": str(item.get("hex") or item.get("icao") or item.get("id") or "").upper(),
        "registration": item.get("r") or item.get("registration") or item.get("reg"),
        "callsign": clean_text(item.get("flight") or item.get("callsign") or item.get("call") or ""),
        "lat": lat,
        "lon": lon,
        "altitude": item.get("alt_baro", item.get("altitude")),
        "speed": item.get("gs", item.get("speed")),
    }


def appears_airborne(item):
    altitude = item.get("altitude")
    speed = item.get("speed")
    if altitude in {"ground", "on_ground"}:
        return False
    try:
        altitude = float(altitude)
    except (TypeError, ValueError):
        altitude = None
    try:
        speed = float(speed)
    except (TypeError, ValueError):
        speed = None
    if altitude is None and speed is None:
        return True
    return (altitude is not None and altitude > 250) or (speed is not None and speed > 35)


def aircraft_area_label(item):
    lat = item.get("lat")
    lon = item.get("lon")
    if lat is None or lon is None:
        return "Route unavailable"
    # Keep the backend lightweight; the browser has richer local place labelling.
    return f"{lat:.3f}, {lon:.3f}"


def aircraft_from_payload(payload, source):
    if isinstance(payload, dict):
        aircraft = payload.get("ac") or payload.get("aircraft") or payload.get("planes")
        if isinstance(aircraft, list):
            return [normalize_aircraft(item, source) for item in aircraft if isinstance(item, dict)]
        if any(key in payload for key in ["hex", "flight", "callsign", "lat", "lon"]):
            return [normalize_aircraft(payload, source)]
    return []


def fetch_air_ambulance_candidates():
    endpoints = []
    for hex_code in AIR_AMBULANCE_HEX:
        endpoints.extend([
            f"https://api.airplanes.live/v2/hex/{hex_code}",
            f"https://opendata.adsb.fi/api/v2/hex/{hex_code}",
            f"https://api.adsb.lol/v2/hex/{hex_code}",
        ])
    for ident in ["G-CRWL", "G-CNLL", "HLE01", "HLE20", "HELIMED1", "CAAT07"]:
        endpoints.append(f"https://api.airplanes.live/v2/callsign/{ident}")
    endpoints.extend([
        "https://api.airplanes.live/v2/point/50.4406/-4.9954/80",
        "https://api.adsb.lol/v2/lat/50.4406/lon/-4.9954/dist/80",
        "https://opendata.adsb.fi/api/v2/lat/50.4406/lon/-4.9954/dist/80",
    ])
    results = {}
    for endpoint in endpoints:
        try:
            payload = fetch_json(endpoint)
            source = urlparse(endpoint).hostname or "aircraft feed"
            for aircraft in aircraft_from_payload(payload, source):
                if not matches_air_ambulance(aircraft):
                    continue
                key = compact(aircraft.get("hex") or aircraft.get("registration") or aircraft.get("callsign"))
                if key:
                    results[key] = aircraft
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
            deployment_state["last_error"] = str(error)
    return list(results.values())


def poll_air_ambulance_deployments():
    if not central_tracker_available():
        return {"central": False, "status": central_tracker_status(), "lastPollAt": deployment_state.get("last_poll_at")}
    if deployment_state.get("polling"):
        return {"central": True, "status": "poll already running", "lastPollAt": deployment_state.get("last_poll_at")}
    deployment_state["polling"] = True
    now = utc_now()
    current_keys = set()
    try:
        ensure_deployment_table()
        candidates = fetch_air_ambulance_candidates()
        with db_connect() as conn:
            for aircraft in candidates:
                if aircraft.get("lat") is None or aircraft.get("lon") is None:
                    continue
                distance = distance_miles({"lat": aircraft["lat"], "lon": aircraft["lon"]}, NEWQUAY_BASE)
                active_key = compact(aircraft.get("hex") or aircraft.get("registration") or aircraft.get("callsign") or "air-ambulance")
                if distance <= 1:
                    conn.execute(
                        """
                        UPDATE air_ambulance_deployments
                        SET ended_at = %s, last_seen_at = %s, status = 'Returned to base',
                            area_label = 'Newquay base', lat = %s, lon = %s,
                            distance_from_newquay_base = %s, source = %s
                        WHERE active_key = %s AND ended_at IS NULL
                        """,
                        (now, now, aircraft.get("lat"), aircraft.get("lon"), distance, aircraft.get("source"), active_key),
                    )
                    continue
                if not appears_airborne(aircraft):
                    continue
                current_keys.add(active_key)
                conn.execute(
                    """
                    INSERT INTO air_ambulance_deployments
                      (active_key, aircraft_hex, registration, callsign, first_seen_at, last_seen_at, status, from_label, area_label, lat, lon, distance_from_newquay_base, source)
                    VALUES
                      (%s, %s, %s, %s, %s, %s, %s, 'Newquay base', %s, %s, %s, %s, %s)
                    ON CONFLICT (active_key) WHERE ended_at IS NULL DO UPDATE SET
                      last_seen_at = EXCLUDED.last_seen_at,
                      status = EXCLUDED.status,
                      area_label = EXCLUDED.area_label,
                      lat = EXCLUDED.lat,
                      lon = EXCLUDED.lon,
                      distance_from_newquay_base = EXCLUDED.distance_from_newquay_base,
                      source = EXCLUDED.source
                    """,
                    (
                        active_key,
                        aircraft.get("hex"),
                        aircraft.get("registration"),
                        aircraft.get("callsign"),
                        now,
                        now,
                        "Deployed",
                        aircraft_area_label(aircraft),
                        aircraft.get("lat"),
                        aircraft.get("lon"),
                        distance,
                        aircraft.get("source"),
                    ),
                )
            conn.execute(
                """
                UPDATE air_ambulance_deployments
                SET ended_at = %s, status = 'Ended'
                WHERE ended_at IS NULL
                  AND last_seen_at < %s
                """,
                (now, now - timedelta(minutes=90)),
            )
        deployment_state["last_poll_at"] = iso(now)
        deployment_state["last_error"] = None
        return {"central": True, "status": central_tracker_status(), "lastPollAt": deployment_state["last_poll_at"]}
    except Exception as error:
        deployment_state["last_error"] = str(error)
        return {"central": False, "status": central_tracker_status(), "error": str(error), "lastPollAt": deployment_state.get("last_poll_at")}
    finally:
        deployment_state["polling"] = False


def deployment_row_to_dict(row):
    return {
        "id": row[0],
        "activeKey": row[1],
        "aircraftHex": row[2],
        "registration": row[3],
        "callsign": row[4],
        "firstSeenAt": iso(row[5]),
        "lastSeenAt": iso(row[6]),
        "endedAt": iso(row[7]),
        "status": row[8],
        "from": row[9] or "Newquay base",
        "area": row[10] or "Route unavailable",
        "lat": row[11],
        "lon": row[12],
        "distanceFromNewquayBase": row[13],
        "source": row[14],
    }


def should_poll_deployments():
    last = deployment_state.get("last_poll_at")
    if not last:
        return True
    try:
        last_dt = datetime.fromisoformat(last)
    except ValueError:
        return True
    return utc_now() - last_dt > timedelta(seconds=DEPLOYMENT_POLL_INTERVAL)


def deployment_summary():
    if not central_tracker_available():
        return {"central": False, "count24h": None, "latest": None, "status": central_tracker_status(), "source": "local fallback", "lastPollAt": deployment_state.get("last_poll_at")}
    if should_poll_deployments():
        poll_air_ambulance_deployments()
    ensure_deployment_table()
    cutoff = utc_now() - timedelta(hours=24)
    with db_connect() as conn:
        count = conn.execute("SELECT COUNT(*) FROM air_ambulance_deployments WHERE first_seen_at >= %s", (cutoff,)).fetchone()[0]
        latest = conn.execute(
            """
            SELECT id, active_key, aircraft_hex, registration, callsign, first_seen_at, last_seen_at, ended_at,
                   status, from_label, area_label, lat, lon, distance_from_newquay_base, source
            FROM air_ambulance_deployments
            ORDER BY first_seen_at DESC
            LIMIT 1
            """
        ).fetchone()
    return {
        "central": True,
        "count24h": count,
        "latest": deployment_row_to_dict(latest) if latest else None,
        "status": central_tracker_status(),
        "source": "database",
        "lastPollAt": deployment_state.get("last_poll_at"),
    }


def recent_deployments():
    if not central_tracker_available():
        return {"central": False, "items": [], "status": central_tracker_status(), "source": "local fallback", "lastPollAt": deployment_state.get("last_poll_at")}
    if should_poll_deployments():
        poll_air_ambulance_deployments()
    ensure_deployment_table()
    cutoff = utc_now() - timedelta(hours=24)
    with db_connect() as conn:
        rows = conn.execute(
            """
            SELECT id, active_key, aircraft_hex, registration, callsign, first_seen_at, last_seen_at, ended_at,
                   status, from_label, area_label, lat, lon, distance_from_newquay_base, source
            FROM air_ambulance_deployments
            WHERE first_seen_at >= %s
            ORDER BY first_seen_at DESC
            LIMIT 50
            """,
            (cutoff,),
        ).fetchall()
    return {"central": True, "items": [deployment_row_to_dict(row) for row in rows], "status": central_tracker_status(), "source": "database", "lastPollAt": deployment_state.get("last_poll_at")}


def deployment_poll_loop():
    while True:
        poll_air_ambulance_deployments()
        time.sleep(max(30, DEPLOYMENT_POLL_INTERVAL))


class LiveFeedHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cross-Origin-Resource-Policy", "cross-origin")
        super().end_headers()

    def log_message(self, format, *args):
        print("%s - %s" % (self.address_string(), format % args))

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.handle_api(parsed)
            return
        if parsed.path in {"/demo", "/demo/"}:
            self.path = "/index.html"
        super().do_GET()

    def handle_api(self, parsed):
        params = parse_qs(parsed.query)
        try:
            if parsed.path == "/api/aircraft":
                self.handle_aircraft(params)
            elif parsed.path == "/api/route":
                self.handle_route(params)
            elif parsed.path == "/api/weather":
                self.handle_weather(params)
            elif parsed.path == "/api/postcode":
                self.handle_postcode(params)
            elif parsed.path == "/api/bitcoin":
                self.handle_bitcoin()
            elif parsed.path == "/api/news":
                self.handle_news()
            elif parsed.path == "/api/deployments/summary":
                self.handle_deployments_summary()
            elif parsed.path == "/api/deployments":
                self.handle_deployments()
            elif parsed.path == "/api/deployments/poll":
                self.handle_deployments_poll(params)
            else:
                json_response(self, {"error": "Unknown endpoint"}, 404)
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
            json_response(self, {"error": str(error)}, 502)

    def handle_aircraft(self, params):
        lat = query_number(params, "lat")
        lon = query_number(params, "lon")
        radius = int(query_number(params, "radiusNm", 43) or 43)
        if lat is None or lon is None:
            json_response(self, {"error": "lat and lon are required"}, 400)
            return

        endpoints = [
            f"https://api.adsb.lol/v2/lat/{lat}/lon/{lon}/dist/{radius}",
            f"https://opendata.adsb.fi/api/v2/lat/{lat}/lon/{lon}/dist/{radius}",
            f"https://api.airplanes.live/v2/point/{lat}/{lon}/{radius}",
        ]
        errors = []
        for endpoint in endpoints:
            try:
                data = cached(
                    f"aircraft:{endpoint}",
                    CACHE_SECONDS["aircraft"],
                    lambda endpoint=endpoint: fetch_json(endpoint),
                )
                json_response(self, {"source": urlparse(endpoint).hostname, "data": data})
                return
            except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
                errors.append(str(error))
        json_response(self, {"error": "Aircraft feeds unavailable", "details": errors}, 502)

    def handle_route(self, params):
        callsign = (params.get("callsign", [""])[0] or "").strip().upper()
        if not callsign:
            json_response(self, {"error": "callsign is required"}, 400)
            return

        try:
            route = cached(f"route:airnav:{callsign}", CACHE_SECONDS["route"], lambda: fetch_airnav_route(callsign))
            if route:
                json_response(self, {"source": "airnavradar.com", "data": {"route": route}})
                return
        except (HTTPError, URLError, TimeoutError, UnicodeDecodeError) as error:
            print(f"AirNavRadar route lookup failed for {callsign}: {error}")

        endpoint = f"https://api.adsbdb.com/v0/callsign/{callsign}"
        data = cached(f"route:adsbdb:{callsign}", CACHE_SECONDS["route"], lambda: fetch_json(endpoint))
        json_response(self, {"source": "adsbdb.com", "data": data})

    def handle_postcode(self, params):
        postcode = (params.get("postcode", [""])[0] or "").strip()
        if not postcode:
            json_response(self, {"error": "postcode is required"}, 400)
            return

        safe_postcode = postcode.replace(" ", "")
        endpoint = f"https://api.postcodes.io/postcodes/{safe_postcode}"
        data = cached(f"postcode:{safe_postcode.upper()}", 86400, lambda: fetch_json(endpoint))
        result = data.get("result") or {}
        if not result.get("latitude") or not result.get("longitude"):
            json_response(self, {"error": "postcode not found"}, 404)
            return
        json_response(
            self,
            {
                "source": "postcodes.io",
                "postcode": result.get("postcode") or postcode,
                "lat": result.get("latitude"),
                "lon": result.get("longitude"),
            },
        )

    def handle_weather(self, params):
        lat = query_number(params, "lat")
        lon = query_number(params, "lon")
        if lat is None or lon is None:
            json_response(self, {"error": "lat and lon are required"}, 400)
            return

        query = (
            "current=temperature_2m"
            "&hourly=temperature_2m,precipitation_probability,precipitation,weather_code"
            "&forecast_days=2&timezone=auto"
        )
        endpoint = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&{query}"
        errors = []
        try:
            data = cached(f"weather:openmeteo:{lat:.4f}:{lon:.4f}", CACHE_SECONDS["weather"], lambda: fetch_json(endpoint))
            json_response(self, {"source": "open-meteo.com", "data": data})
            return
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
            errors.append(f"open-meteo.com: {error}")

        try:
            data = cached(f"weather:metno:{lat:.4f}:{lon:.4f}", CACHE_SECONDS["weather"], lambda: fetch_metno_weather(lat, lon))
            json_response(self, {"source": "api.met.no", "data": data, "fallback": True, "details": errors})
            return
        except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
            errors.append(f"api.met.no: {error}")

        json_response(self, {"error": "Weather feeds unavailable", "details": errors}, 502)

    def handle_bitcoin(self):
        endpoint = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
        data = cached("bitcoin:usd:day", CACHE_SECONDS["bitcoin"], lambda: fetch_json(endpoint))
        json_response(self, {"source": "coingecko.com", "data": data})

    def handle_news(self):
        endpoint = "https://feeds.bbci.co.uk/news/rss.xml"

        def load_news():
            request = Request(
                endpoint,
                headers={
                    "Accept": "application/rss+xml, application/xml, text/xml",
                    "User-Agent": "SkyWatchWallDisplay/1.0",
                },
            )
            with urlopen(request, timeout=TIMEOUT) as response:
                root = ET.fromstring(response.read())
            items = []
            for item in root.findall("./channel/item")[:5]:
                title = item.findtext("title") or ""
                if title:
                    items.append({"title": unescape(title.strip())})
            return items

        data = cached("news:bbc", CACHE_SECONDS["news"], load_news)
        json_response(self, {"source": "BBC News", "items": data})

    def handle_deployments_summary(self):
        json_response(self, deployment_summary())

    def handle_deployments(self):
        json_response(self, recent_deployments())

    def handle_deployments_poll(self, params):
        if DEPLOYMENT_POLL_TOKEN:
            token = params.get("token", [""])[0]
            if token != DEPLOYMENT_POLL_TOKEN:
                json_response(self, {"error": "deployment poll token required"}, 403)
                return
        elif HOST not in {"127.0.0.1", "localhost"}:
            json_response(self, {"error": "manual deployment polling is disabled"}, 403)
            return
        json_response(self, poll_air_ambulance_deployments())


if __name__ == "__main__":
    if central_tracker_available():
        threading.Thread(target=deployment_poll_loop, daemon=True).start()
    server = ThreadingHTTPServer((HOST, PORT), LiveFeedHandler)
    print(f"Sky Watch live feeds running on {HOST}:{PORT}")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping live feeds.")
