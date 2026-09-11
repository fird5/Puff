import { Trophy } from "lucide-react";
import { listQuizBoard, type BoardRow } from "@/lib/quiz-board";
import { nameKey, percent } from "@/lib/quizzes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function HomeBoard({
  myName,
  refreshKey,
  onPlay,
}: {
  myName: string;
  refreshKey: number;
  onPlay: () => void;
}) {
  const [board, setBoard] = useState<BoardRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mine = myName ? nameKey(myName) : "";

  useEffect(() => {
    let alive = true;
    setError(null);
    void listQuizBoard()
      .then((rows) => {
        if (alive) setBoard(rows);
      })
      .catch(() => {
        if (alive) {
          setBoard([]);
          setError("Board is warming up.");
        }
      });
    return () => {
      alive = false;
    };
  }, [refreshKey]);

  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="inline-flex items-center gap-2 text-sm font-medium text-fg">
            <Trophy className="size-4" />
            Live board
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
            Fresh trivia is loaded each time you check the haze. Jump in to get on the board or keep your lead.
          </p>
        </div>
        <button
          type="button"
          onClick={onPlay}
          className="inline-flex h-11 shrink-0 items-center rounded-xl bg-accent px-3 text-sm font-medium text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96]"
        >
          Play
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-fg-muted">{error}</p> : null}
      {board === null && !error ? <div className="mt-4 h-28 animate-pulse rounded-xl bg-bg-subtle" /> : null}
      {board && board.length === 0 && !error ? (
        <p className="mt-4 text-sm text-fg-muted">Empty board. First nickname here gets bragging rights.</p>
      ) : null}
      {board && board.length > 0 ? (
        <ol className="mt-4 flex flex-col gap-1.5">
          {board.slice(0, 8).map((row, i) => (
            <li
              key={row.nameKey}
              className={cn(
                "flex items-baseline justify-between gap-3 rounded-xl px-3 py-2 text-sm",
                row.nameKey === mine ? "bg-good/12 text-fg" : "text-fg",
              )}
            >
              <span className="min-w-0 truncate">
                <span className="mr-2 tabular-nums text-fg-subtle">{i + 1}</span>
                {row.displayName}
              </span>
              <span className="shrink-0 tabular-nums text-fg-muted">
                {row.bestCorrect}/{row.bestTotal} · {percent(row.bestCorrect, row.bestTotal)}%
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
