# Sky Watch

For live feeds, run the included local server from this folder:

```bash
python3 live_server.py
```

Then open:

```text
http://127.0.0.1:4188/
```

Opening `index.html` directly still works as a demo/offline-style display, but the local server gives the app the best chance of using live aircraft, weather and market feeds.

For online hosting, see `DEPLOYMENT.md`. For wall iPad setup, see `IPAD_SETUP.md`. The app includes `Procfile`, `requirements.txt` and `render.yaml` so it can run as a small Python web service.

The app:

- Finds aircraft within a selected radius, defaulting to 50 miles.
- Promotes special aircraft first, then the nearest aircraft, into a large wall-screen spotlight.
- Fits an iPad-sized wall display in landscape and portrait orientations.
- Shows the local day, date, month and time in the header.
- Shows a washing-focused rain alert for the next 12 hours.
- Uses a scrolling live ticker for rain, aircraft, special alerts, local time and BTC.
- Adds breaking-news headlines to the live board when the news feed is available.
- Shows live BTC price in USD with a 6 hour trend arrow when the market feed is available.
- Starts in kiosk mode with controls hidden until `Controls` is tapped.
- Rotates the spotlight through the nearest aircraft.
- Shows movement status such as approaching, passing nearby, overhead or moving away.
- Shows flight number, airline, altitude, origin, destination and distance.
- Converts aircraft speed to mph for the display.
- Shows aircraft type when the aircraft feed includes it.
- Tracks closest aircraft today and lowest altitude seen.
- Highlights air ambulance, Coastguard, rescue and military aircraft.
- Includes an optional chime for special aircraft. It only sounds after `Chime on` is tapped.
- Includes a discreet test alert button so you can check the air ambulance alert on the wall display.
- Keeps an always-visible Air Ambulance Watch tile, even when the aircraft is not currently airborne.
- Keeps a 48 hour on-device log of military aircraft seen within 5 miles.
- Uses offline airline colour badges so the display still works without logo downloads.
- Keeps a compact real map/radar view with darkened OpenStreetMap tiles, animated scan effects, range rings, compass labels, a legend and aircraft markers.
- Auto-tracks air ambulance, Coastguard and military aircraft on the map with stronger labels and short movement trails.
- Adds Cornwall Air Ambulance live wording for heading your way, landed near a town, heading towards RCHT, heading towards Derriford Hospital, or heading back to Newquay base.
- Shows a flashing close-range alert when Cornwall Air Ambulance comes within 3 miles of the saved user location, with optional sound when `Chime on` is enabled.
- Uses browser location when you press `Locate`.
- Remembers the last saved home location after `Locate` or a manual coordinate refresh.
- Refreshes automatically every 60 seconds for wall-mounted use.
- Uses the included live-feed server to avoid common browser feed blocks.
- Falls back to demo data if public ADS-B feeds are unavailable.
- Credits Paul May as the developer.

## Live Data Note

ADS-B feeds normally provide aircraft position, callsign, speed, heading and altitude. They do not reliably include route origin and destination. The app marks live route fields as `Route data needed` unless a separate route lookup service is added.

Route origin and destination usually need a separate provider such as AeroDataBox, Aviationstack, FlightAware or a FlightRadar-style route service. Keep API keys on the server, not in browser JavaScript.

## Map Note

The map uses Leaflet and OpenStreetMap tiles from the internet. If the wall display is offline, the panel falls back to the canvas radar background.

## Weather Note

The rain alert uses Open-Meteo through the live-feed server when available. If the forecast cannot be reached, the aircraft display will continue to work and the ticker will show that rain watch is paused.

## Market Note

The live board uses CoinGecko through the live-feed server when available. If that feed rate-limits or blocks the display, BTC will show as loading/unavailable while the rest of the board continues to run.

## News Note

The live board uses BBC News RSS through the live-feed server. If the feed cannot be reached, the ticker simply continues with aircraft, rain, BTC and time.
