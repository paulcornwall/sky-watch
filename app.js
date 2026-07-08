const elements = {
  radius: document.querySelector("#radiusSelect"),
  lat: document.querySelector("#latInput"),
  lon: document.querySelector("#lonInput"),
  locate: document.querySelector("#locateButton"),
  refresh: document.querySelector("#refreshButton"),
  kiosk: document.querySelector("#kioskButton"),
  displayMode: document.querySelector("#displayModeButton"),
  nightMode: document.querySelector("#nightModeButton"),
  nightDim: document.querySelector("#nightDimSelect"),
  nightSchedule: document.querySelector("#nightScheduleToggle"),
  nightStart: document.querySelector("#nightStartInput"),
  nightEnd: document.querySelector("#nightEndInput"),
  chime: document.querySelector("#chimeButton"),
  testAlert: document.querySelector("#testAlertButton"),
  changeLocation: document.querySelector("#changeLocationButton"),
  airAmbulanceZoom: document.querySelector("#airAmbulanceZoomToggle"),
  autoCollapse: document.querySelector("#autoCollapseToggle"),
  expandRadar: document.querySelector("#expandRadarButton"),
  expandRadarAlert: document.querySelector("#expandRadarAlertButton"),
  locationSetup: document.querySelector("#locationSetup"),
  postcodeInput: document.querySelector("#postcodeInput"),
  postcodeButton: document.querySelector("#postcodeButton"),
  setupLocate: document.querySelector("#setupLocateButton"),
  setupLater: document.querySelector("#setupLaterButton"),
  setupStatus: document.querySelector("#setupStatus"),
  localDay: document.querySelector("#localDay"),
  localDate: document.querySelector("#localDate"),
  localTime: document.querySelector("#localTime"),
  currentTemperature: document.querySelector("#currentTemperature"),
  weatherCondition: document.querySelector("#weatherCondition"),
  weatherRainSummary: document.querySelector("#weatherRainSummary"),
  weatherUpdatedTime: document.querySelector("#weatherUpdatedTime"),
  feedStatus: document.querySelector("#feedStatus"),
  wakeStatus: document.querySelector("#wakeStatus"),
  rainAlert: document.querySelector("#rainAlert"),
  rainAlertTitle: document.querySelector("#rainAlertTitle"),
  rainAlertText: document.querySelector("#rainAlertText"),
  rainChancePanel: document.querySelector("#rainChancePanel"),
  rainChanceValue: document.querySelector("#rainChanceValue"),
  tickerTrack: document.querySelector("#tickerTrack"),
  filter: document.querySelector("#filterInput"),
  rows: document.querySelector("#aircraftRows"),
  message: document.querySelector("#message"),
  count: document.querySelector("#aircraftCount"),
  nearest: document.querySelector("#nearestPlane"),
  updated: document.querySelector("#lastUpdated"),
  specialCount: document.querySelector("#specialCount"),
  airAmbulanceWatch: document.querySelector("#airAmbulanceWatch"),
  airAmbulanceWatchText: document.querySelector("#airAmbulanceWatchText"),
  militaryLogCount: document.querySelector("#militaryLogCount"),
  militaryLogText: document.querySelector("#militaryLogText"),
  airAmbulanceAlert: document.querySelector("#airAmbulanceAlert"),
  airAmbulanceAlertTitle: document.querySelector("#airAmbulanceAlertTitle"),
  airAmbulanceAlertText: document.querySelector("#airAmbulanceAlertText"),
  source: document.querySelector("#sourcePill"),
  center: document.querySelector("#centerCoords"),
  map: document.querySelector("#mapView"),
  mapLabel: document.querySelector("#mapLabel"),
  mapRangeLabel: document.querySelector("#mapRangeLabel"),
  canvas: document.querySelector("#radarCanvas"),
  spotlightLogo: document.querySelector("#spotlightLogo"),
  spotlightFlight: document.querySelector("#spotlightFlight"),
  spotlightAirline: document.querySelector("#spotlightAirline"),
  spotlightStatus: document.querySelector("#spotlightStatus"),
  spotlightFrom: document.querySelector("#spotlightFrom"),
  spotlightTo: document.querySelector("#spotlightTo"),
  spotlightDistance: document.querySelector("#spotlightDistance"),
  spotlightDirection: document.querySelector("#spotlightDirection"),
  spotlightAltitude: document.querySelector("#spotlightAltitude"),
  spotlightSpeed: document.querySelector("#spotlightSpeed"),
  spotlightType: document.querySelector("#spotlightType"),
  spotlightSeen: document.querySelector("#spotlightSeen"),
  closestToday: document.querySelector("#closestToday"),
  lowestToday: document.querySelector("#lowestToday"),
  spotlightCard: document.querySelector(".spotlight-card"),
};

const airlinePrefixes = {
  AAL: "American Airlines",
  ACA: "Air Canada",
  AFR: "Air France",
  AUR: "Aurigny",
  BAW: "British Airways",
  EIN: "Aer Lingus",
  EXS: "Jet2",
  DAL: "Delta Air Lines",
  DLH: "Lufthansa",
  EZY: "easyJet",
  FIN: "Finnair",
  IBE: "Iberia",
  JBU: "JetBlue",
  KLM: "KLM",
  LOG: "Loganair",
  QFA: "Qantas",
  QTR: "Qatar Airways",
  RYR: "Ryanair",
  SAS: "SAS",
  SWA: "Southwest Airlines",
  TOM: "TUI Airways",
  THY: "Turkish Airlines",
  UAE: "Emirates",
  UAL: "United Airlines",
  VIR: "Virgin Atlantic",
  WZZ: "Wizz Air",
};

const airlineBranding = {
  AAL: { label: "AA", colors: ["#d71920", "#1f4e9d"] },
  ACA: { label: "AC", colors: ["#111111", "#e31b23"] },
  AFR: { label: "AF", colors: ["#062b68", "#ed2939"] },
  AUR: { label: "GR", colors: ["#003b5c", "#f7d117"] },
  BAW: { label: "BA", colors: ["#075aaa", "#e31e2f"] },
  EIN: { label: "EI", colors: ["#00843d", "#ffffff"] },
  EXS: { label: "LS", colors: ["#d71920", "#f5c400"] },
  DAL: { label: "DL", colors: ["#c8102e", "#003a70"] },
  DLH: { label: "LH", colors: ["#05164d", "#ffcc00"] },
  EZY: { label: "U2", colors: ["#ff6600", "#ffffff"] },
  FIN: { label: "AY", colors: ["#0b1560", "#ffffff"] },
  IBE: { label: "IB", colors: ["#d71920", "#f6c500"] },
  JBU: { label: "B6", colors: ["#003876", "#00a3e0"] },
  KLM: { label: "KL", colors: ["#00a1de", "#ffffff"] },
  LOG: { label: "LM", colors: ["#00843d", "#ffffff"] },
  QFA: { label: "QF", colors: ["#e4002b", "#ffffff"] },
  QTR: { label: "QR", colors: ["#5c0632", "#ffffff"] },
  RYR: { label: "FR", colors: ["#073590", "#f1c933"] },
  SAS: { label: "SK", colors: ["#003d7c", "#ffffff"] },
  SWA: { label: "WN", colors: ["#304cb2", "#ffbf27"] },
  TOM: { label: "BY", colors: ["#70cbf4", "#d71920"] },
  THY: { label: "TK", colors: ["#d71920", "#ffffff"] },
  UAE: { label: "EK", colors: ["#d71920", "#ffffff"] },
  UAL: { label: "UA", colors: ["#005daa", "#00a3e0"] },
  VIR: { label: "VS", colors: ["#cc0000", "#ffffff"] },
  WZZ: { label: "W6", colors: ["#c6007e", "#00aeef"] },
};

const liveServerAvailable = ["http:", "https:"].includes(window.location.protocol);
const fallbackPosition = { lat: 51.5074, lon: -0.1278, label: "London demo" };
const savedPosition = loadSavedPosition();
const storedDisplayModePreference = window.localStorage.getItem("skyWatchDisplayMode");
const displayModeDefaulted = window.localStorage.getItem("skyWatchDisplayModeDefaulted") === "true";
const storedDisplayMode =
  savedPosition && !displayModeDefaulted
    ? true
    : storedDisplayModePreference == null
      ? Boolean(savedPosition)
      : storedDisplayModePreference !== "false";
const storedNightMode = window.localStorage.getItem("skyWatchNightMode") === "true";
const storedNightDim = window.localStorage.getItem("skyWatchNightDim") || "0.2";
const storedNightSchedule = window.localStorage.getItem("skyWatchNightSchedule") === "true";
const storedNightStart = window.localStorage.getItem("skyWatchNightStart") || "22:00";
const storedNightEnd = window.localStorage.getItem("skyWatchNightEnd") || "07:00";
const storedAirAmbulanceZoom = window.localStorage.getItem("skyWatchAirAmbulanceZoom") !== "false";
const storedAutoCollapse = window.localStorage.getItem("skyWatchAutoCollapseMap") !== "false";
const storedRadius = window.localStorage.getItem("skyWatchRadius");
const airAmbulancePhoto = "./assets/cornwall-air-ambulance-photo.png";
const logoCache = new Map();

let state = {
  aircraft: [],
  filtered: [],
  userPosition: null,
  loading: false,
  rotation: 0,
  refreshTimer: null,
  updateClock: null,
  dateClock: null,
  weatherTimer: null,
  bitcoinTimer: null,
  spotlightTimer: null,
  staleTimer: null,
  burnInTimer: null,
  nightScheduleTimer: null,
  spotlightIndex: 0,
  lastUpdatedAt: null,
  lastRefreshAttemptAt: null,
  feedError: "",
  refreshFailures: 0,
  chimeEnabled: false,
  chimedAircraft: new Set(),
  audioContext: null,
  closestToday: null,
  lowestToday: null,
  map: null,
  mapReady: false,
  homeMarker: null,
  rangeRings: [],
  planeMarkers: [],
  trackLines: [],
  trackHistory: new Map(),
  selectedAircraftKey: "",
  airAmbulanceAlerted: new Set(),
  lastAirAmbulance: null,
  testAlertUntil: 0,
  militaryLog: loadMilitaryLog(),
  routeCache: new Map(),
  radarExpanded: false,
  lastInputAt: Date.now(),
  airAmbulanceZoomEnabled: storedAirAmbulanceZoom,
  autoCollapseMap: storedAutoCollapse,
  wakeLock: null,
  wakeLockSupported: "wakeLock" in navigator,
  displayMode: storedDisplayMode,
  nightMode: storedNightMode,
  nightDim: Number(storedNightDim),
  nightScheduleEnabled: storedNightSchedule,
  nightStart: storedNightStart,
  nightEnd: storedNightEnd,
  weather: [],
  currentTemperature: null,
  weatherUpdatedAt: null,
  weatherError: "",
  weatherFailures: 0,
  bitcoin: null,
  bitcoinUpdatedAt: null,
  news: [],
  newsUpdatedAt: null,
  newsTimer: null,
  autoCollapseTimer: null,
  controlsHideTimer: null,
  feedMode: liveServerAvailable ? "live server" : "browser direct",
  locationMode: savedPosition ? "saved home" : "fallback location",
  homeLabel: savedPosition?.label || fallbackPosition.label,
};

const demoAircraft = [
  {
    flight: "HLE01",
    airline: "Cornwall Air Ambulance",
    altitude: 1800,
    aircraftType: "AW169 Helicopter",
    from: "Newquay Heliport",
    to: "Emergency response",
    distance: 6.8,
    bearing: 245,
    heading: 64,
    speed: 132,
    lat: 51.44,
    lon: -0.3,
  },
  {
    flight: "BAW492",
    airline: "British Airways",
    altitude: 32000,
    aircraftType: "Airbus A320",
    from: "London Heathrow",
    to: "Gibraltar",
    distance: 11.4,
    bearing: 34,
    heading: 220,
    speed: 448,
    lat: 51.66,
    lon: -0.02,
  },
  {
    flight: "EZY17KT",
    airline: "easyJet",
    altitude: 21000,
    aircraftType: "Airbus A319",
    from: "Manchester",
    to: "Milan Malpensa",
    distance: 24.8,
    bearing: 130,
    heading: 155,
    speed: 392,
    lat: 51.22,
    lon: 0.46,
  },
  {
    flight: "DLH8KJ",
    airline: "Lufthansa",
    altitude: 38000,
    aircraftType: "Airbus A321neo",
    from: "Frankfurt",
    to: "Dublin",
    distance: 38.5,
    bearing: 286,
    heading: 300,
    speed: 471,
    lat: 51.73,
    lon: -1.02,
  },
  {
    flight: "RYR66HJ",
    airline: "Ryanair",
    altitude: 14500,
    aircraftType: "Boeing 737-800",
    from: "Stansted",
    to: "Valencia",
    distance: 43.7,
    bearing: 79,
    heading: 190,
    speed: 318,
    lat: 51.89,
    lon: 0.88,
  },
];

