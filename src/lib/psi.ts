export const REGIONS = ["north", "south", "east", "west", "central"] as const;
export type Region = (typeof REGIONS)[number];

export type BandId = "good" | "moderate" | "unhealthy" | "very-unhealthy" | "hazardous";

export type RegionReading = {
  region: Region;
  psi24: number;
  pm25Hourly: number | null;
  pm25Daily: number | null;
  pm10Daily: number | null;
  o3: number | null;
  co: number | null;
  so2: number | null;
  no2: number | null;
};

export type WeatherArea = {
  area: string;
  forecast: string;
  latitude: number;
  longitude: number;
};

export type AirSnapshot = {
  timestamp: string;
  updatedAt: string;
  regions: Record<Region, RegionReading>;
  weather: WeatherArea[];
  weatherValidUntil: string | null;
  sourceStatus: string;
};

export const REGION_LABEL: Record<Region, string> = {
  north: "North",
  south: "South",
  east: "East",
  west: "West",
  central: "Central",
};

export const REGION_HINT: Record<Region, string> = {
  north: "Woodlands, Yishun, Sembawang",
  south: "HarbourFront, Sentosa, Bukit Merah",
  east: "Tampines, Bedok, Changi, Pasir Ris",
  west: "Jurong, Clementi, Tuas, Pioneer",
  central: "Orchard, Toa Payoh, Novena, Bishan",
};

export const REGION_ANCHORS: Record<Region, { lat: number; lng: number }> = {
  west: { lat: 1.35735, lng: 103.7 },
  north: { lat: 1.41803, lng: 103.82 },
  central: { lat: 1.35735, lng: 103.82 },
  east: { lat: 1.35735, lng: 103.94 },
  south: { lat: 1.29587, lng: 103.82 },
};

export function bandForPsi(psi: number): BandId {
  if (psi <= 50) return "good";
  if (psi <= 100) return "moderate";
  if (psi <= 200) return "unhealthy";
  if (psi <= 300) return "very-unhealthy";
  return "hazardous";
}

export const BAND_COPY: Record<
  BandId,
  {
    label: string;
    colorToken: string;
    headline: string;
    quip: string;
    advice: string;
    activities: { label: string; ok: boolean; note: string }[];
  }
> = {
  good: {
    label: "Good",
    colorToken: "good",
    headline: "Puff is showing off.",
    quip: "The air is so polite it almost said excuse me. Open the windows. Go outside. Flex.",
    advice: "Normal activities. Sensitive people can still enjoy being outdoors.",
    activities: [
      { label: "Outdoor run", ok: true, note: "Ideal. Take the long loop." },
      { label: "Open windows", ok: true, note: "Let the flat breathe." },
      { label: "Hang laundry out", ok: true, note: "Sun plus clean air." },
      { label: "Kids outdoor play", ok: true, note: "Park weather, air-wise." },
    ],
  },
  moderate: {
    label: "Moderate",
    colorToken: "moderate",
    headline: "Puff is coping.",
    quip: "A little dusty. Not a crisis. Puff would still go for kopi, just maybe skip the 10k.",
    advice: "Healthy people can continue as usual. If you are sensitive, ease off long outdoor exertion.",
    activities: [
      { label: "Outdoor run", ok: true, note: "Fine if you feel well. Shorten if you wheeze." },
      { label: "Open windows", ok: true, note: "Ok, but close if it smells smoky." },
      { label: "Hang laundry out", ok: true, note: "Still fine." },
      { label: "Kids outdoor play", ok: true, note: "Normal play. Watch sensitive kids." },
    ],
  },
  unhealthy: {
    label: "Unhealthy",
    colorToken: "unhealthy",
    headline: "Puff packed a mask.",
    quip: "The sky is doing a bit much. Puff looks like a commuter who forgot the MRT was packed.",
    advice: "Reduce prolonged outdoor activity. Sensitive groups should minimise time outside and consider an N95.",
    activities: [
      { label: "Outdoor run", ok: false, note: "Move it indoors. Treadmill dignity." },
      { label: "Open windows", ok: false, note: "Keep them shut. Recirc the aircon." },
      { label: "Hang laundry out", ok: false, note: "It will smell like campfire." },
      { label: "Kids outdoor play", ok: false, note: "Indoor games today." },
    ],
  },
  "very-unhealthy": {
    label: "Very unhealthy",
    colorToken: "very-unhealthy",
    headline: "Puff is not okay.",
    quip: "This is the face of someone who opened the door and immediately regretted it.",
    advice: "Avoid outdoor activity. Wear a well-fitted mask if you must go out. Sensitive groups stay indoors.",
    activities: [
      { label: "Outdoor run", ok: false, note: "Absolutely not." },
      { label: "Open windows", ok: false, note: "Sealed. Aircon on recirc." },
      { label: "Hang laundry out", ok: false, note: "Indoor rack only." },
      { label: "Kids outdoor play", ok: false, note: "Stay in." },
    ],
  },
  hazardous: {
    label: "Hazardous",
    colorToken: "hazardous",
    headline: "Puff has left the chat.",
    quip: "Puff is now a small lump under a dome. Join Puff. The outside is not a personality test.",
    advice: "Remain indoors. Use aircon or a purifier if you have one. Only essential trips, with a mask.",
    activities: [
      { label: "Outdoor run", ok: false, note: "No. Sit down." },
      { label: "Open windows", ok: false, note: "Do not." },
      { label: "Hang laundry out", ok: false, note: "The laundry will absorb the plot." },
      { label: "Kids outdoor play", ok: false, note: "Indoors. Board games." },
    ],
  },
};

