#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
from html import unescape
import json
import os
import re
import time
import xml.etree.ElementTree as ET


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
}
cache = {}


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
            "User-Agent": "SkyWatchWallDisplay/1.0",
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
        data = cached(f"weather:{lat:.4f}:{lon:.4f}", CACHE_SECONDS["weather"], lambda: fetch_json(endpoint))
        json_response(self, {"source": "open-meteo.com", "data": data})

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


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), LiveFeedHandler)
    print(f"Sky Watch live feeds running on {HOST}:{PORT}")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping live feeds.")