const airAmbulanceWaypoints = {
  rcht: { label: "RCHT", detail: "Royal Cornwall Hospital, Truro", lat: 50.2668, lon: -5.0946 },
  derriford: { label: "Derriford Hospital", detail: "Plymouth", lat: 50.4169, lon: -4.1136 },
  base: { label: "Newquay base", detail: "Cornwall Air Ambulance base", lat: 50.4406, lon: -4.9954 },
};

const localPlaces = [
  { name: "Newquay", lat: 50.4155, lon: -5.0737 },
  { name: "Truro", lat: 50.2632, lon: -5.051 },
  { name: "Treliske", lat: 50.2668, lon: -5.0946 },
  { name: "Falmouth", lat: 50.1526, lon: -5.0663 },
  { name: "Camborne", lat: 50.213, lon: -5.3007 },
  { name: "Redruth", lat: 50.2332, lon: -5.2267 },
  { name: "St Austell", lat: 50.3383, lon: -4.7931 },
  { name: "Bodmin", lat: 50.4715, lon: -4.7243 },
  { name: "Liskeard", lat: 50.4542, lon: -4.4652 },
  { name: "Launceston", lat: 50.6369, lon: -4.3601 },
  { name: "Penzance", lat: 50.1188, lon: -5.5376 },
  { name: "Helston", lat: 50.1028, lon: -5.2709 },
  { name: "St Ives", lat: 50.2084, lon: -5.4909 },
  { name: "Hayle", lat: 50.1855, lon: -5.4213 },
  { name: "Padstow", lat: 50.5389, lon: -4.9361 },
  { name: "Wadebridge", lat: 50.5168, lon: -4.8366 },
  { name: "Bude", lat: 50.8289, lon: -4.5446 },
  { name: "Plymouth", lat: 50.3755, lon: -4.1427 },
  { name: "Derriford", lat: 50.4169, lon: -4.1136 },
  { name: "Saltash", lat: 50.4096, lon: -4.2251 },
  { name: "Tavistock", lat: 50.5494, lon: -4.1442 },
];

function milesToNauticalMiles(miles) {
  return miles / 1.15078;
}

function milesToMeters(miles) {
  return miles * 1609.344;
}

function formatAltitude(value) {
  if (value == null || value === "ground") return "On ground";
  return `${Number(value).toLocaleString()} ft`;
}

function formatDistance(value) {
  if (!Number.isFinite(value)) return "--";
  return `${value.toFixed(value < 10 ? 1 : 0)} mi`;
}

function formatDirection(value) {
  if (!Number.isFinite(Number(value))) return "--";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return `${directions[Math.round(Number(value) / 45) % 8]} · ${Math.round(Number(value))}°`;
}

function formatSpeed(value) {
  const knots = Number(value);
  if (!Number.isFinite(knots) || knots <= 0) return "Unknown";
  return `${Math.round(knots * 1.15078).toLocaleString()} mph`;
}

function formatAge(timestamp) {
  if (!timestamp) return "Not loaded";
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.round(seconds / 60)}m ago`;
}

function formatHoursMinutesSince(timestamp) {
  if (!timestamp) return "Waiting";
  const totalMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatHour(value) {
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatClock(value = new Date(), includeSeconds = false) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    ...(includeSeconds ? { second: "2-digit" } : {}),
  }).format(value);
}

function formatTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const match = String(value).match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
    return match ? `${match[1].padStart(2, "0")}:${match[2]}` : "";
  }
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(date);
}

function formatLeadTime(timestamp) {
  const minutes = Math.max(0, Math.round((timestamp - Date.now()) / 60000));
  if (minutes < 10) return "now";
  if (minutes < 90) return `in ${minutes} min`;
  return `in ${Math.round(minutes / 60)} hr`;
}

function weatherConditionLabel(code) {
  const value = Number(code);
  if (!Number.isFinite(value)) return "Weather waiting";
  if (value === 0) return "Clear";
  if ([1, 2].includes(value)) return "Partly cloudy";
  if (value === 3) return "Cloudy";
  if ([45, 48].includes(value)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(value)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(value)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(value)) return "Snow";
  if ([95, 96, 99].includes(value)) return "Thunder";
  return "Weather live";
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "Unavailable";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normaliseLocationLabel(value, fallback = "Saved home") {
  const label = String(value || "").trim().replace(/\s+/g, " ");
  if (!label) return fallback;
  if (/^[a-z]{1,2}\d/i.test(label.replace(/\s/g, ""))) return label.toUpperCase();
  return label;
}

function isFallbackPosition(position) {
  return (
    Number.isFinite(position?.lat) &&
    Number.isFinite(position?.lon) &&
    Math.abs(Number(position.lat) - fallbackPosition.lat) < 0.0001 &&
    Math.abs(Number(position.lon) - fallbackPosition.lon) < 0.0001
  );
}

function setFallbackPreview(message = "Using London demo location. Set your real base under Controls > Location.") {
  elements.lat.value = fallbackPosition.lat.toFixed(5);
  elements.lon.value = fallbackPosition.lon.toFixed(5);
  state.userPosition = { ...fallbackPosition };
  state.homeLabel = fallbackPosition.label;
  state.locationMode = "fallback location";
  hideLocationSetup();
  setMessage(message, true);
  refreshAircraft();
  fetchWeather(state.userPosition);
}

function loadSavedPosition() {
  try {
    const saved = JSON.parse(
      window.localStorage.getItem("skyWatchHome") ||
        window.localStorage.getItem("planesNearbyHome") ||
        "null",
    );
    if (Number.isFinite(saved?.lat) && Number.isFinite(saved?.lon)) {
      if (isFallbackPosition(saved)) return null;
      return {
        lat: Number(saved.lat),
        lon: Number(saved.lon),
        label: normaliseLocationLabel(saved.label),
      };
    }
  } catch (error) {
    console.warn(error);
  }
  return null;
}

function savePosition(position) {
  try {
    const saved = JSON.stringify({
      lat: Number(position.lat),
      lon: Number(position.lon),
      label: position.label || "",
      savedAt: Date.now(),
    });
    window.localStorage.setItem("skyWatchHome", saved);
    window.localStorage.setItem("planesNearbyHome", saved);
  } catch (error) {
    console.warn(error);
  }
}

function showLocationSetup(message = "Enter postcode or use auto locate") {
  elements.locationSetup.hidden = false;
  elements.setupStatus.textContent = message;
  window.setTimeout(() => elements.postcodeInput?.focus(), 50);
}

function hideLocationSetup() {
  elements.locationSetup.hidden = true;
}

function applyHomePosition(position, message = "Base position saved on this device.") {
  const lat = Number(position.lat);
  const lon = Number(position.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    setMessage("That location was not recognised.", true);
    return false;
  }
  elements.lat.value = lat.toFixed(5);
  elements.lon.value = lon.toFixed(5);
  const label = normaliseLocationLabel(position.label);
  savePosition({ lat, lon, label });
  state.userPosition = { lat, lon, label };
  state.homeLabel = label;
  state.locationMode = `saved home · ${label}`;
  state.displayMode = true;
  hideLocationSetup();
  applyDisplayPreferences();
  setMessage(message, true);
  refreshAircraft();
  fetchWeather(state.userPosition);
  return true;
}

async function lookupPostcodeDirect(postcode) {
  const compactPostcode = postcode.replace(/\s+/g, "");
  const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(compactPostcode)}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Postcodes.io returned ${response.status}`);
  const data = await response.json();
  const result = data.result || {};
  return {
    postcode: result.postcode || postcode,
    lat: result.latitude,
    lon: result.longitude,
    source: "postcodes.io",
  };
}

async function setLocationFromPostcode() {
  const postcode = elements.postcodeInput.value.trim();
  if (!postcode) {
    elements.setupStatus.textContent = "Enter a postcode first";
    return;
  }
  elements.postcodeButton.disabled = true;
  elements.setupStatus.textContent = "Looking up postcode...";
  try {
    let payload;
    if (liveServerAvailable) {
      const url = new URL("/api/postcode", window.location.origin);
      url.search = new URLSearchParams({ postcode }).toString();
      try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) throw new Error(`Sky Watch postcode route returned ${response.status}`);
        payload = await response.json();
      } catch (serverError) {
        console.warn(serverError);
        elements.setupStatus.textContent = "Trying UK postcode service...";
        payload = await lookupPostcodeDirect(postcode);
      }
    } else {
      payload = await lookupPostcodeDirect(postcode);
    }
    const saved = applyHomePosition(
      { lat: Number(payload.lat), lon: Number(payload.lon), label: normaliseLocationLabel(payload.postcode || postcode) },
      `Base position saved from ${normaliseLocationLabel(payload.postcode || postcode)}.`,
    );
    if (saved) elements.setupStatus.textContent = `Saved ${normaliseLocationLabel(payload.postcode || postcode)}`;
  } catch (error) {
    console.warn(error);
    elements.setupStatus.textContent = "Postcode not found. Check spacing, e.g. TR1 3LQ, or use auto locate.";
  } finally {
    elements.postcodeButton.disabled = false;
  }
}

function loadMilitaryLog() {
  try {
    const entries = JSON.parse(window.localStorage.getItem("skyWatchMilitaryLog") || "[]");
    if (Array.isArray(entries)) return pruneMilitaryLog(entries);
  } catch (error) {
    console.warn(error);
  }
  return [];
}

function pruneMilitaryLog(entries) {
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  return entries.filter((entry) => Number(entry.time) >= cutoff);
}

function saveMilitaryLog() {
  try {
    window.localStorage.setItem("skyWatchMilitaryLog", JSON.stringify(state.militaryLog));
  } catch (error) {
    console.warn(error);
  }
}

function updateMilitaryLog() {
  state.militaryLog = pruneMilitaryLog(state.militaryLog);
  const nearbyMilitary = state.aircraft.filter(
    (aircraft) => aircraft.specialReason === "Military" && Number.isFinite(aircraft.distance) && aircraft.distance <= 5,
  );

  for (const aircraft of nearbyMilitary) {
    const key = `${aircraftKey(aircraft)}:${new Date().toISOString().slice(0, 13)}`;
    if (state.militaryLog.some((entry) => entry.key === key)) continue;
    state.militaryLog.unshift({
      key,
      time: Date.now(),
      flight: aircraft.flight,
      service: displayServiceName(aircraft),
      distance: aircraft.distance,
      altitude: aircraft.altitude,
      status: aircraft.status,
    });
  }

  state.militaryLog = state.militaryLog.slice(0, 30);
  saveMilitaryLog();
}

function rainWindow() {
  const rainHours = state.weather.filter((hour) => hour.rainAmount > 0.1 || hour.rainChance >= 40);
  const firstRain = rainHours[0];
  const strongestRain = rainHours.reduce(
    (best, hour) => (!best || hour.rainChance > best.rainChance || hour.rainAmount > best.rainAmount ? hour : best),
    null,
  );
  return { firstRain, strongestRain, rainHours };
}

function rainChanceNextHours(hours = 3) {
  if (!state.weather.length) return { chance: null, firstRain: null, rainAmount: 0 };
  const now = Date.now();
  const windowEnd = now + hours * 60 * 60 * 1000;
  const hoursInWindow = state.weather.filter((hour) => hour.timestamp >= now - 10 * 60 * 1000 && hour.timestamp <= windowEnd);
  const sample = hoursInWindow.length ? hoursInWindow : state.weather.slice(0, hours);
  const chance = sample.reduce((max, hour) => Math.max(max, Number(hour.rainChance) || 0), 0);
  const rainAmount = sample.reduce((total, hour) => total + (Number(hour.rainAmount) || 0), 0);
  const firstRain = sample.find((hour) => Number(hour.rainAmount) > 0.1 || Number(hour.rainChance) >= 40) || null;
  return { chance, firstRain, rainAmount };
}

function forecastSummary24() {
  if (!state.weather.length) return "24h forecast unavailable";
  const temps = state.weather.map((hour) => Number(hour.temperature)).filter(Number.isFinite);
  const { firstRain, strongestRain } = rainWindow();
  const tempText = temps.length
    ? `${Math.round(Math.min(...temps))}-${Math.round(Math.max(...temps))}°C`
    : "temp unavailable";
  if (firstRain) {
    return `24h forecast: rain ${formatLeadTime(firstRain.timestamp)} · peak risk ${strongestRain?.rainChance || firstRain.rainChance}% · ${tempText}`;
  }
  return `24h forecast: dry outlook · ${tempText}`;
}

function updateForecastVisual() {
  if (!elements.rainChancePanel || !elements.rainChanceValue) return;
  const { chance, firstRain, rainAmount } = rainChanceNextHours(3);
  const mode = chance == null ? "unavailable" : chance >= 70 || rainAmount >= 1 ? "urgent" : firstRain ? "wet" : "dry";
  elements.rainChancePanel.className = `rain-chance-panel ${mode}`;
  elements.rainChanceValue.textContent = chance == null ? "Waiting" : `${Math.round(chance)}%`;
}

