import { useState } from "react";
import type { BandId } from "@/lib/psi";
import { puffScale } from "@/lib/quizzes";

type Props = {
  band: BandId;
  stage: number;
  popping?: boolean;
  className?: string;
};

export function PuffCharacter({ band, stage, popping, className }: Props) {
  const [waving, setWaving] = useState(false);
  const motion =
    band === "good"
      ? "puff-hop"
      : band === "moderate"
        ? "puff-float"
        : band === "unhealthy"
          ? "puff-wobble"
          : band === "very-unhealthy"
            ? "puff-slump"
            : "puff-hide";

  const mouth = mouthPath(band);
  const showMask = band === "unhealthy" || band === "very-unhealthy" || band === "hazardous";
  const showDome = band === "hazardous";
  const tired = band === "very-unhealthy" || band === "hazardous";
  const scale = puffScale(stage);

  function wave() {
    if (waving) return;
    setWaving(true);
    window.setTimeout(() => setWaving(false), 1400);
  }

  return (
    <button
      type="button"
      className={className}
      onClick={wave}
      aria-label="Puff waves if you tap"
    >
      <div className={`puff-grow ${popping ? "puff-pop" : ""}`} style={{ transform: `scale(${scale})` }}>
        <svg viewBox="0 0 280 240" className={`h-full w-full ${motion}`}>
          {band === "good" || stage >= 3 ? <Sparkles /> : null}
          {showDome ? (
            <ellipse
              cx="140"
              cy="138"
              rx="96"
              ry="88"
              fill="color-mix(in oklab, var(--color-fg) 6%, white)"
              stroke="color-mix(in oklab, var(--color-fg) 18%, transparent)"
              strokeWidth="2"
            />
          ) : null}
          <g>
            <ellipse cx="140" cy="196" rx={44 + stage * 6} ry="10" fill="color-mix(in oklab, var(--color-fg) 10%, transparent)" />
            {stage >= 3 ? <FlowerCrown /> : null}
            <CloudBody band={band} extra={stage} />
            {stage >= 1 ? <Bow /> : null}
            <path
              className="puff-arm-l"
              d="M78 148 C58 158 52 176 62 184"
              fill="none"
              stroke={bodyStroke(band)}
              strokeWidth={9 + stage}
              strokeLinecap="round"
            />
            <path
              className={waving || band === "good" ? "puff-arm-r wave" : "puff-arm-r"}
              d="M202 148 C222 156 232 168 228 182"
              fill="none"
              stroke={bodyStroke(band)}
              strokeWidth={9 + stage}
              strokeLinecap="round"
            />
            {stage >= 2 ? <Feet /> : null}
            <g className="puff-glance">
              <g className="puff-blink" style={{ transformOrigin: "118px 118px" }}>
                <Eye cx={118} cy={118} tired={tired} />
              </g>
              <g className="puff-blink" style={{ transformOrigin: "162px 118px", animationDelay: "80ms" }}>
                <Eye cx={162} cy={118} tired={tired} />
              </g>
            </g>
            {band !== "hazardous" ? (
              <>
                <ellipse className="puff-cheeks" cx="102" cy="132" rx={9 + stage} ry={5 + stage} fill="#e8a39a" />
                <ellipse className="puff-cheeks" cx="178" cy="132" rx={9 + stage} ry={5 + stage} fill="#e8a39a" />
              </>
            ) : null}
            {showMask ? (
              <g className="puff-mask-bob">
                <rect x="108" y="136" width="64" height="28" rx="12" fill="#f7f4ee" stroke="#2f6f6a" strokeWidth="2" />
                <path d="M108 148 H84" stroke="#2f6f6a" strokeWidth="2" />
                <path d="M172 148 H196" stroke="#2f6f6a" strokeWidth="2" />
                <path d="M120 146 H160" stroke="#c9c3b8" strokeWidth="1.5" />
                <path d="M120 153 H160" stroke="#c9c3b8" strokeWidth="1.5" />
              </g>
            ) : (
              <path d={mouth} fill="none" stroke="var(--color-fg)" strokeWidth="3.2" strokeLinecap="round" />
            )}
            {band === "moderate" ? (
              <>
                <path d="M188 92 c8 -16 22 -16 22 2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="2" strokeLinecap="round" />
                <circle className="puff-sneeze" cx="198" cy="108" r="7" fill="#f3ead8" stroke="var(--color-fg-subtle)" strokeWidth="1" />
              </>
            ) : null}
            {band === "unhealthy" || band === "very-unhealthy" ? (
              <path className="puff-sweat" d="M198 86 q3 10 0 16" fill="none" stroke="#7aa0b0" strokeWidth="2.4" strokeLinecap="round" />
            ) : null}
          </g>
        </svg>
      </div>
    </button>
  );
}

