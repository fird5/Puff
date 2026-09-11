export type SkyId = "dawn" | "day" | "golden" | "sunset" | "dusk" | "night";

/** Singapore clock, not the visitor's laptop timezone. */
export function singaporeHour(now = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-SG", {
    timeZone: "Asia/Singapore",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour + minute / 60;
}

export function skyForHour(hour: number): SkyId {
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 16) return "day";
  if (hour >= 16 && hour < 18) return "golden";
  if (hour >= 18 && hour < 19.5) return "sunset";
  if (hour >= 19.5 && hour < 21) return "dusk";
  return "night";
}

export function currentSky(now = new Date()): SkyId {
  return skyForHour(singaporeHour(now));
}