function bitcoinTrendLabel() {
  if (!state.bitcoin?.usd) return "BTC price loading";
  const price = formatCurrency(state.bitcoin.usd);
  const change = Number(state.bitcoin.usd_6h_change);
  if (!Number.isFinite(change)) return `BTC ${price} live`;
  const arrow = change >= 0 ? "▲" : "▼";
  return `BTC ${price} ${arrow} ${Math.abs(change).toFixed(1)}% over 6h`;
}

function renderTicker() {
  const items = [];
  const { firstRain, strongestRain } = rainWindow();
  if (Number.isFinite(state.currentTemperature)) {
    items.push(`Local temp ${Math.round(state.currentTemperature)}°C`);
  }
  items.push(forecastSummary24());

  if (firstRain) {
    items.push(`Rain ${formatLeadTime(firstRain.timestamp)} around ${formatHour(firstRain.time)} - bring washing in`);
    if (strongestRain && strongestRain !== firstRain) {
      items.push(`Heaviest shower risk ${formatHour(strongestRain.time)} at ${strongestRain.rainChance}%`);
    }
  } else if (state.weather.length) {
    items.push("Washing watch: no rain expected in the next 24 hours");
  } else {
    items.push("Weather feed unavailable - rain watch paused");
  }

  if (state.filtered[0]) {
    items.push(`Nearest track ${state.filtered[0].flight} ${formatDistance(state.filtered[0].distance)} away`);
  }

  if (state.locationMode === "fallback location") {
    items.push("Base location not set - using London demo preview");
  }

  const special = state.filtered.find((aircraft) => aircraft.specialReason);
  if (special) {
    items.push(special.airAmbulanceStatus || `${special.specialReason} nearby: ${special.flight} ${formatDistance(special.distance)} away`);
  } else if (state.lastAirAmbulance && Date.now() - state.lastAirAmbulance.seenAt < 15 * 60 * 1000) {
    items.push(`Air ambulance last seen ${placePhrase(state.lastAirAmbulance.aircraft)}`);
  }

  if (state.militaryLog[0]) {
    const latest = state.militaryLog[0];
    items.push(`Military log: ${latest.flight} within ${formatDistance(Number(latest.distance))} seen ${formatHour(latest.time)}`);
  }

  for (const item of state.news.slice(0, 3)) {
    items.push(`Breaking: ${item.title}`);
  }

  items.push(bitcoinTrendLabel());

  items.push(`Local time ${elements.localTime.textContent}`);
  const text = items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  elements.tickerTrack.innerHTML = `${text}${text}`;
}

function renderTemperature() {
  elements.currentTemperature.textContent = Number.isFinite(state.currentTemperature)
    ? `${Math.round(state.currentTemperature)}°C`
    : state.weatherError
      ? "Weather retrying"
      : "Waiting";
}

function staleMinutes() {
  if (!state.lastUpdatedAt) return null;
  return Math.floor((Date.now() - state.lastUpdatedAt) / 60000);
}

function renderFeedStatus() {
  const minutes = staleMinutes();
  const stale = minutes != null && minutes >= 5;
  const aircraftWarning = Boolean(state.feedError && (!state.lastUpdatedAt || Date.now() - state.lastUpdatedAt > 90000));
  const aircraftStatus = aircraftWarning
    ? state.lastUpdatedAt
      ? "aircraft retrying"
      : "aircraft waiting"
    : stale
      ? "aircraft stale"
      : state.lastUpdatedAt
        ? "aircraft live"
        : "aircraft waiting";
  const weatherStatus = state.weatherError
    ? state.weatherUpdatedAt
      ? "weather retrying"
      : "weather waiting"
    : state.weatherUpdatedAt
      ? "weather live"
      : "weather waiting";
  const location = state.locationMode === "fallback location" ? "London demo" : state.homeLabel || "Location waiting";
  const lastAircraft = state.lastUpdatedAt ? `aircraft ${formatClock(new Date(state.lastUpdatedAt))}` : "aircraft not loaded";
  const nextRefresh = state.lastRefreshAttemptAt ? `next aircraft refresh ${formatLeadTime(state.lastRefreshAttemptAt + 60000)}` : "next aircraft refresh waiting";
  const lastWeather = state.weatherUpdatedAt ? `weather ${formatClock(new Date(state.weatherUpdatedAt))}` : "weather not loaded";
  document.body.classList.toggle("data-stale", Boolean(stale || aircraftWarning || state.weatherError));
  elements.feedStatus.textContent = `${aircraftStatus} · ${weatherStatus} · ${location} · ${lastAircraft} · ${nextRefresh} · ${lastWeather}`;
}

function renderWeather() {
  if (!state.weather.length) {
    elements.rainAlert.classList.remove("active");
    elements.rainAlertTitle.textContent = "Rain watch";
    elements.rainAlertText.textContent = state.weatherError ? "Weather feed retrying" : "Waiting for weather";
    elements.weatherCondition.textContent = state.weatherError ? "Weather feed retrying" : "Waiting for weather";
    elements.weatherRainSummary.textContent = state.weatherError ? "Rain check paused" : "Checking next 3h";
    elements.weatherUpdatedTime.textContent = state.weatherUpdatedAt ? formatClock(new Date(state.weatherUpdatedAt)) : "Waiting";
    updateForecastVisual();
    renderTemperature();
    renderFeedStatus();
    renderTicker();
    return;
  }

  const nextRain = rainChanceNextHours(3);
  const currentWeather = state.weather.find((hour) => hour.timestamp >= Date.now() - 60 * 60 * 1000) || state.weather[0];
  elements.weatherCondition.textContent = state.weatherError ? "Weather feed retrying" : weatherConditionLabel(currentWeather?.code);
  elements.weatherUpdatedTime.textContent = state.weatherUpdatedAt ? formatClock(new Date(state.weatherUpdatedAt)) : "Waiting";
  elements.rainAlert.classList.toggle("active", Boolean(nextRain.firstRain));
  if (nextRain.firstRain) {
    elements.rainAlertTitle.textContent = "Incoming rain";
    elements.rainAlertText.textContent = `${formatLeadTime(nextRain.firstRain.timestamp)} at ${formatHour(nextRain.firstRain.time)} · ${Math.round(nextRain.chance)}% chance next 3h`;
    elements.weatherRainSummary.textContent = `${Math.round(nextRain.chance)}% · ${formatLeadTime(nextRain.firstRain.timestamp)}`;
  } else {
    elements.rainAlertTitle.textContent = "Washing safe";
    elements.rainAlertText.textContent = nextRain.chance == null
      ? "Rain chance unavailable"
      : `${Math.round(nextRain.chance)}% rain chance next 3h`;
    elements.weatherRainSummary.textContent = nextRain.chance == null
      ? "Rain chance unavailable"
      : `${Math.round(nextRain.chance)}% next 3h`;
  }
  if (nextRain.chance >= 75 || nextRain.rainAmount >= 1) elements.rainAlert.classList.add("urgent");
  else elements.rainAlert.classList.remove("urgent");
  updateForecastVisual();
  renderTemperature();
  renderFeedStatus();
  renderTicker();
}

async function fetchWeather(position) {
  if (!position) return;
  try {
    let response;
    if (liveServerAvailable) {
      const localUrl = new URL("/api/weather", window.location.origin);
      localUrl.search = new URLSearchParams({
        lat: String(position.lat),
        lon: String(position.lon),
      }).toString();
      response = await fetch(localUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`Weather live server returned ${response.status}`);
    } else {
      const directUrl = new URL("https://api.open-meteo.com/v1/forecast");
      directUrl.search = new URLSearchParams({
        latitude: String(position.lat),
        longitude: String(position.lon),
        current: "temperature_2m",
        hourly: "temperature_2m,precipitation_probability,precipitation,weather_code",
        forecast_days: "2",
        timezone: "auto",
      }).toString();
      response = await fetch(directUrl, { cache: "no-store" });
    }
    if (!response.ok) throw new Error(`Weather feed returned ${response.status}`);
    const payload = await response.json();
    const data = payload.data || payload;
    const now = Date.now();
    const times = data.hourly?.time || [];
    state.weather = times
      .map((time, index) => ({
        time,
        timestamp: new Date(time).getTime(),
        temperature: Number(data.hourly.temperature_2m?.[index]),
        rainChance: Number(data.hourly.precipitation_probability?.[index] || 0),
        rainAmount: Number(data.hourly.precipitation?.[index] || 0),
        code: Number(data.hourly.weather_code?.[index] || 0),
      }))
      .filter((hour) => hour.timestamp >= now - 60 * 60 * 1000)
      .slice(0, 24);
    state.currentTemperature = Number(data.current?.temperature_2m ?? state.weather[0]?.temperature);
    state.weatherUpdatedAt = Date.now();
    state.weatherError = "";
    state.weatherFailures = 0;
  } catch (error) {
    console.warn(error);
    state.weatherFailures += 1;
    state.weatherError = "weather feed retrying";
    try {
      const directUrl = new URL("https://api.open-meteo.com/v1/forecast");
      directUrl.search = new URLSearchParams({
        latitude: String(position.lat),
        longitude: String(position.lon),
        current: "temperature_2m",
        hourly: "temperature_2m,precipitation_probability,precipitation,weather_code",
        forecast_days: "2",
        timezone: "auto",
      }).toString();
      const response = await fetch(directUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`Weather feed returned ${response.status}`);
      const data = await response.json();
      const now = Date.now();
      const times = data.hourly?.time || [];
      state.weather = times
        .map((time, index) => ({
          time,
          timestamp: new Date(time).getTime(),
          temperature: Number(data.hourly.temperature_2m?.[index]),
          rainChance: Number(data.hourly.precipitation_probability?.[index] || 0),
          rainAmount: Number(data.hourly.precipitation?.[index] || 0),
          code: Number(data.hourly.weather_code?.[index] || 0),
        }))
        .filter((hour) => hour.timestamp >= now - 60 * 60 * 1000)
        .slice(0, 24);
      state.currentTemperature = Number(data.current?.temperature_2m ?? state.weather[0]?.temperature);
      state.weatherUpdatedAt = Date.now();
      state.weatherError = "";
      state.weatherFailures = 0;
    } catch (fallbackError) {
      console.warn(fallbackError);
      if (!state.weather.length) state.weather = [];
      if (!Number.isFinite(state.currentTemperature)) state.currentTemperature = null;
      state.weatherError = "weather feed retrying";
    }
  }
  renderWeather();
}

async function fetchBitcoin() {
  try {
    const url = liveServerAvailable
      ? "/api/bitcoin"
      : "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1";
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`BTC feed returned ${response.status}`);
    const payload = await response.json();
    const data = payload.data || payload;
    const prices = Array.isArray(data.prices) ? data.prices : [];
    const latest = prices[prices.length - 1];
    const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000;
    const baseline =
      prices.reduce((best, point) => {
        if (!Array.isArray(point) || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) return best;
        if (!best) return point;
        return Math.abs(point[0] - sixHoursAgo) < Math.abs(best[0] - sixHoursAgo) ? point : best;
      }, null) || latest;
    const latestPrice = Number(latest?.[1]);
    const baselinePrice = Number(baseline?.[1]);
    state.bitcoin = Number.isFinite(latestPrice)
      ? {
          usd: latestPrice,
          usd_6h_change: Number.isFinite(baselinePrice) && baselinePrice > 0
            ? ((latestPrice - baselinePrice) / baselinePrice) * 100
            : null,
        }
      : null;
    state.bitcoinUpdatedAt = Date.now();
  } catch (error) {
    console.warn(error);
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`BTC feed returned ${response.status}`);
      const data = await response.json();
      const prices = Array.isArray(data.prices) ? data.prices : [];
      const latest = prices[prices.length - 1];
      const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000;
      const baseline =
        prices.reduce((best, point) => {
          if (!Array.isArray(point) || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) return best;
          if (!best) return point;
          return Math.abs(point[0] - sixHoursAgo) < Math.abs(best[0] - sixHoursAgo) ? point : best;
        }, null) || latest;
      const latestPrice = Number(latest?.[1]);
      const baselinePrice = Number(baseline?.[1]);
      state.bitcoin = Number.isFinite(latestPrice)
        ? {
            usd: latestPrice,
            usd_6h_change: Number.isFinite(baselinePrice) && baselinePrice > 0
              ? ((latestPrice - baselinePrice) / baselinePrice) * 100
              : null,
          }
        : null;
    } catch (fallbackError) {
      console.warn(fallbackError);
      state.bitcoin = null;
    }
  }
  renderTicker();
}

