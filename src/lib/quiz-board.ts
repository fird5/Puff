import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { cleanName, nameKey } from "@/lib/quizzes";

export type BoardRow = {
  nameKey: string;
  displayName: string;
  bestCorrect: number;
  bestTotal: number;
  rounds: number;
};

export const listQuizBoard = createServerFn({ method: "GET" }).handler(async (): Promise<BoardRow[]> => {
  const sql = await getSql();
  const rows = await sql<{
    name_key: string;
    display_name: string;
    best_correct: number;
    best_total: number;
    rounds: number;
  }>`
    select name_key, display_name, best_correct, best_total, rounds
    from quiz_scores
    order by (best_correct::float / nullif(best_total, 0)) desc, rounds desc, updated_at asc
    limit 20
  `;
  return rows.map((row) => ({
    nameKey: row.name_key,
    displayName: row.display_name,
    bestCorrect: row.best_correct,
    bestTotal: row.best_total,
    rounds: row.rounds,
  }));
});

export const submitQuizRound = createServerFn({ method: "POST" })
  .validator((input: { correct: number; total: number; displayName: string }) => {
    const total = Math.round(Number(input.total));
    const correct = Math.round(Number(input.correct));
    if (total < 5 || total > 8) throw new Error("Round size must be 5 to 8.");
    if (correct < 0 || correct > total) throw new Error("Score is out of range.");
    return { correct, total, displayName: cleanName(input.displayName) };
  })
  .handler(async ({ data }): Promise<BoardRow> => {
    const sql = await getSql();
    const key = nameKey(data.displayName);
    const existing = await sql<{
      best_correct: number;
      best_total: number;
      rounds: number;
    }>`select best_correct, best_total, rounds from quiz_scores where name_key = ${key} limit 1`;

    const prev = existing[0];
    const prevPct = prev ? prev.best_correct / Math.max(1, prev.best_total) : -1;
    const nextPct = data.correct / data.total;
    const better = !prev || nextPct > prevPct || (nextPct === prevPct && data.correct > prev.best_correct);
    const bestCorrect = better ? data.correct : prev!.best_correct;
    const bestTotal = better ? data.total : prev!.best_total;
    const rounds = (prev?.rounds ?? 0) + 1;

    await sql`
      insert into quiz_scores (name_key, display_name, best_correct, best_total, rounds, updated_at)
      values (${key}, ${data.displayName}, ${bestCorrect}, ${bestTotal}, ${rounds}, now())
      on conflict (name_key) do update set
        display_name = excluded.display_name,
        best_correct = excluded.best_correct,
        best_total = excluded.best_total,
        rounds = excluded.rounds,
        updated_at = now()
    `;

    return {
      nameKey: key,
      displayName: data.displayName,
      bestCorrect,
      bestTotal,
      rounds,
    };
  });