function bodyStroke(band: BandId): string {
  if (band === "good") return "#e8e4da";
  if (band === "moderate") return "#e0d3bc";
  if (band === "unhealthy") return "#d4c0b4";
  if (band === "very-unhealthy") return "#cbb6be";
  return "#bba8af";
}

function CloudBody({ band, extra }: { band: BandId; extra: number }) {
  const fill =
    band === "good"
      ? "#fbfaf6"
      : band === "moderate"
        ? "#f3ead8"
        : band === "unhealthy"
          ? "#e6d3c6"
          : band === "very-unhealthy"
            ? "#d8c4cc"
            : "#c9b8bf";
  const bump = extra * 4;
  return (
    <g>
      <circle cx="92" cy="128" r={38 + bump} fill={fill} />
      <circle cx="188" cy="128" r={38 + bump} fill={fill} />
      <circle cx="118" cy="96" r={34 + bump} fill={fill} />
      <circle cx="162" cy="94" r={36 + bump} fill={fill} />
      <circle cx="140" cy="136" r={48 + bump} fill={fill} />
      <ellipse cx="140" cy="150" rx={70 + bump} ry={42 + bump / 2} fill={fill} />
    </g>
  );
}

function Bow() {
  return (
    <g>
      <ellipse cx="140" cy="72" rx="8" ry="7" fill="#2f6f6a" />
      <ellipse cx="128" cy="72" rx="11" ry="8" fill="#2f6f6a" />
      <ellipse cx="152" cy="72" rx="11" ry="8" fill="#2f6f6a" />
    </g>
  );
}

function Feet() {
  return (
    <g fill="#e8a39a">
      <ellipse cx="118" cy="194" rx="12" ry="7" />
      <ellipse cx="162" cy="194" rx="12" ry="7" />
    </g>
  );
}

function FlowerCrown() {
  return (
    <g>
      <circle cx="108" cy="70" r="7" fill="#c46b5a" />
      <circle cx="140" cy="58" r="8" fill="#d08a4a" />
      <circle cx="172" cy="70" r="7" fill="#c46b5a" />
      <circle cx="124" cy="62" r="5" fill="#2f6f6a" />
      <circle cx="156" cy="62" r="5" fill="#2f6f6a" />
    </g>
  );
}

function Eye({ cx, cy, tired }: { cx: number; cy: number; tired: boolean }) {
  if (tired) {
    return (
      <path
        d={`M${cx - 8} ${cy} Q ${cx} ${cy + 5} ${cx + 8} ${cy}`}
        fill="none"
        stroke="var(--color-fg)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  }
  return (
    <>
      <circle cx={cx} cy={cy} r="7.5" fill="var(--color-fg)" />
      <circle cx={cx + 2.4} cy={cy - 2.2} r="2.2" fill="#fbfaf6" />
    </>
  );
}

function mouthPath(band: BandId): string {
  if (band === "good") return "M122 146 Q140 166 158 146";
  if (band === "moderate") return "M124 150 Q140 158 156 150";
  if (band === "unhealthy") return "M126 156 Q140 150 154 156";
  if (band === "very-unhealthy") return "M128 158 Q140 152 152 160";
  return "M130 158 Q140 154 150 158";
}

function Sparkles() {
  return (
    <g className="puff-spark" stroke="var(--color-accent)" fill="none" strokeWidth="2" strokeLinecap="round">
      <path d="M46 78 v12 M40 84 h12" />
      <path d="M226 70 v10 M221 75 h10" />
      <path d="M232 150 v8 M228 154 h8" />
    </g>
  );
}