async function fetchNews() {
  if (!liveServerAvailable) return;
  try {
    const response = await fetch("/api/news", { cache: "no-store" });
    if (!response.ok) throw new Error(`News feed returned ${response.status}`);
    const payload = await response.json();
    state.news = Array.isArray(payload.items) ? payload.items : [];
    state.newsUpdatedAt = Date.now();
  } catch (error) {
    console.warn(error);
    state.news = [];
  }
  renderTicker();
}

function updateDateTime() {
  const now = new Date();
  elements.localDay.textContent = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(now);
  elements.localDate.textContent = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
  elements.localTime.textContent = formatClock(now, true);
}

function formatAircraftType(value) {
  const knownTypes = {
    A319: "Airbus A319",
    A320: "Airbus A320",
    A20N: "Airbus A320neo",
    A321: "Airbus A321",
    A21N: "Airbus A321neo",
    A332: "Airbus A330-200",
    A333: "Airbus A330-300",
    A359: "Airbus A350-900",
    B738: "Boeing 737-800",
    B38M: "Boeing 737 MAX 8",
    B739: "Boeing 737-900",
    B744: "Boeing 747-400",
    B752: "Boeing 757-200",
    B763: "Boeing 767-300",
    B772: "Boeing 777-200",
    B77W: "Boeing 777-300ER",
    B788: "Boeing 787-8",
    B789: "Boeing 787-9",
    E190: "Embraer E190",
  };
  const type = String(value || "").trim().toUpperCase();
  return knownTypes[type] || value || "Type unknown";
}

function airlineCodeFromFlight(flight) {
  return String(flight || "").replace(/[^A-Z]/gi, "").slice(0, 3).toUpperCase();
}

function airlineFromFlight(flight, fallback) {
  if (fallback) return fallback;
  const prefix = airlineCodeFromFlight(flight);
  return airlinePrefixes[prefix] || "Unknown airline";
}

function brandingForFlight(flight) {
  const prefix = airlineCodeFromFlight(flight);
  const fallback = String(flight || "?").replace(/[^A-Z0-9]/gi, "").slice(0, 2).toUpperCase() || "??";
  return airlineBranding[prefix] || { label: fallback, colors: ["#4d5b55", "#9fb4aa"] };
}

function airlineLogoUrl(flight) {
  const prefix = airlineCodeFromFlight(flight);
  if (!airlineBranding[prefix]) return "";
  const branding = brandingForFlight(flight);
  if (!branding?.label || branding.label === "??") return "";
  return `https://images.kiwi.com/airlines/128x128/${encodeURIComponent(branding.label)}.png`;
}

function preloadLogo(src) {
  if (!src || logoCache.has(src)) return;
  const image = new Image();
  const entry = { loaded: false, failed: false };
  logoCache.set(src, entry);
  image.onload = () => {
    entry.loaded = true;
  };
  image.onerror = () => {
    entry.failed = true;
  };
  image.src = src;
}

function airlineLogoMarkup(aircraft, extraClass = "", id = "") {
  if (aircraft.specialReason === "Air ambulance") {
    return `
      <span ${id ? `id="${id}" ` : ""}class="airline-logo special-photo ${extraClass}" aria-label="Cornwall Air Ambulance photo" data-logo-key="AIR-AMBULANCE">
        <img src="${airAmbulancePhoto}" alt="" loading="eager" decoding="async" />
        <span class="logo-initials">AA</span>
      </span>
    `;
  }
  const branding = brandingForFlight(aircraft.flight);
  const logo = airlineLogoUrl(aircraft.flight);
  preloadLogo(logo);
  const label = escapeHtml(branding.label);
  const name = escapeHtml(`${aircraft.airline || "Airline"} logo`);
  const source = logo ? ` data-logo-src="${escapeHtml(logo)}"` : "";
  return `
    <span ${id ? `id="${id}" ` : ""}class="airline-logo ${extraClass}${logo ? "" : " logo-fallback"}" aria-label="${name}" data-logo-key="${escapeHtml(airlineCodeFromFlight(aircraft.flight))}"${source}>
      ${logo ? `<img src="${logo}" alt="" loading="eager" decoding="async" referrerpolicy="no-referrer" onload="this.parentElement.classList.add('logo-loaded')" onerror="this.remove(); this.parentElement.classList.add('logo-fallback')" />` : ""}
      <span class="logo-initials">${label}</span>
    </span>
  `;
}

function setSpotlightLogo(aircraft) {
  const branding = brandingForFlight(aircraft.flight);
  const key = airlineCodeFromFlight(aircraft.flight);
  const currentKey = elements.spotlightLogo?.dataset.logoKey || "";
  elements.spotlightLogo.style.setProperty("--logo-a", branding.colors[0]);
  elements.spotlightLogo.style.setProperty("--logo-b", branding.colors[1]);
  if (currentKey === key) return;
  elements.spotlightLogo.outerHTML = airlineLogoMarkup(aircraft, "spotlight-logo", "spotlightLogo");
  elements.spotlightLogo = document.querySelector("#spotlightLogo");
  elements.spotlightLogo.style.setProperty("--logo-a", branding.colors[0]);
  elements.spotlightLogo.style.setProperty("--logo-b", branding.colors[1]);
}

function routeAirportName(value) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  return String(value.name || value.airport || value.municipality || compactRouteName(value) || "").trim();
}

function routeAirportCode(value) {
  if (!value || typeof value === "string") return "";
  return String(value.iata_code || value.iata || value.icao_code || value.icao || "").trim().toUpperCase();
}

function routeLabel(name, code = "") {
  const routeName = String(name || "").trim();
  const routeCode = String(code || "").trim().toUpperCase();
  if (routeName && routeCode && !routeName.toUpperCase().includes(routeCode)) return `${routeName} ${routeCode}`;
  return routeName || routeCode || "";
}

function routeTimeLabel(scheduled, estimated, fallbackLabel) {
  const estimatedTime = formatTime(estimated);
  const scheduledTime = formatTime(scheduled);
  if (estimatedTime) return `Est ${estimatedTime}`;
  if (scheduledTime) return `${fallbackLabel} ${scheduledTime}`;
  return "";
}

function routeCellMarkup(name, code = "", time = "") {
  const routeName = String(name || "").trim();
  const routeCode = String(code || "").trim().toUpperCase();
  return `
    <span class="route-airport">
      <span>${escapeHtml(routeName || "Route lookup pending")}</span>
      ${routeCode ? `<small>${escapeHtml(routeCode)}</small>` : ""}
      ${time ? `<small class="route-time">${escapeHtml(time)}</small>` : ""}
    </span>
  `;
}

function displayServiceName(aircraft) {
  if (!aircraft) return "No aircraft in range";
  if (aircraft.specialReason === "Air ambulance") return "Cornwall Air Ambulance";
  if (aircraft.specialReason === "Coastguard") return "Coastguard Rescue";
  if (aircraft.specialReason === "Military") return aircraft.airline && aircraft.airline !== "Unknown airline" ? aircraft.airline : "Military aircraft";
  return aircraft.airline && aircraft.airline !== "Unknown airline" ? aircraft.airline : aircraft.flight;
}

function mapHeading(aircraft) {
  const heading = Number(aircraft.heading);
  if (Number.isFinite(heading) && heading > 0) return heading;
  const bearing = Number(aircraft.bearing);
  return Number.isFinite(bearing) ? bearing : 0;
}

function angleDelta(a, b) {
  return Math.abs(((a - b + 540) % 360) - 180);
}

function movementStatus(aircraft) {
  if (!aircraft) return "Waiting for movement";
  if (aircraft.distance <= 2) return "Passing overhead";
  const heading = Number(aircraft.heading);
  const bearing = Number(aircraft.bearing);
  if (!Number.isFinite(heading) || !Number.isFinite(bearing)) return "Passing nearby";
  const towardUser = (bearing + 180) % 360;
  const delta = angleDelta(heading, towardUser);
  if (delta <= 45) return "Approaching";
  if (delta >= 135) return "Moving away";
  return "Passing nearby";
}

function isAirAmbulance(aircraft) {
  return specialAircraftReason(aircraft) === "Air ambulance";
}

function nearestPlace(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return { name: "unknown area", distance: Number.NaN };
  return localPlaces
    .map((place) => ({
      ...place,
      distance: distanceFromCoords({ lat, lon }, place),
    }))
    .sort((a, b) => a.distance - b.distance)[0];
}

function placePhrase(aircraft) {
  const place = nearestPlace(aircraft.lat, aircraft.lon);
  if (!place) return "currently over unknown area";
  return place.distance <= 3 ? `currently over ${place.name}` : `near ${place.name}`;
}

function isLandedAircraft(aircraft) {
  const altitude = Number(aircraft.altitude);
  const speed = Number(aircraft.speed);
  return aircraft.altitude === "ground" || aircraft.altitude === "on_ground" || (Number.isFinite(altitude) && altitude < 350 && (!Number.isFinite(speed) || speed < 45));
}

function headingToTarget(aircraft, target, tolerance = 38) {
  const heading = Number(aircraft.heading);
  if (!Number.isFinite(heading) || !Number.isFinite(aircraft.lat) || !Number.isFinite(aircraft.lon)) return false;
  const targetBearing = bearingBetween(aircraft.lat, aircraft.lon, target.lat, target.lon);
  return angleDelta(heading, targetBearing) <= tolerance;
}

function airAmbulanceTrackingStatus(aircraft) {
  if (!aircraft || !isAirAmbulance(aircraft)) return "";
  const place = placePhrase(aircraft);
  const userDistance = Number(aircraft.distance);

  if (isLandedAircraft(aircraft)) {
    const nearest = nearestPlace(aircraft.lat, aircraft.lon);
    return `Air Ambulance landed ${nearest?.name ? `near ${nearest.name}` : "near last known position"}`;
  }

  if (Number.isFinite(userDistance) && userDistance <= 5) {
    return `Air Ambulance within 5 miles - ${place}`;
  }

  if (state.userPosition && headingToTarget(aircraft, state.userPosition, 44) && Number.isFinite(userDistance) && userDistance <= 30) {
    return `Heading your way - ${place}`;
  }

  const targetOrder = [
    { target: airAmbulanceWaypoints.rcht, text: "Heading towards RCHT" },
    { target: airAmbulanceWaypoints.derriford, text: "Heading towards Derriford Hospital" },
    { target: airAmbulanceWaypoints.base, text: "Heading back to base" },
  ];

  for (const item of targetOrder) {
    const distance = distanceFromCoords({ lat: aircraft.lat, lon: aircraft.lon }, item.target);
    if (distance <= 2.5) return `${item.text} - ${place}`;
    if (headingToTarget(aircraft, item.target)) return `${item.text} - ${place}`;
  }

  return `${movementStatus(aircraft)} - ${place}`;
}

function specialAircraftReason(aircraft) {
  const text = [
    aircraft.flight,
    aircraft.registration,
    aircraft.id,
    aircraft.airline,
    aircraft.aircraftType,
    routeLabel(aircraft.from, aircraft.fromCode),
    routeLabel(aircraft.to, aircraft.toCode),
  ]
    .join(" ")
    .toLowerCase();
  const flight = String(aircraft.flight || "").trim().toUpperCase();
  if (
    text.includes("cornwall air ambulance") ||
    text.includes("air ambulance") ||
    text.includes("helimed") ||
    /^HLE\d|^HELIMED|^G-CRWL|^G-CNLL|^G-CIOS/.test(flight)
  ) {
    return "Air ambulance";
  }
  if (
    text.includes("coastguard") ||
    text.includes("rescue") ||
    text.includes("search and rescue") ||
    /\bSAR\b/i.test(text) ||
    /^CG\d|^COAST|^SRG|^RESCUE/.test(flight)
  ) {
    return "Coastguard";
  }
  if (
    text.includes("military") ||
    text.includes("raf ") ||
    text.includes("royal air force") ||
    text.includes("army air corps") ||
    text.includes("royal navy")
  ) {
    return "Military";
  }
  if (/^(rrr|ascot|rfr|vortex|knife|nato|cfc|gaf|air force|tartan|python|madras|raf|navy)/i.test(flight)) return "Military";
  return "";
}

function decorateAircraft(aircraft) {
  const specialReason = specialAircraftReason(aircraft);
  const decorated = {
    ...aircraft,
    specialReason,
    status: movementStatus(aircraft),
  };
  return {
    ...decorated,
    airAmbulanceStatus: specialReason === "Air ambulance" ? airAmbulanceTrackingStatus(decorated) : "",
  };
}