export type UtilitySlot = {
  title: string;
  verdict: string;
  detail: string;
};

export const BAND_UTILS: Record<BandId, [UtilitySlot, UtilitySlot, UtilitySlot]> = {
  good: [
    { title: "Mask", verdict: "Leave it at home", detail: "Healthy and sensitive people can go unmasked outdoors." },
    { title: "Home air", verdict: "Open up", detail: "Windows out. Aircon off recirc. Purifier can rest." },
    { title: "At-risk", verdict: "Normal day", detail: "Kids, elderly, and asthma can use outdoor time as usual." },
  ],
  moderate: [
    { title: "Mask", verdict: "Optional", detail: "Healthy people skip it. Sensitive lungs: keep one in the bag." },
    { title: "Home air", verdict: "Crack a window", detail: "Fine to ventilate. Close up if you smell smoke or haze." },
    { title: "At-risk", verdict: "Ease off", detail: "Kids and elderly: shorter outdoor play. Asthma: carry your inhaler." },
  ],
  unhealthy: [
    { title: "Mask", verdict: "Wear it outside", detail: "N95 or equivalent if you must commute or queue outdoors." },
    { title: "Home air", verdict: "Seal the flat", detail: "Windows shut. Aircon on recirc. Run a purifier if you have one." },
    { title: "At-risk", verdict: "Stay in", detail: "Kids, elderly, pregnant, asthma: minimise outdoor time." },
  ],
  "very-unhealthy": [
    { title: "Mask", verdict: "Required outdoors", detail: "Fitted N95 for any trip. Skip outdoor waiting if you can." },
    { title: "Home air", verdict: "Recirc and filter", detail: "Doors closed. Recirc on. Purifier on the room you sit in." },
    { title: "At-risk", verdict: "Indoors only", detail: "No PE, no playground, no long walks. Reschedule outdoor plans." },
  ],
  hazardous: [
    { title: "Mask", verdict: "Essential trips only", detail: "N95 the whole time you are outside. Keep it brief." },
    { title: "Home air", verdict: "Bunker mode", detail: "Sealed windows. Recirc. Purifier on high. Avoid incense and frying." },
    { title: "At-risk", verdict: "Do not go out", detail: "Kids, elderly, and anyone with lung or heart issues stay home." },
  ],
};

export function nearestRegion(lat: number, lng: number): Region {
  let best: Region = "central";
  let bestDist = Number.POSITIVE_INFINITY;
  for (const region of REGIONS) {
    const a = REGION_ANCHORS[region];
    const dLat = lat - a.lat;
    const dLng = lng - a.lng;
    const dist = dLat * dLat + dLng * dLng;
    if (dist < bestDist) {
      bestDist = dist;
      best = region;
    }
  }
  return best;
}

export function nearestWeather(lat: number, lng: number, areas: WeatherArea[]): WeatherArea | null {
  if (!areas.length) return null;
  let best = areas[0]!;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const area of areas) {
    const dLat = lat - area.latitude;
    const dLng = lng - area.longitude;
    const dist = dLat * dLat + dLng * dLng;
    if (dist < bestDist) {
      bestDist = dist;
      best = area;
    }
  }
  return best;
}

export function defaultWeatherForRegion(region: Region, areas: WeatherArea[]): WeatherArea | null {
  const a = REGION_ANCHORS[region];
  return nearestWeather(a.lat, a.lng, areas);
}

export function inSingapore(lat: number, lng: number): boolean {
  return lat >= 1.15 && lat <= 1.48 && lng >= 103.6 && lng <= 104.1;
}

export function psiScalePercent(psi: number): number {
  const clamped = Math.max(0, psi);
  let pct: number;
  if (clamped <= 50) pct = (clamped / 50) * 20;
  else if (clamped <= 100) pct = 20 + ((clamped - 50) / 50) * 20;
  else if (clamped <= 200) pct = 40 + ((clamped - 100) / 100) * 20;
  else if (clamped <= 300) pct = 60 + ((clamped - 200) / 100) * 20;
  else pct = 80 + Math.min(20, ((clamped - 300) / 100) * 20);
  return Math.min(98, Math.max(2, pct));
}

export function formatSgt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-SG", {
    timeZone: "Asia/Singapore",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
