import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function MoreBelow() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY < 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => document.getElementById("puff-more")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-bg-elevated/95 px-3 py-2 text-[11px] font-medium text-fg shadow-sm backdrop-blur lg:hidden"
    >
      Puff and trivia live below
      <ChevronDown className="size-3.5 animate-bounce" />
    </button>
  );
}