function bearingBetween(fromLat, fromLon, toLat, toLon) {
  const toRad = (degrees) => (degrees * Math.PI) / 180;
  const toDeg = (radians) => (radians * 180) / Math.PI;
  const y = Math.sin(toRad(toLon - fromLon)) * Math.cos(toRad(toLat));
  const x =
    Math.cos(toRad(fromLat)) * Math.sin(toRad(toLat)) -
    Math.sin(toRad(fromLat)) * Math.cos(toRad(toLat)) * Math.cos(toRad(toLon - fromLon));
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function normalizeAircraft(item, origin) {
  const flight = [item.flight, item.callsign, item.r, item.registration, item.hex]
    .map((value) => String(value || "").trim())
    .find(Boolean) || "Unknown";
  const lat = Number(item.lat);
  const lon = Number(item.lon);
  const distanceNm = Number(item.dst ?? item.dist ?? item.distance);
  const distance =
    Number.isFinite(distanceNm) ? distanceNm * 1.15078 : distanceFromCoords(origin, { lat, lon });
  const originRoute = item.from || item.origin;
  const destinationRoute = item.to || item.destination;
  return decorateAircraft({
    flight,
    airline: airlineFromFlight(flight, item.ownOp || item.operator || item.airline),
    aircraftType: formatAircraftType(item.t || item.type || item.aircraft_type),
    altitude: item.alt_baro ?? item.alt_geom ?? item.altitude,
    from: routeAirportName(originRoute) || "Route lookup pending",
    fromCode: item.fromCode || item.originCode || routeAirportCode(originRoute),
    to: routeAirportName(destinationRoute) || "Route lookup pending",
    toCode: item.toCode || item.destinationCode || routeAirportCode(destinationRoute),
    scheduledDeparture: item.scheduledDeparture || item.departureTime || item.std,
    estimatedDeparture: item.estimatedDeparture || item.actualDeparture || item.etd,
    scheduledArrival: item.scheduledArrival || item.arrivalTime || item.sta,
    estimatedArrival: item.estimatedArrival || item.eta || item.actualArrival,
    distance,
    bearing: Number.isFinite(lat) && Number.isFinite(lon) ? bearingBetween(origin.lat, origin.lon, lat, lon) : 0,
    heading: Number(item.track ?? item.nav_heading ?? item.heading ?? 0),
    speed: item.gs || item.speed,
    lat,
    lon,
    id: item.hex || item.icao || flight,
    registration: item.r || item.registration,
    seenAt: Date.now(),
  });
}

function distanceFromCoords(a, b) {
  if (!a || !Number.isFinite(b.lat) || !Number.isFinite(b.lon)) return Number.NaN;
  const radius = 3958.8;
  const toRad = (degrees) => (degrees * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(h));
}

function aircraftListFromPayload(payload) {
  if (Array.isArray(payload?.ac)) return payload.ac;
  if (Array.isArray(payload?.aircraft)) return payload.aircraft;
  if (Array.isArray(payload?.data?.ac)) return payload.data.ac;
  if (Array.isArray(payload?.data?.aircraft)) return payload.data.aircraft;
  return [];
}

async function fetchAircraft(position, radiusMiles) {
  const radiusNm = Math.max(1, Math.round(milesToNauticalMiles(radiusMiles)));
  if (liveServerAvailable) {
    const url = new URL("/api/aircraft", window.location.origin);
    url.search = new URLSearchParams({
      lat: String(position.lat),
      lon: String(position.lon),
      radiusNm: String(radiusNm),
    }).toString();
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`Aircraft feed returned ${response.status}`);
      const payload = await response.json();
      const list = aircraftListFromPayload(payload.data || payload);
      return {
        aircraft: list.map((item) => normalizeAircraft(item, position)).filter((item) => Number.isFinite(item.distance)),
        source: `${payload.source || "Live feed"} · ${list.length} tracks`,
      };
    } catch (error) {
      console.warn(error);
    }
  }

  const endpoints = [
    `https://api.adsb.lol/v2/lat/${position.lat}/lon/${position.lon}/dist/${radiusNm}`,
    `https://opendata.adsb.fi/api/v2/lat/${position.lat}/lon/${position.lon}/dist/${radiusNm}`,
    `https://api.airplanes.live/v2/point/${position.lat}/${position.lon}/${radiusNm}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) throw new Error(`Aircraft feed returned ${response.status}`);
      const data = await response.json();
      const list = aircraftListFromPayload(data);
      return {
        aircraft: list.map((item) => normalizeAircraft(item, position)).filter((item) => Number.isFinite(item.distance)),
        source: `${new URL(endpoint).hostname} · ${list.length} tracks`,
      };
    } catch (error) {
      console.warn(error);
    }
  }

  return {
    aircraft: demoAircraft.map((item) => decorateAircraft({ ...item })),
    source: "Demo data",
  };
}

function compactRouteName(value) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  return [
    value.iata_code,
    value.iata,
    value.icao_code,
    value.icao,
    value.name,
    value.airline_name,
    value.airport,
    value.municipality,
  ]
    .map((item) => String(item || "").trim())
    .find(Boolean) || "";
}

function extractRouteDetails(payload) {
  const route =
    (Array.isArray(payload?.data?.data) ? payload.data.data[0] : null) ||
    (Array.isArray(payload?.data) ? payload.data[0] : null) ||
    payload?.data?.response?.flightroute ||
    payload?.data?.route ||
    payload?.response?.flightroute ||
    payload?.flightroute ||
    payload?.route;
  if (!route) return null;
  const origin = route.origin || route.from || route.departure;
  const destination = route.destination || route.to || route.arrival;
  const from = routeAirportName(origin);
  const fromCode = routeAirportCode(origin);
  const to = routeAirportName(destination);
  const toCode = routeAirportCode(destination);
  const airline =
    compactRouteName(route.airline) ||
    compactRouteName(route.operator) ||
    compactRouteName(route.airline?.name) ||
    compactRouteName(payload?.data?.response?.aircraft?.operator);
  const scheduledDeparture = route.scheduledDeparture || route.scheduled_departure || route.departureTime || route.departure_time || route.std;
  const estimatedDeparture = route.estimatedDeparture || route.estimated_departure || route.actualDeparture || route.actual_departure || route.etd;
  const scheduledArrival = route.scheduledArrival || route.scheduled_arrival || route.arrivalTime || route.arrival_time || route.sta;
  const estimatedArrival = route.estimatedArrival || route.estimated_arrival || route.actualArrival || route.actual_arrival || route.eta;
  if (!from && !to && !fromCode && !toCode && !airline && !scheduledDeparture && !scheduledArrival && !estimatedArrival) return null;
  return { from, fromCode, to, toCode, airline, scheduledDeparture, estimatedDeparture, scheduledArrival, estimatedArrival };
}

function routeNeedsLookup(aircraft) {
  return [aircraft.from, aircraft.to].some((value) => /lookup pending|data needed|unknown/i.test(String(value || "")));
}

function routeLookupCandidate(aircraft) {
  const callsign = String(aircraft.flight || "").trim().toUpperCase();
  if (!callsign || /unknown/i.test(callsign)) return false;
  if (/^\d+$/.test(callsign)) return false;
  if (!/[A-Z]{3}\d/.test(callsign)) return false;
  if (!airlinePrefixes[airlineCodeFromFlight(callsign)] && aircraft.airline === "Unknown airline") return false;
  if (aircraft.specialReason) return false;
  return routeNeedsLookup(aircraft);
}

async function fetchRouteDetails(aircraft) {
  const callsign = String(aircraft.flight || "").trim().toUpperCase();
  if (!callsign || !liveServerAvailable || !routeLookupCandidate(aircraft)) return null;
  if (state.routeCache.has(callsign)) return state.routeCache.get(callsign);
  try {
    const url = new URL("/api/route", window.location.origin);
    url.search = new URLSearchParams({ callsign }).toString();
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Route lookup returned ${response.status}`);
    const details = extractRouteDetails(await response.json());
    state.routeCache.set(callsign, details);
    return details;
  } catch (error) {
    console.warn(error);
    state.routeCache.set(callsign, null);
    return null;
  }
}

async function enrichAircraftRoutes(aircraftList) {
  const candidates = aircraftList
    .filter(routeLookupCandidate)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 8);
  for (const aircraft of candidates) {
    const details = await fetchRouteDetails(aircraft);
    if (!details) continue;
    if (details.airline && aircraft.airline === "Unknown airline") aircraft.airline = details.airline;
    if (details.from) aircraft.from = details.from;
    if (details.fromCode) aircraft.fromCode = details.fromCode;
    if (details.to) aircraft.to = details.to;
    if (details.toCode) aircraft.toCode = details.toCode;
    if (details.scheduledDeparture) aircraft.scheduledDeparture = details.scheduledDeparture;
    if (details.estimatedDeparture) aircraft.estimatedDeparture = details.estimatedDeparture;
    if (details.scheduledArrival) aircraft.scheduledArrival = details.scheduledArrival;
    if (details.estimatedArrival) aircraft.estimatedArrival = details.estimatedArrival;
  }
  return aircraftList;
}

function setMessage(text, visible = true) {
  elements.message.textContent = text;
  elements.message.classList.toggle("show", visible);
}

function initMap() {
  if (state.map || !window.L || !elements.map || !state.userPosition) return;
  try {
    state.map = L.map(elements.map, {
      attributionControl: true,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      zoomControl: false,
      tap: true,
    }).setView([state.userPosition.lat, state.userPosition.lon], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap",
    }).addTo(state.map);

    state.mapReady = true;
    elements.mapLabel.textContent = "Live sector map";
  } catch (error) {
    console.warn(error);
    state.mapReady = false;
    elements.mapLabel.textContent = "Radar fallback";
  }
}

function aircraftIcon(aircraft) {
  const reasonClass = aircraft.specialReason ? aircraft.specialReason.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "";
  const heading = mapHeading(aircraft);
  return L.divIcon({
    className: "",
    html: `<span class="plane-map-marker${aircraft.specialReason ? ` special ${reasonClass}` : ""}" style="--heading:${heading}deg"><span class="plane-shape"></span></span>`,
    iconSize: aircraft.specialReason ? [34, 34] : [28, 28],
    iconAnchor: aircraft.specialReason ? [17, 17] : [14, 14],
  });
}

function aircraftKey(aircraft) {
  return String(aircraft.id || aircraft.flight || `${aircraft.lat},${aircraft.lon}`);
}

function priorityAircraft(list = state.filtered) {
  const special = list.filter((aircraft) => aircraft.specialReason);
  return (special.length ? special : list).slice().sort((a, b) => a.distance - b.distance)[0] || null;
}

function rememberTracks(aircraftList) {
  const now = Date.now();
  const activeKeys = new Set();
  for (const aircraft of aircraftList) {
    if (!Number.isFinite(aircraft.lat) || !Number.isFinite(aircraft.lon)) continue;
    const key = aircraftKey(aircraft);
    activeKeys.add(key);
    const history = state.trackHistory.get(key) || [];
    const last = history[history.length - 1];
    if (!last || Math.abs(last.lat - aircraft.lat) > 0.00005 || Math.abs(last.lon - aircraft.lon) > 0.00005) {
      history.push({
        lat: aircraft.lat,
        lon: aircraft.lon,
        time: now,
        specialReason: aircraft.specialReason,
      });
    }
    state.trackHistory.set(key, history.slice(-8));
  }

  for (const [key, history] of state.trackHistory.entries()) {
    const latest = history[history.length - 1];
    if (!activeKeys.has(key) && (!latest || now - latest.time > 12 * 60 * 1000)) {
      state.trackHistory.delete(key);
    }
  }
}

function markerLabel(aircraft) {
  const distance = formatDistance(aircraft.distance);
  if (aircraft.airAmbulanceStatus) return `${aircraft.flight} · ${aircraft.airAmbulanceStatus}`;
  if (aircraft.specialReason) return `${aircraft.specialReason}: ${aircraft.flight} · ${distance}`;
  return `${aircraft.flight} · ${distance}`;
}

function aircraftPopupHtml(aircraft) {
  return `
    <div class="aircraft-popup">
      <strong>${escapeHtml(aircraft.flight)}</strong>
      <span>${escapeHtml(aircraft.airAmbulanceStatus || aircraft.specialReason || aircraft.status || "Live track")}</span>
      <dl>
        <div><dt>Airline</dt><dd>${escapeHtml(aircraft.airline || "Unknown")}</dd></div>
        <div><dt>Type</dt><dd>${escapeHtml(aircraft.aircraftType || "Type unknown")}</dd></div>
        <div><dt>Altitude</dt><dd>${escapeHtml(formatAltitude(aircraft.altitude))}</dd></div>
        <div><dt>Speed</dt><dd>${escapeHtml(formatSpeed(aircraft.speed))}</dd></div>
        <div><dt>Range</dt><dd>${escapeHtml(formatDistance(aircraft.distance))}</dd></div>
        <div><dt>Bearing</dt><dd>${escapeHtml(formatDirection(aircraft.bearing))}</dd></div>
        <div><dt>From</dt><dd>${routeCellMarkup(aircraft.from, aircraft.fromCode, routeTimeLabel(aircraft.scheduledDeparture, aircraft.estimatedDeparture, "Dep"))}</dd></div>
        <div><dt>To</dt><dd>${routeCellMarkup(aircraft.to, aircraft.toCode, routeTimeLabel(aircraft.scheduledArrival, aircraft.estimatedArrival, "Arr"))}</dd></div>
        <div><dt>Seen</dt><dd>${escapeHtml(formatAge(aircraft.seenAt || state.lastUpdatedAt))}</dd></div>
      </dl>
    </div>
  `;
}

