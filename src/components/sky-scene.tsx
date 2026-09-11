import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { currentSky } from "@/lib/sky";
import type { BandId } from "@/lib/psi";

export function SkyScene({ band, children }: { band: BandId; children: ReactNode }) {
  const [sky, setSky] = useState(() => currentSky());

  useEffect(() => {
    const tick = () => setSky(currentSky());
    tick();
    const id = window.setInterval(tick, 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  return <div className={cn("puff-scene min-h-dvh", `band-${band}`, `sky-${sky}`)}>{children}</div>;
}
