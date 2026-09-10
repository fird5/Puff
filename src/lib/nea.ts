import { createServerFn } from "@tanstack/react-start";
import { REGIONS, type AirSnapshot, type Region, type RegionReading, type WeatherArea } from "./psi";

type PsiApi = {
  items: Array<{
    timestamp: string;
    update_timestamp: string;
    readings: Record<string, Partial<Record<Region, number>>>;
  }>;
  api_info?: { status?: string };
};

type Pm25Api = {
  items: Array<{
    timestamp: string;
    readings: { pm25_one_hourly?: Partial<Record<Region, number>> };
  }>;
};

type WeatherApi = {
  area_metadata?: Array<{
    name: string;
    label_location: { latitude: number; longitude: number };
  }>;
  items: Array<{
    valid_period?: { end?: string };
    forecasts: Array<{ area: string; forecast: string }>;
  }>;
};

function pick(readings: PsiApi["items"][0]["readings"], key: string, region: Region): number | null {
  const value = readings[key]?.[region];
  return typeof value === "number" ? value : null;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`NEA request failed (${response.status})`);
  }
  return (await response.json()) as T;
}

export const getAirSnapshot = createServerFn({ method: "GET" }).handler(async (): Promise<AirSnapshot> => {
  const [psi, pm25, weather] = await Promise.all([
    fetchJson<PsiApi>("https://api.data.gov.sg/v1/environment/psi"),
    fetchJson<Pm25Api>("https://api.data.gov.sg/v1/environment/pm25"),
    fetchJson<WeatherApi>("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"),
  ]);

  const item = psi.items[0];
  if (!item) throw new Error("PSI feed is empty");

  const hourly = pm25.items[0]?.readings.pm25_one_hourly ?? {};
  const regions = {} as Record<Region, RegionReading>;
  for (const region of REGIONS) {
    regions[region] = {
      region,
      psi24: pick(item.readings, "psi_twenty_four_hourly", region) ?? 0,
      pm25Hourly: hourly[region] ?? null,
      pm25Daily: pick(item.readings, "pm25_twenty_four_hourly", region),
      pm10Daily: pick(item.readings, "pm10_twenty_four_hourly", region),
      o3: pick(item.readings, "o3_eight_hour_max", region),
      co: pick(item.readings, "co_eight_hour_max", region),
      so2: pick(item.readings, "so2_twenty_four_hourly", region),
      no2: pick(item.readings, "no2_one_hour_max", region),
    };
  }

  const weatherItem = weather.items[0];
  const meta = new Map(
    (weather.area_metadata ?? []).map((area) => [
      area.name,
      { latitude: area.label_location.latitude, longitude: area.label_location.longitude },
    ]),
  );
  const areas: WeatherArea[] = (weatherItem?.forecasts ?? []).flatMap((forecast) => {
    const loc = meta.get(forecast.area);
    if (!loc) return [];
    return [{ area: forecast.area, forecast: forecast.forecast, ...loc }];
  });

  return {
    timestamp: item.timestamp,
    updatedAt: item.update_timestamp,
    regions,
    weather: areas,
    weatherValidUntil: weatherItem?.valid_period?.end ?? null,
    sourceStatus: psi.api_info?.status ?? "unknown",
  };
});