function selectAircraft(aircraft) {
  state.selectedAircraftKey = aircraftKey(aircraft);
  const index = state.filtered.findIndex((item) => aircraftKey(item) === state.selectedAircraftKey);
  if (index >= 0) state.spotlightIndex = Math.min(index, 2);
  elements.mapLabel.textContent = aircraft.specialReason ? `Tracking ${aircraft.specialReason}` : `Track ${aircraft.flight}`;
  renderSpotlight();
}

function setRadarExpanded(expanded, userInitiated = false) {
  state.radarExpanded = Boolean(expanded);
  if (userInitiated) state.lastInputAt = Date.now();
  document.body.classList.toggle("radar-expanded", state.radarExpanded);
  const ambulance = activeAirAmbulance();
  elements.expandRadar.textContent = state.radarExpanded ? "Close radar" : "Expand radar";
  elements.mapLabel.textContent = state.radarExpanded
    ? ambulance
      ? "Air ambulance close focus"
      : "Expanded sector map"
    : "Live sector map";
  elements.mapRangeLabel.textContent =
    state.radarExpanded && ambulance
      ? `AA focus · ${formatDistance(ambulance.distance)}`
      : state.radarExpanded
        ? `${Math.min(Number(elements.radius.value) || 50, 25)} mi expanded`
      : elements.mapRangeLabel.textContent;
  window.setTimeout(() => {
    state.map?.invalidateSize();
    updateMap();
    drawRadar();
  }, 0);
}

function maybeExpandAirAmbulanceMap() {
  const aircraft = activeAirAmbulance();
  if (
    state.airAmbulanceZoomEnabled &&
    aircraft &&
    Number.isFinite(aircraft.distance) &&
    aircraft.distance <= 5 &&
    !state.radarExpanded
  ) {
    state.selectedAircraftKey = aircraftKey(aircraft);
    setRadarExpanded(true);
  }
}

function collapseExpandedMapIfIdle() {
  if (!state.radarExpanded || !state.autoCollapseMap) return;
  const aircraft = activeAirAmbulance();
  const stillClose = aircraft && Number.isFinite(aircraft.distance) && aircraft.distance <= 5;
  const idleFor = Date.now() - state.lastInputAt;
  if (!stillClose || idleFor >= 20 * 60 * 1000) setRadarExpanded(false);
}

function updateMap() {
  initMap();
  const radius = Number(elements.radius.value);
  const tracked = priorityAircraft();
  const mapRadius = state.radarExpanded
    ? tracked?.specialReason
      ? Math.max(5, Math.ceil(Number(tracked.distance) + 1))
      : Math.min(radius, 25)
    : radius;
  elements.mapRangeLabel.textContent = state.radarExpanded && tracked?.specialReason
    ? `${tracked.flight} focus · ${formatDistance(tracked.distance)}`
    : state.radarExpanded
      ? `${mapRadius} mi expanded`
    : tracked?.specialReason
      ? `${tracked.flight} · ${formatDistance(tracked.distance)}`
      : `${radius} mi radius`;
  if (!state.mapReady || !state.map || !state.userPosition) return;

  const position = [state.userPosition.lat, state.userPosition.lon];
  if (state.radarExpanded && tracked?.specialReason && Number.isFinite(tracked.lat) && Number.isFinite(tracked.lon)) {
    const bounds = L.latLngBounds([position, [tracked.lat, tracked.lon]]).pad(state.radarExpanded ? 0.18 : 0.34);
    state.map.fitBounds(bounds, { animate: true, maxZoom: state.radarExpanded ? 14 : 10, padding: [42, 42] });
    elements.mapLabel.textContent = state.radarExpanded ? `${tracked.specialReason} close focus` : `Tracking ${tracked.specialReason}`;
  } else {
    const radiusBounds = L.circle(position, { radius: milesToMeters(mapRadius) }).getBounds();
    state.map.fitBounds(radiusBounds, {
      animate: false,
      maxZoom: state.radarExpanded ? 11 : 12,
      padding: state.radarExpanded ? [24, 24] : [18, 18],
    });
    elements.mapLabel.textContent = tracked?.specialReason && !state.radarExpanded ? `Priority in ${mapRadius} mi sector` : state.radarExpanded ? "Expanded sector map" : "Live sector map";
  }

  if (!state.homeMarker) {
    state.homeMarker = L.marker(position, {
      icon: L.divIcon({
        className: "",
        html: '<span class="home-map-marker"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
      interactive: false,
    }).addTo(state.map);
  } else {
    state.homeMarker.setLatLng(position);
  }

  for (const ring of state.rangeRings) ring.remove();
  state.rangeRings = [0.25, 0.5, 0.75, 1].map((scale) =>
    L.circle(position, {
      radius: milesToMeters(mapRadius * scale),
      color: state.radarExpanded ? "#ffd15c" : scale === 1 ? "#69d38d" : "#7ccad7",
      weight: state.radarExpanded && scale === 1 ? 3 : scale === 1 ? 2 : 1,
      opacity: state.radarExpanded ? 0.68 : scale === 1 ? 0.75 : 0.42,
      fill: false,
      interactive: false,
    }).addTo(state.map),
  );

  for (const line of state.trackLines) line.remove();
  state.trackLines = state.filtered
    .filter((aircraft) => aircraft.specialReason || aircraft === tracked)
    .map((aircraft) => {
      const points = (state.trackHistory.get(aircraftKey(aircraft)) || [])
        .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lon))
        .map((point) => [point.lat, point.lon]);
      if (points.length < 2) return null;
      return L.polyline(points, {
        color: aircraft.specialReason ? "#f0bd61" : "#7ccad7",
        weight: aircraft.specialReason ? 4 : 2,
        opacity: aircraft.specialReason ? 0.92 : 0.56,
        interactive: false,
      }).addTo(state.map);
    })
    .filter(Boolean);

  for (const marker of state.planeMarkers) marker.remove();
  state.planeMarkers = state.filtered
    .filter((aircraft) => Number.isFinite(aircraft.lat) && Number.isFinite(aircraft.lon))
    .map((aircraft) => {
      const marker = L.marker([aircraft.lat, aircraft.lon], {
        icon: aircraftIcon(aircraft),
        interactive: true,
        keyboard: true,
        title: markerLabel(aircraft),
      }).addTo(state.map);
      marker.bindPopup(aircraftPopupHtml(aircraft), {
        closeButton: true,
        className: "radar-popup",
        maxWidth: 320,
      });
      marker.on("click", () => selectAircraft(aircraft));
      return marker;
    });

  window.setTimeout(() => state.map?.invalidateSize(), 0);
}

function applyFilter() {
  const term = elements.filter.value.trim().toLowerCase();
  state.filtered = state.aircraft
    .filter((aircraft) => {
      if (!term) return true;
      return [
        aircraft.flight,
        aircraft.airline,
        aircraft.aircraftType,
        routeLabel(aircraft.from, aircraft.fromCode),
        routeLabel(aircraft.to, aircraft.toCode),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term);
    })
    .sort((a, b) => a.distance - b.distance);
  if (state.spotlightIndex >= Math.min(3, state.filtered.length)) state.spotlightIndex = 0;
  renderTable();
  renderStats();
  updateMap();
  drawRadar();
}

function renderTable() {
  elements.rows.innerHTML = "";
  for (const aircraft of state.filtered) {
    const branding = brandingForFlight(aircraft.flight);
    const tr = document.createElement("tr");
    tr.style.setProperty("--logo-a", branding.colors[0]);
    tr.style.setProperty("--logo-b", branding.colors[1]);
    tr.classList.toggle("special-row", Boolean(aircraft.specialReason));
    tr.innerHTML = `
      <td>${airlineLogoMarkup(aircraft)}</td>
      <td><span class="flight">${aircraft.flight}</span><span class="subtle">${aircraft.airAmbulanceStatus || aircraft.specialReason || aircraft.status}</span></td>
      <td>${aircraft.airline}</td>
      <td>${aircraft.aircraftType || "Type unknown"}</td>
      <td>${formatAltitude(aircraft.altitude)}</td>
      <td>${formatSpeed(aircraft.speed)}</td>
      <td class="${routeNeedsLookup(aircraft) ? "unknown" : ""}">${routeCellMarkup(aircraft.from, aircraft.fromCode, routeTimeLabel(aircraft.scheduledDeparture, aircraft.estimatedDeparture, "Dep"))}</td>
      <td class="${routeNeedsLookup(aircraft) ? "unknown" : ""}">${routeCellMarkup(aircraft.to, aircraft.toCode, routeTimeLabel(aircraft.scheduledArrival, aircraft.estimatedArrival, "Arr"))}</td>
      <td>${formatDistance(aircraft.distance)}</td>
      <td>${formatAge(aircraft.seenAt || state.lastUpdatedAt)}</td>
    `;
    elements.rows.appendChild(tr);
  }

  if (!state.loading && state.filtered.length === 0) {
    setMessage("No aircraft match the current search.", true);
  } else if (!state.loading) {
    setMessage("", false);
  }
}

function renderStats() {
  elements.count.textContent = state.filtered.length.toLocaleString();
  elements.nearest.textContent = state.filtered[0] ? formatDistance(state.filtered[0].distance) : "Waiting";
  elements.specialCount.textContent = state.filtered.filter((aircraft) => aircraft.specialReason).length.toLocaleString();
  elements.updated.textContent = formatAge(state.lastUpdatedAt);
  elements.closestToday.textContent = state.closestToday ? formatDistance(state.closestToday) : "Waiting";
  elements.lowestToday.textContent = state.lowestToday ? formatAltitude(state.lowestToday) : "Waiting";
  if (state.userPosition) {
    const label = state.locationMode === "fallback location" ? fallbackPosition.label : state.homeLabel || "Saved home";
    elements.center.textContent = `${label} · ${state.userPosition.lat.toFixed(4)}, ${state.userPosition.lon.toFixed(4)}`;
  }
  renderSpotlight();
  renderAirAmbulanceWatch();
  renderMilitaryLog();
  renderAirAmbulanceAlert();
  maybeExpandAirAmbulanceMap();
  renderFeedStatus();
  renderTicker();
}

function renderSpotlight() {
  const ambulance = activeAirAmbulance();
  const specialList = state.filtered.filter((aircraft) => aircraft.specialReason).sort((a, b) => a.distance - b.distance);
  const regularList = state.filtered.filter((aircraft) => !aircraft.specialReason).sort((a, b) => a.distance - b.distance);
  const spotlightList = [...specialList, ...regularList].slice(0, 3);
  const selectedAircraft = state.selectedAircraftKey
    ? state.filtered.find((item) => aircraftKey(item) === state.selectedAircraftKey)
    : null;
  const aircraft = ambulance || selectedAircraft || spotlightList[state.spotlightIndex] || spotlightList[0];
  if (!aircraft) {
    elements.spotlightCard.classList.add("no-track");
    elements.spotlightLogo.textContent = "SW";
    elements.spotlightLogo.style.setProperty("--logo-a", "#4d5b55");
    elements.spotlightLogo.style.setProperty("--logo-b", "#9fb4aa");
    elements.spotlightFlight.textContent = "Waiting for aircraft";
    elements.spotlightAirline.textContent = "No live track selected";
    elements.spotlightStatus.textContent = "Waiting for aircraft within selected radius";
    elements.spotlightStatus.className = "spotlight-status";
    elements.spotlightFrom.textContent = "";
    elements.spotlightTo.textContent = "";
    elements.spotlightDistance.textContent = "";
    elements.spotlightDirection.textContent = "";
    elements.spotlightAltitude.textContent = "";
    elements.spotlightSpeed.textContent = "";
    elements.spotlightType.textContent = "";
    elements.spotlightSeen.textContent = "";
    return;
  }

  elements.spotlightCard.classList.remove("no-track");
  setSpotlightLogo(aircraft);
  elements.spotlightFlight.textContent = displayServiceName(aircraft);
  elements.spotlightAirline.textContent = `Callsign ${aircraft.flight}`;
  elements.spotlightStatus.textContent = aircraft.specialReason
    ? aircraft.airAmbulanceStatus || `${aircraft.specialReason} · ${aircraft.status}`
    : aircraft.status;
  elements.spotlightStatus.className = `spotlight-status${aircraft.specialReason ? " special" : ""}`;
  elements.spotlightFrom.innerHTML = routeCellMarkup(aircraft.from, aircraft.fromCode, routeTimeLabel(aircraft.scheduledDeparture, aircraft.estimatedDeparture, "Dep"));
  elements.spotlightTo.innerHTML = routeCellMarkup(aircraft.to, aircraft.toCode, routeTimeLabel(aircraft.scheduledArrival, aircraft.estimatedArrival, "Arr"));
  elements.spotlightDistance.textContent = formatDistance(aircraft.distance);
  elements.spotlightDirection.textContent = formatDirection(aircraft.bearing);
  elements.spotlightAltitude.textContent = formatAltitude(aircraft.altitude);
  elements.spotlightSpeed.textContent = formatSpeed(aircraft.speed);
  elements.spotlightType.textContent = aircraft.aircraftType || "Type unknown";
  elements.spotlightSeen.textContent = formatAge(aircraft.seenAt || state.lastUpdatedAt);
}

