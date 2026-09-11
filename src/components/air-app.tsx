import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  Crosshair,
  Home,
  LoaderCircle,
  MapPin,
  RefreshCw,
  Share2,
  Shield,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { PuffCharacter } from "@/components/puff-character";
import { PuffQuiz } from "@/components/puff-quiz";
import { HomeBoard } from "@/components/home-board";
import {
  BAND_COPY,
  BAND_UTILS,
  REGIONS,
  REGION_HINT,
  REGION_LABEL,
  bandForPsi,
  defaultWeatherForRegion,
  formatSgt,
  inSingapore,
  nearestRegion,
  nearestWeather,
  psiScalePercent,
  type AirSnapshot,
  type BandId,
  type Region,
} from "@/lib/psi";
import { getAirSnapshot } from "@/lib/nea";
import {
  STAGE_LABEL,
  emptyQuizSave,
  readQuizSave,
  stageFromRounds,
  writeQuizSave,
  type QuizSave,
} from "@/lib/quizzes";

const STORAGE_KEY = "puff-region";

type LocState =
  | { status: "idle" }
  | { status: "asking" }
  | { status: "ok"; lat: number; lng: number }
  | { status: "denied" }
  | { status: "away" };

type Props = {
  initial: AirSnapshot | null;
};

export function AirApp({ initial }: Props) {
  const [data, setData] = useState<AirSnapshot | null>(initial);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!initial);
  const [region, setRegion] = useState<Region>("central");
  const [loc, setLoc] = useState<LocState>({ status: "idle" });
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizSave, setQuizSave] = useState<QuizSave>(emptyQuizSave);
  const [popping, setPopping] = useState(false);
  const [boardTick, setBoardTick] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && REGIONS.includes(saved as Region)) setRegion(saved as Region);
    setQuizSave(readQuizSave());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, region);
  }, [region]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const next = await getAirSnapshot();
      setData(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load PSI.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 15 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  function useLocation() {
    if (!navigator.geolocation) {
      setLoc({ status: "denied" });
      return;
    }
    setLoc({ status: "asking" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (!inSingapore(lat, lng)) {
          setLoc({ status: "away" });
          return;
        }
        setLoc({ status: "ok", lat, lng });
        setRegion(nearestRegion(lat, lng));
      },
      () => setLoc({ status: "denied" }),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 },
    );
  }

  const reading = data?.regions[region];
  const psi = reading?.psi24 ?? 0;
  const band: BandId = bandForPsi(psi);
  const copy = BAND_COPY[band];
  const stage = stageFromRounds(quizSave.rounds);
  const weather = useMemo(() => {
    if (!data) return null;
    if (loc.status === "ok") return nearestWeather(loc.lat, loc.lng, data.weather);
    return defaultWeatherForRegion(region, data.weather);
  }, [data, loc, region]);

  function finishQuiz(correct: number, total: number) {
    setQuizSave((prev) => {
      const prevPct = prev.bestTotal > 0 ? prev.bestCorrect / prev.bestTotal : -1;
      const nextPct = correct / total;
      const better = nextPct > prevPct || (nextPct === prevPct && correct > prev.bestCorrect);
      const next: QuizSave = {
        rounds: prev.rounds + 1,
        bestCorrect: better ? correct : prev.bestCorrect,
        bestTotal: better ? total : prev.bestTotal,
        name: prev.name,
      };
      writeQuizSave(next);
      setPopping(true);
      window.setTimeout(() => setPopping(false), 700);
      return next;
    });
  }

  async function shareApp() {
    const url = `${window.location.origin}${window.location.pathname}`;
    const title = "Puff";
    const text = "While you're here checking the haze, try a trivia and earn some praise.";
    const payload = { title, text, url };
    const line = `${text}\n${url}`;

    try {
      if (typeof navigator.share === "function") {
        const allowed = typeof navigator.canShare !== "function" || navigator.canShare(payload);
        if (allowed) {
          await navigator.share(payload);
          return;
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
    }

    const copiedLink = await copyText(line);
    if (copiedLink) {
      setShared(true);
      window.setTimeout(() => setShared(false), 1600);
    }
  }

  async function copyReading() {
    if (!reading) return;
    const text = `Puff · ${REGION_LABEL[region]} 24-hr PSI ${reading.psi24} (${copy.label})${
      reading.pm25Hourly != null ? ` · 1-hr PM2.5 ${reading.pm25Hourly} µg/m³` : ""
    }`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn("puff-scene min-h-dvh", `band-${band}`)}>
      <main
        className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 sm:pt-10"
        inert={quizOpen ? true : undefined}
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-fg-subtle uppercase">Singapore air</p>
            <h1 className="font-display text-4xl leading-none tracking-tight text-fg sm:text-5xl">Puff</h1>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button type="button" onClick={() => void shareApp()} className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 text-sm font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.96]">
              <Share2 className="size-4" />
              <span className="hidden sm:inline">{shared ? "Link copied" : "Share this app"}</span>
              <span className="sm:hidden">{shared ? "Copied" : "Share"}</span>
            </button>
            <a href="https://x.com/firsalim" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 text-sm font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.96]">
              <XLogo />
              <span className="hidden sm:inline">Follow me on X</span>
              <span className="sm:hidden">Follow</span>
            </a>
            <button type="button" onClick={() => void load()} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-elevated text-fg transition-transform duration-150 ease-out active:scale-[0.96]" aria-label="Refresh readings">
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
            </button>
          </div>
        </header>

        <section className="grid items-center gap-2 sm:grid-cols-[1fr_1.1fr]">
          <PuffCharacter band={band} stage={stage} popping={popping} className="mx-auto h-56 w-56 sm:h-64 sm:w-64" />
          <div className="text-center sm:text-left">
            <p className="font-display text-2xl leading-tight text-fg sm:text-3xl">{copy.headline}</p>
            <p className="mt-2 text-base leading-relaxed text-fg-muted">{copy.quip}</p>
            <p className="mt-3 text-sm text-fg-subtle">
              {STAGE_LABEL[stage]} · {quizSave.rounds} trivia round{quizSave.rounds === 1 ? "" : "s"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-fg-subtle">
              Tip: Puff grows on trivia. Answer well and he puffs up. Ghost the quiz and he deflates like a sad birthday balloon in a void deck.
            </p>
            <div className="mt-5 rounded-2xl border border-border bg-bg-elevated p-4 text-left">
              <p className="font-display text-xl leading-snug tracking-tight text-fg sm:text-2xl">
                While you're here checking the haze,
                <br />
                try a trivia and earn some praise.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                New trivia drops while you check haze levels. Play to get on the board or hold your lead.
              </p>
              <button type="button" onClick={() => setQuizOpen(true)} className="mt-3 inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96]">
                <Trophy className="size-4" />
                I'm in
              </button>
            </div>
          </div>
        </section>

        <div className="grid items-stretch gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-border bg-bg-elevated p-5 sm:p-6">
            {error ? <p className="text-sm text-unhealthy">{error} Try refresh.</p> : null}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-fg-subtle uppercase">24-hour PSI · {REGION_LABEL[region]}</p>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="font-display text-6xl leading-none tabular-nums tracking-tight text-fg sm:text-7xl">{loading && !data ? "—" : psi}</span>
                  <span className={cn("rounded-full px-3 py-1 text-sm font-medium", band === "good" && "bg-good/12 text-good", band === "moderate" && "bg-moderate/12 text-moderate", band === "unhealthy" && "bg-unhealthy/12 text-unhealthy", band === "very-unhealthy" && "bg-very-unhealthy/12 text-very-unhealthy", band === "hazardous" && "bg-hazardous/12 text-hazardous")}>{copy.label}</span>
                </div>
              </div>
              <div className="text-sm text-fg-muted">
                <p>1-hr PM2.5 <span className="font-medium text-fg tabular-nums">{reading?.pm25Hourly ?? "—"}</span> µg/m³</p>
                {data ? <p className="mt-1 text-fg-subtle">Updated {formatSgt(data.updatedAt)}</p> : null}
              </div>
            </div>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg-muted">{copy.advice}</p>
            <div className="mt-5">
              <div className="relative h-2 overflow-hidden rounded-full bg-bg-subtle">
                <div className="absolute inset-y-0 left-0 w-1/5 bg-good/70" />
                <div className="absolute inset-y-0 left-1/5 w-1/5 bg-moderate/70" />
                <div className="absolute inset-y-0 left-2/5 w-1/5 bg-unhealthy/70" />
                <div className="absolute inset-y-0 left-3/5 w-1/5 bg-very-unhealthy/70" />
                <div className="absolute inset-y-0 left-4/5 w-1/5 bg-hazardous/70" />
                <div className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg-elevated bg-fg" style={{ left: `${psiScalePercent(psi)}%` }} />
              </div>
              <div className="mt-1.5 flex justify-between text-xs text-fg-subtle"><span>0</span><span>50</span><span>100</span><span>200</span><span>300+</span></div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
              <Stat label="PM2.5 24h" value={reading?.pm25Daily} unit="µg/m³" />
              <Stat label="PM10 24h" value={reading?.pm10Daily} unit="µg/m³" />
              <Stat label="O₃ 8h max" value={reading?.o3} unit="µg/m³" />
              <Stat label="NO₂ 1h max" value={reading?.no2} unit="µg/m³" />
            </dl>
          </section>
          <HomeBoard myName={quizSave.name} refreshKey={boardTick} onPlay={() => setQuizOpen(true)} />
        </div>

        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-medium text-fg">Your region</h2>
            <button type="button" onClick={useLocation} className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 text-sm font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.96]">
              {loc.status === "asking" ? <LoaderCircle className="size-4 animate-spin" /> : <Crosshair className="size-4" />}
              Use my location
            </button>
          </div>
          {loc.status === "denied" ? <p className="text-sm text-fg-muted">Location blocked here. Pick a region instead.</p> : null}
          {loc.status === "away" ? <p className="text-sm text-fg-muted">That pin is outside Singapore. Pick the region you care about.</p> : null}
          {loc.status === "ok" ? (
            <p className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
              <MapPin className="size-3.5" /> Mapped to {REGION_LABEL[region]} from your coordinates.
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {REGIONS.map((id) => {
              const value = data?.regions[id].psi24;
              const active = id === region;
              return (
                <button key={id} type="button" onClick={() => setRegion(id)} className={cn("min-h-14 rounded-xl border px-3 py-2 text-left transition-transform duration-150 ease-out active:scale-[0.96]", active ? "border-fg bg-fg text-bg" : "border-border bg-bg-elevated text-fg")}>
                  <span className="block text-sm font-medium">{REGION_LABEL[id]}</span>
                  <span className={cn("text-xs tabular-nums", active ? "text-bg/70" : "text-fg-subtle")}>{value ?? "—"}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-fg-subtle">{REGION_HINT[region]}</p>
        </section>

        <section className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border bg-bg-elevated p-5">
            <h2 className="text-sm font-medium text-fg">Should you…</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {copy.activities.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className={cn("mt-0.5 inline-flex size-5 items-center justify-center rounded-full", item.ok ? "bg-good/15 text-good" : "bg-unhealthy/12 text-unhealthy")}>
                    {item.ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-fg">{item.label}</span>
                    <span className="text-sm text-fg-muted">{item.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3">
            {BAND_UTILS[band].map((slot, index) => {
              const Icon = index === 0 ? Shield : index === 1 ? Home : Users;
              return (
                <article key={slot.title} className="rounded-2xl border border-border bg-bg-elevated p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-fg"><Icon className="size-4" /></span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium tracking-wide text-fg-subtle uppercase">{slot.title}</p>
                      <p className="font-display text-xl leading-tight text-fg">{slot.verdict}</p>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{slot.detail}</p>
                    </div>
                  </div>
                </article>
              );
            })}
            {weather ? (
              <p className="px-1 text-xs text-fg-subtle">
                {weather.area}: {weather.forecast}{data?.weatherValidUntil ? ` · until ${formatSgt(data.weatherValidUntil)}` : ""}
              </p>
            ) : null}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => void copyReading()} className="inline-flex h-11 items-center rounded-xl border border-border bg-bg-elevated px-4 text-sm font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.96]">
            {copied ? "Copied" : "Copy this reading"}
          </button>
          <p className="text-xs text-fg-subtle">Official NEA readings via data.gov.sg. PSI is the 24-hour index.</p>
        </div>
      </main>

      {quizOpen ? (
        <PuffQuiz
          band={band}
          save={quizSave}
          onClose={() => {
            setQuizOpen(false);
            setBoardTick((n) => n + 1);
          }}
          onFinish={finishQuiz}
          onName={(name) => {
            setQuizSave((prev) => {
              const next = { ...prev, name };
              writeQuizSave(next);
              return next;
            });
          }}
        />
      ) : null}
    </div>
  );
}

function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(() => true, () => copyTextFallback(text));
  }
  return Promise.resolve(copyTextFallback(text));
}

function copyTextFallback(text: string): boolean {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand("copy");
  field.remove();
  return ok;
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
      <path fill="currentColor" d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.93l8.02-9.16L1.5 2h6.76l4.66 6.17L18.244 2Zm-1.16 18.02h1.8L6.99 3.87H5.06l12.02 16.15Z" />
    </svg>
  );
}

function Stat({ label, value, unit }: { label: string; value: number | null | undefined; unit: string }) {
  return (
    <div>
      <dt className="text-xs text-fg-subtle">{label}</dt>
      <dd className="tabular-nums text-fg">
        {value ?? "—"} <span className="text-fg-subtle">{unit}</span>
      </dd>
    </div>
  );
}