function updateHighlights() {
  for (const aircraft of state.aircraft) {
    if (Number.isFinite(aircraft.distance)) {
      state.closestToday = state.closestToday == null ? aircraft.distance : Math.min(state.closestToday, aircraft.distance);
    }
    const altitude = Number(aircraft.altitude);
    if (Number.isFinite(altitude) && altitude > 0) {
      state.lowestToday = state.lowestToday == null ? altitude : Math.min(state.lowestToday, altitude);
    }
  }
}

function activeAirAmbulance() {
  return state.aircraft
    .filter((aircraft) => aircraft.specialReason === "Air ambulance")
    .sort((a, b) => a.distance - b.distance)[0] || null;
}

function renderAirAmbulanceWatch() {
  const aircraft = activeAirAmbulance();
  if (aircraft) {
    elements.airAmbulanceWatch.textContent = "Airborne";
    elements.airAmbulanceWatchText.textContent = `${aircraft.flight} · ${aircraft.airAmbulanceStatus || placePhrase(aircraft)} · ${formatDistance(aircraft.distance)}`;
    return;
  }

  if (state.lastAirAmbulance && Date.now() - state.lastAirAmbulance.seenAt < 15 * 60 * 1000) {
    elements.airAmbulanceWatch.textContent = "Last seen";
    elements.airAmbulanceWatchText.textContent = `${formatHour(state.lastAirAmbulance.seenAt)} · ${placePhrase(state.lastAirAmbulance.aircraft)}`;
    return;
  }

  elements.airAmbulanceWatch.textContent = "Standby";
  elements.airAmbulanceWatchText.textContent = "No Cornwall Air Ambulance track detected";
}

function renderMilitaryLog() {
  state.militaryLog = pruneMilitaryLog(state.militaryLog);
  elements.militaryLogCount.textContent = state.militaryLog.length.toLocaleString();
  const latest = state.militaryLog[0];
  elements.militaryLogText.textContent = latest
    ? `${latest.flight} ${formatDistance(Number(latest.distance))} · seen ${formatHour(latest.time)}`
    : "military within 5 mi";
}

function playUrgentChime() {
  if (!state.chimeEnabled || !state.audioContext || quietHoursActive()) return;
  const now = state.audioContext.currentTime;
  for (const [index, frequency] of [988, 1319, 1760, 1319].entries()) {
    const oscillator = state.audioContext.createOscillator();
    const gain = state.audioContext.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now + index * 0.12);
    gain.gain.linearRampToValueAtTime(0.075, now + index * 0.12 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.11);
    oscillator.connect(gain).connect(state.audioContext.destination);
    oscillator.start(now + index * 0.12);
    oscillator.stop(now + index * 0.12 + 0.13);
  }
}

function renderAirAmbulanceAlert() {
  const aircraft = activeAirAmbulance();
  const inRange = aircraft && Number.isFinite(aircraft.distance) && aircraft.distance <= 5;
  const testActive = Date.now() < state.testAlertUntil;
  elements.airAmbulanceAlert.hidden = !(inRange || testActive);
  elements.airAmbulanceAlert.classList.toggle("active", Boolean(inRange || testActive));
  if (testActive && !inRange) {
    elements.airAmbulanceAlertTitle.textContent = "Test alert";
    elements.airAmbulanceAlertText.textContent = "Air ambulance alert display and chime test";
    return;
  }
  if (!inRange) return;

  elements.airAmbulanceAlertTitle.textContent = "Air Ambulance close";
  elements.airAmbulanceAlertText.textContent = `${aircraft.flight} ${formatDistance(aircraft.distance)} away - ${aircraft.airAmbulanceStatus || placePhrase(aircraft)}`;
  const key = `${aircraftKey(aircraft)}:within-5`;
  if (!state.airAmbulanceAlerted.has(key)) {
    state.airAmbulanceAlerted.add(key);
    playUrgentChime();
  }
}

function minutesFromTime(value) {
  const [hours, minutes] = String(value || "00:00").split(":").map(Number);
  return (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(minutes) ? minutes : 0);
}

function scheduledNightActive(now = new Date()) {
  if (!state.nightScheduleEnabled) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  const start = minutesFromTime(state.nightStart);
  const end = minutesFromTime(state.nightEnd);
  if (start === end) return true;
  if (start < end) return current >= start && current < end;
  return current >= start || current < end;
}

function quietHoursActive() {
  return state.nightMode;
}

function testAirAmbulanceAlert() {
  state.testAlertUntil = Date.now() + 12000;
  playUrgentChime();
  renderAirAmbulanceAlert();
}

function toggleKiosk() {
  if (!state.displayMode) {
    document.body.classList.toggle("kiosk-mode");
    return;
  }
  document.body.classList.remove("kiosk-mode");
  window.clearTimeout(state.controlsHideTimer);
  state.controlsHideTimer = window.setTimeout(() => {
    if (state.displayMode) document.body.classList.add("kiosk-mode");
  }, 5000);
}

function applyDisplayPreferences() {
  if (state.nightScheduleEnabled) state.nightMode = scheduledNightActive();
  document.body.classList.toggle("display-mode", state.displayMode);
  if (state.displayMode) document.body.classList.add("kiosk-mode");
  document.body.classList.toggle("night-mode", state.nightMode);
  document.documentElement.style.setProperty("--night-dim", String(state.nightDim));
  elements.displayMode.classList.toggle("armed", state.displayMode);
  elements.nightMode.classList.toggle("armed", state.nightMode);
  elements.nightDim.value = String(state.nightDim);
  elements.nightSchedule.checked = state.nightScheduleEnabled;
  elements.nightStart.value = state.nightStart;
  elements.nightEnd.value = state.nightEnd;
  elements.displayMode.innerHTML = state.displayMode
    ? '<span aria-hidden="true">▣</span> Display on'
    : '<span aria-hidden="true">▣</span> Display Mode';
  elements.nightMode.innerHTML = state.nightMode
    ? '<span aria-hidden="true">◐</span> Night dim'
    : '<span aria-hidden="true">◐</span> Night';
  window.localStorage.setItem("skyWatchDisplayMode", String(state.displayMode));
  if (savedPosition) window.localStorage.setItem("skyWatchDisplayModeDefaulted", "true");
  window.localStorage.setItem("skyWatchNightMode", String(state.nightMode));
  window.localStorage.setItem("skyWatchNightDim", String(state.nightDim));
  window.localStorage.setItem("skyWatchNightSchedule", String(state.nightScheduleEnabled));
  window.localStorage.setItem("skyWatchNightStart", state.nightStart);
  window.localStorage.setItem("skyWatchNightEnd", state.nightEnd);
  if (state.displayMode) requestWakeLock();
  else releaseWakeLock();
  updateBurnInShift();
  renderFeedStatus();
}

async function requestWakeLock() {
  if (!state.displayMode) return;
  if (!state.wakeLockSupported) {
    elements.wakeStatus.textContent = "Wake lock unavailable";
    return;
  }
  try {
    state.wakeLock = await navigator.wakeLock.request("screen");
    elements.wakeStatus.textContent = "Screen wake lock active";
    state.wakeLock.addEventListener("release", () => {
      if (state.displayMode && document.visibilityState === "visible") elements.wakeStatus.textContent = "Wake lock released";
    });
  } catch (error) {
    console.warn(error);
    elements.wakeStatus.textContent = "Wake lock unavailable";
  }
}

async function releaseWakeLock() {
  if (state.wakeLock) {
    try {
      await state.wakeLock.release();
    } catch (error) {
      console.warn(error);
    }
  }
  state.wakeLock = null;
  elements.wakeStatus.textContent = state.displayMode ? "Wake lock unavailable" : "Display Mode off";
}

function toggleDisplayMode() {
  state.displayMode = !state.displayMode;
  applyDisplayPreferences();
  window.setTimeout(() => state.map?.invalidateSize(), 0);
}

function toggleNightMode() {
  state.nightScheduleEnabled = false;
  state.nightMode = !state.nightMode;
  applyDisplayPreferences();
}

function updateNightControls() {
  state.nightDim = Number(elements.nightDim.value) || 0.2;
  state.nightScheduleEnabled = elements.nightSchedule.checked;
  state.nightStart = elements.nightStart.value || "22:00";
  state.nightEnd = elements.nightEnd.value || "07:00";
  applyDisplayPreferences();
}

function toggleChime() {
  state.chimeEnabled = !state.chimeEnabled;
  elements.chime.classList.toggle("armed", state.chimeEnabled);
  elements.chime.innerHTML = state.chimeEnabled
    ? '<span aria-hidden="true">♪</span> Chime on'
    : '<span aria-hidden="true">♪</span> Chime off';
  if (state.chimeEnabled && !state.audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) state.audioContext = new AudioContext();
  }
  if (state.audioContext?.state === "suspended") state.audioContext.resume();
  if (state.chimeEnabled) alertForSpecialAircraft();
}

function playChime() {
  if (!state.chimeEnabled || !state.audioContext || quietHoursActive()) return;
  const now = state.audioContext.currentTime;
  for (const [index, frequency] of [880, 1175, 1568].entries()) {
    const oscillator = state.audioContext.createOscillator();
    const gain = state.audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now + index * 0.15);
    gain.gain.linearRampToValueAtTime(0.08, now + index * 0.15 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.15 + 0.14);
    oscillator.connect(gain).connect(state.audioContext.destination);
    oscillator.start(now + index * 0.15);
    oscillator.stop(now + index * 0.15 + 0.16);
  }
}

function alertForSpecialAircraft() {
  const special = state.aircraft.filter((aircraft) => aircraft.specialReason);
  for (const aircraft of special) {
    const key = `${aircraft.flight}-${aircraft.specialReason}`;
    if (!state.chimedAircraft.has(key)) {
      state.chimedAircraft.add(key);
      playChime();
      setMessage(`${aircraft.specialReason} nearby: ${aircraft.flight} ${formatDistance(aircraft.distance)} away.`, true);
      break;
    }
  }
}

function drawPlane(ctx, x, y, heading, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(((heading || 0) * Math.PI) / 180);
  ctx.beginPath();
  ctx.moveTo(0, -9);
  ctx.lineTo(6, 7);
  ctx.lineTo(0, 4);
  ctx.lineTo(-6, 7);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.restore();
}

function drawMapLabel(ctx, text, x, y, color, maxWidth) {
  ctx.save();
  ctx.font = "800 11px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  const padding = 6;
  const width = ctx.measureText(text).width + padding * 2;
  const left = Math.max(8, Math.min(x + 12, maxWidth - width - 8));
  const top = Math.max(34, y - 21);
  ctx.fillStyle = "rgba(7, 13, 11, 0.82)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(left, top, width, 20, 6);
  } else {
    ctx.rect(left, top, width, 20);
  }
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f4f7f2";
  ctx.fillText(text, left + padding, top + 14);
  ctx.restore();
}

function drawMapUnderlay(ctx, width, height, cx, cy, radarRadius) {
  const water = ctx.createLinearGradient(0, 0, width, height);
  water.addColorStop(0, "#163f43");
  water.addColorStop(1, "#0d1d1c");
  ctx.fillStyle = water;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = "#1d362b";
  ctx.beginPath();
  ctx.moveTo(width * 0.04, height * 0.22);
  ctx.bezierCurveTo(width * 0.2, height * 0.08, width * 0.44, height * 0.16, width * 0.58, height * 0.31);
  ctx.bezierCurveTo(width * 0.71, height * 0.45, width * 0.62, height * 0.66, width * 0.41, height * 0.73);
  ctx.bezierCurveTo(width * 0.24, height * 0.79, width * 0.1, height * 0.64, width * 0.04, height * 0.48);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#254434";
  ctx.beginPath();
  ctx.moveTo(width * 0.6, height * 0.08);
  ctx.bezierCurveTo(width * 0.83, height * 0.12, width * 0.96, height * 0.32, width * 0.93, height * 0.58);
  ctx.bezierCurveTo(width * 0.91, height * 0.78, width * 0.73, height * 0.9, width * 0.55, height * 0.82);
  ctx.bezierCurveTo(width * 0.47, height * 0.67, width * 0.55, height * 0.43, width * 0.6, height * 0.08);
  ctx.fill();

  ctx.strokeStyle = "rgba(227, 190, 105, 0.28)";
  ctx.lineWidth = 3;
  for (const offset of [-0.12, 0.04, 0.18]) {
    ctx.beginPath();
    ctx.moveTo(width * 0.08, height * (0.35 + offset));
    ctx.bezierCurveTo(width * 0.3, height * (0.22 + offset), width * 0.55, height * (0.55 + offset), width * 0.92, height * (0.38 + offset));
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(244, 247, 242, 0.14)";
  ctx.lineWidth = 1;
  for (let x = -width; x < width * 2; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(105, 211, 141, 0.14)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radarRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawRadar() {
  const canvas = elements.canvas;
  const panel = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(320, Math.round(panel.width * dpr));
  canvas.height = Math.max(320, Math.round(panel.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const width = canvas.width / dpr;
  const height = canvas.height / dpr;
  const cx = width / 2;
  const cy = height / 2;
  const radarRadius = Math.min(width, height) * 0.43;
  const range = Number(elements.radius.value);

  ctx.clearRect(0, 0, width, height);
  if (!state.mapReady) drawMapUnderlay(ctx, width, height, cx, cy, radarRadius);

  ctx.strokeStyle = state.mapReady ? "rgba(244, 247, 242, 0.56)" : "rgba(105, 211, 141, 0.34)";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i += 1) {
    ctx.beginPath();
    ctx.arc(cx, cy, (radarRadius / 4) * i, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let degrees = 0; degrees < 360; degrees += 30) {
    const radians = (degrees * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(radians) * radarRadius, cy - Math.cos(radians) * radarRadius);
    ctx.stroke();
  }

  const sweep = state.rotation;
  const gradient = ctx.createConicGradient(sweep, cx, cy);
  gradient.addColorStop(0, "rgba(105, 211, 141, 0)");
  gradient.addColorStop(0.08, "rgba(105, 211, 141, 0.28)");
  gradient.addColorStop(0.16, "rgba(105, 211, 141, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radarRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#69d38d";
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fill();

  const tracked = priorityAircraft();
  const trackedPositions = new Map();
  for (const aircraft of state.filtered) {
    const distanceRatio = Math.min(1, aircraft.distance / range);
    const radians = ((aircraft.bearing || 0) * Math.PI) / 180;
    const x = cx + Math.sin(radians) * radarRadius * distanceRatio;
    const y = cy - Math.cos(radians) * radarRadius * distanceRatio;
    trackedPositions.set(aircraftKey(aircraft), { x, y, aircraft });
  }

  for (const aircraft of state.filtered) {
    const current = trackedPositions.get(aircraftKey(aircraft));
    const history = state.trackHistory.get(aircraftKey(aircraft)) || [];
    if (!current || history.length < 2 || (!aircraft.specialReason && aircraft !== tracked)) continue;
    ctx.save();
    ctx.strokeStyle = aircraft.specialReason ? "rgba(240, 189, 97, 0.72)" : "rgba(124, 202, 215, 0.46)";
    ctx.lineWidth = aircraft.specialReason ? 3 : 2;
    ctx.setLineDash([5, 6]);
    ctx.beginPath();
    history.slice(-5).forEach((point, index) => {
      const distance = distanceFromCoords(state.userPosition, point);
      const bearing = bearingBetween(state.userPosition.lat, state.userPosition.lon, point.lat, point.lon);
      const distanceRatio = Math.min(1, distance / range);
      const radians = (bearing * Math.PI) / 180;
      const x = cx + Math.sin(radians) * radarRadius * distanceRatio;
      const y = cy - Math.cos(radians) * radarRadius * distanceRatio;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();
  }

  for (const aircraft of state.filtered) {
    const current = trackedPositions.get(aircraftKey(aircraft));
    if (!current) continue;
    const color = aircraft.specialReason ? "#f0bd61" : aircraft.altitude === "ground" ? "#f0bd61" : "#7ccad7";
    drawPlane(ctx, current.x, current.y, aircraft.heading || aircraft.bearing, color);
  }
}

async function refreshAircraft() {
  if (state.loading) return;
  const lat = Number(elements.lat.value);
  const lon = Number(elements.lon.value);
  const radius = Number(elements.radius.value);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    setMessage("Enter a latitude and longitude, or use Locate.", true);
    return;
  }

  state.loading = true;
  state.lastRefreshAttemptAt = Date.now();
  state.userPosition = { lat, lon };
  elements.source.textContent = state.lastUpdatedAt ? "Refreshing" : "Loading";
  if (!state.lastUpdatedAt) setMessage("Checking nearby aircraft...", true);
  drawRadar();
  fetchWeather(state.userPosition);

  try {
    const result = await fetchAircraft(state.userPosition, radius);
    const nearbyAircraft = result.aircraft.map(decorateAircraft).filter((aircraft) => aircraft.distance <= radius);
    state.feedError = "";
    state.refreshFailures = 0;
    try {
      state.aircraft = await enrichAircraftRoutes(nearbyAircraft);
    } catch (routeError) {
      console.warn(routeError);
      state.aircraft = nearbyAircraft;
    }
    const ambulance = activeAirAmbulance();
    if (ambulance) {
      state.lastAirAmbulance = { aircraft: ambulance, seenAt: Date.now() };
      state.selectedAircraftKey = aircraftKey(ambulance);
      state.spotlightIndex = 0;
    }
    updateMilitaryLog();
    rememberTracks(state.aircraft);
    updateHighlights();
    elements.source.textContent = `${result.source} · auto 60s`;
    state.lastUpdatedAt = Date.now();
    applyFilter();

    if (result.source === "Demo data") {
      setMessage("Live aircraft feeds were unavailable from this browser, so demo aircraft are shown. The app will use live data when the feed allows the request.", true);
    }
    alertForSpecialAircraft();
  } catch (error) {
    console.warn(error);
    state.refreshFailures += 1;
    state.feedError = "aircraft feed retrying";
    elements.source.textContent = "Feed retry";
    setMessage("Aircraft feed is retrying. Keeping last known tracks on screen.", true);
    renderStats();
    window.setTimeout(refreshAircraft, Math.min(30000, 5000 * state.refreshFailures));
  } finally {
    state.loading = false;
    renderFeedStatus();
  }
}

function locateUser() {
  if (!navigator.geolocation) {
    setMessage("This browser does not support location lookup. Enter coordinates manually.", true);
    showLocationSetup("Auto locate is not supported here. Enter postcode instead.");
    return;
  }

  setMessage("Asking the browser for your location...", true);
  elements.setupStatus.textContent = "Asking browser for location...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      applyHomePosition(
        { lat: position.coords.latitude, lon: position.coords.longitude, label: "Auto locate" },
        "Base position saved from auto locate.",
      );
    },
    () => {
      setMessage("Location was not available. Enter your home coordinates manually, then refresh.", true);
      showLocationSetup("Location was not available. Enter postcode instead.");
      if (!state.lastUpdatedAt) refreshAircraft();
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
  );
}

function animate() {
  state.rotation += 0.018;
  drawRadar();
  requestAnimationFrame(animate);
}

function updateBurnInShift() {
  if (!state.displayMode) {
    document.documentElement.style.setProperty("--burn-x", "0px");
    document.documentElement.style.setProperty("--burn-y", "0px");
    return;
  }
  const offsets = [[0, 0], [3, -2], [-2, 3], [4, 2], [-3, -2], [2, 4], [-4, 1], [1, -4]];
  const [, y] = offsets[Math.floor(Date.now() / 180000) % offsets.length];
  document.documentElement.style.setProperty("--burn-x", "0px");
  document.documentElement.style.setProperty("--burn-y", `${y}px`);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !liveServerAvailable) return;
  navigator.serviceWorker.register("./service-worker.js").catch((error) => console.warn(error));
}

function markUserInput() {
  state.lastInputAt = Date.now();
}

elements.locate.addEventListener("click", locateUser);
elements.changeLocation.addEventListener("click", () => showLocationSetup("Change saved base location"));
elements.postcodeButton.addEventListener("click", setLocationFromPostcode);
elements.postcodeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") setLocationFromPostcode();
});
elements.setupLocate.addEventListener("click", locateUser);
elements.setupLater.addEventListener("click", () => {
  setFallbackPreview();
});
elements.expandRadar.addEventListener("click", () => setRadarExpanded(!state.radarExpanded, true));
elements.expandRadarAlert.addEventListener("click", () => setRadarExpanded(true, true));
elements.airAmbulanceZoom.checked = state.airAmbulanceZoomEnabled;
elements.autoCollapse.checked = state.autoCollapseMap;
elements.airAmbulanceZoom.addEventListener("change", () => {
  state.airAmbulanceZoomEnabled = elements.airAmbulanceZoom.checked;
  window.localStorage.setItem("skyWatchAirAmbulanceZoom", String(state.airAmbulanceZoomEnabled));
  if (state.airAmbulanceZoomEnabled) maybeExpandAirAmbulanceMap();
});
elements.autoCollapse.addEventListener("change", () => {
  state.autoCollapseMap = elements.autoCollapse.checked;
  window.localStorage.setItem("skyWatchAutoCollapseMap", String(state.autoCollapseMap));
});
elements.refresh.addEventListener("click", () => {
  const lat = Number(elements.lat.value);
  const lon = Number(elements.lon.value);
  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    const label = isFallbackPosition({ lat, lon }) ? fallbackPosition.label : normaliseLocationLabel(state.homeLabel, "Manual coordinates");
    if (isFallbackPosition({ lat, lon })) {
      state.locationMode = "fallback location";
      state.homeLabel = fallbackPosition.label;
      state.userPosition = { ...fallbackPosition };
      setMessage("Using London demo location. Set your real base under Controls > Location.", true);
    } else {
      savePosition({ lat, lon, label });
      state.userPosition = { lat, lon, label };
      state.homeLabel = label;
      state.locationMode = `saved home · ${label}`;
      setMessage("Base position saved on this device.", true);
    }
  }
  refreshAircraft();
});
elements.kiosk.addEventListener("click", toggleKiosk);
elements.displayMode.addEventListener("click", toggleDisplayMode);
elements.nightMode.addEventListener("click", toggleNightMode);
elements.nightDim.addEventListener("change", updateNightControls);
elements.nightSchedule.addEventListener("change", updateNightControls);
elements.nightStart.addEventListener("change", updateNightControls);
elements.nightEnd.addEventListener("change", updateNightControls);
elements.chime.addEventListener("click", toggleChime);
elements.testAlert.addEventListener("click", testAirAmbulanceAlert);
elements.radius.addEventListener("change", () => {
  window.localStorage.setItem("skyWatchRadius", elements.radius.value);
  refreshAircraft();
});
elements.filter.addEventListener("input", applyFilter);
window.addEventListener("resize", drawRadar);
["pointerdown", "keydown", "touchstart"].forEach((eventName) => window.addEventListener(eventName, markUserInput, { passive: true }));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.displayMode) requestWakeLock();
});

const initialPosition = savedPosition || fallbackPosition;
if (storedRadius && [...elements.radius.options].some((option) => option.value === storedRadius)) {
  elements.radius.value = storedRadius;
}
elements.lat.value = initialPosition.lat.toFixed(5);
elements.lon.value = initialPosition.lon.toFixed(5);
state.userPosition = { lat: initialPosition.lat, lon: initialPosition.lon, label: initialPosition.label };
applyDisplayPreferences();
renderStats();
updateDateTime();
renderTemperature();
renderTicker();
registerServiceWorker();
animate();
if (!savedPosition) {
  setMessage("Set your base with postcode or auto locate. London demo is only a temporary preview.", true);
  showLocationSetup("Enter postcode or use auto locate to set base");
}
refreshAircraft();
fetchBitcoin();
fetchNews();
state.refreshTimer = window.setInterval(refreshAircraft, 60000);
state.weatherTimer = window.setInterval(() => fetchWeather(state.userPosition), 30 * 60 * 1000);
state.bitcoinTimer = window.setInterval(fetchBitcoin, 5 * 60 * 1000);
state.newsTimer = window.setInterval(fetchNews, 5 * 60 * 1000);
state.updateClock = window.setInterval(renderStats, 1000);
state.dateClock = window.setInterval(updateDateTime, 1000);
state.staleTimer = window.setInterval(renderFeedStatus, 30000);
state.burnInTimer = window.setInterval(updateBurnInShift, 3 * 60 * 1000);
state.autoCollapseTimer = window.setInterval(collapseExpandedMapIfIdle, 60 * 1000);
state.nightScheduleTimer = window.setInterval(() => {
  if (state.nightScheduleEnabled) applyDisplayPreferences();
}, 60 * 1000);
state.spotlightTimer = window.setInterval(() => {
  if (activeAirAmbulance()) {
    renderSpotlight();
    return;
  }
  const limit = Math.min(3, state.filtered.length);
  if (limit > 1) {
    state.spotlightIndex = (state.spotlightIndex + 1) % limit;
    renderSpotlight();
  }
}, 12000);
