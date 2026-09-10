import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles, Trophy } from "lucide-react";
import { PuffCharacter } from "@/components/puff-character";
import { listQuizBoard, submitQuizRound, type BoardRow } from "@/lib/quiz-board";
import {
  STAGE_LABEL,
  cleanName,
  dealRound,
  nameKey,
  percent,
  stageFromRounds,
  type QuizQuestion,
  type QuizSave,
} from "@/lib/quizzes";
import type { BandId } from "@/lib/psi";
import { cn } from "@/lib/utils";

type Props = {
  band: BandId;
  save: QuizSave;
  onClose: () => void;
  onFinish: (correct: number, total: number) => void;
  onName: (name: string) => void;
};

type PlayState =
  | { mode: "lobby" }
  | { mode: "ask"; questions: QuizQuestion[]; index: number; score: number; picked: number | null }
  | {
      mode: "done";
      questions: QuizQuestion[];
      score: number;
      posted: boolean;
      postError: string | null;
    };

export function PuffQuiz({ band, save, onClose, onFinish, onName }: Props) {
  const [play, setPlay] = useState<PlayState>({ mode: "lobby" });
  const [board, setBoard] = useState<BoardRow[] | null>(null);
  const [boardError, setBoardError] = useState<string | null>(null);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [nameDraft, setNameDraft] = useState(save.name);
  const [nameHint, setNameHint] = useState<string | null>(null);
  const stage = stageFromRounds(save.rounds);

  async function loadBoard() {
    setBoardError(null);
    try {
      setBoard(await listQuizBoard());
    } catch {
      setBoard([]);
      setBoardError("Board is taking a nap. Play anyway.");
    }
  }

  useEffect(() => {
    void loadBoard();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function commitName(raw: string): string | null {
    try {
      const next = cleanName(raw);
      setNameDraft(next);
      onName(next);
      return next;
    } catch {
      return null;
    }
  }

  function startRound() {
    if (nameDraft.trim()) {
      const committed = commitName(nameDraft);
      if (!committed) {
        setNameHint("Two characters is enough. Skip emails.");
        return;
      }
    }
    setNameHint(null);
    const questions = dealRound(seenIds);
    setSeenIds((prev) => [...prev, ...questions.map((q) => q.id)].slice(-24));
    setPlay({ mode: "ask", questions, index: 0, score: 0, picked: null });
  }

  function pickChoice(choice: number) {
    if (play.mode !== "ask" || play.picked != null) return;
    setPlay({ ...play, picked: choice });
  }

  async function postScore(score: number, total: number, rawName: string) {
    try {
      const displayName = cleanName(rawName);
      onName(displayName);
      setNameDraft(displayName);
      await submitQuizRound({ data: { correct: score, total, displayName } });
      void loadBoard();
      return { posted: true as const, postError: null };
    } catch (err) {
      return {
        posted: false as const,
        postError: err instanceof Error ? err.message : "Could not reach the board.",
      };
    }
  }

  async function next() {
    if (play.mode !== "ask" || play.picked == null) return;
    const q = play.questions[play.index]!;
    const score = play.score + (play.picked === q.answer ? 1 : 0);
    const nextIndex = play.index + 1;
    if (nextIndex >= play.questions.length) {
      onFinish(score, play.questions.length);
      const name = save.name || nameDraft;
      const result = name.trim().length >= 2 ? await postScore(score, play.questions.length, name) : { posted: false, postError: null };
      setPlay({ mode: "done", questions: play.questions, score, ...result });
      return;
    }
    setPlay({ mode: "ask", questions: play.questions, index: nextIndex, score, picked: null });
  }

  async function postFromDone() {
    if (play.mode !== "done") return;
    const result = await postScore(play.score, play.questions.length, nameDraft);
    setPlay({ ...play, ...result });
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-bg"
      role="dialog"
      aria-modal="true"
      aria-label="Southeast Asia trivia"
    >
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-6 sm:px-6">
        <header className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={play.mode === "lobby" ? onClose : () => setPlay({ mode: "lobby" })}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 text-sm font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <ArrowLeft className="size-4" />
            {play.mode === "lobby" ? "Back" : "Lobby"}
          </button>
          <p className="text-sm text-fg-muted">
            {STAGE_LABEL[stage]} · {save.rounds} round{save.rounds === 1 ? "" : "s"}
          </p>
        </header>

        {play.mode === "lobby" ? (
          <Lobby
            band={band}
            stage={stage}
            save={save}
            board={board}
            boardError={boardError}
            nameDraft={nameDraft}
            nameHint={nameHint}
            onNameDraft={(value) => {
              setNameHint(null);
              setNameDraft(value);
            }}
            onStart={startRound}
          />
        ) : null}

        {play.mode === "ask" ? (
          <Ask
            questions={play.questions}
            index={play.index}
            picked={play.picked}
            score={play.score}
            onPick={pickChoice}
            onNext={() => void next()}
          />
        ) : null}

        {play.mode === "done" ? (
          <Done
            band={band}
            stage={stageFromRounds(save.rounds)}
            score={play.score}
            total={play.questions.length}
            posted={play.posted}
            postError={play.postError}
            nameDraft={nameDraft}
            onNameDraft={setNameDraft}
            onPost={() => void postFromDone()}
            onAgain={startRound}
            onLobby={() => setPlay({ mode: "lobby" })}
          />
        ) : null}
      </div>
    </div>
  );
}

function Lobby({
  band,
  stage,
  save,
  board,
  boardError,
  nameDraft,
  nameHint,
  onNameDraft,
  onStart,
}: {
  band: BandId;
  stage: number;
  save: QuizSave;
  board: BoardRow[] | null;
  boardError: string | null;
  nameDraft: string;
  nameHint: string | null;
  onNameDraft: (value: string) => void;
  onStart: () => void;
}) {
  const mine = save.name ? nameKey(save.name) : "";

  return (
    <div className="mt-6 flex flex-col gap-5">
      <div className="text-center">
        <PuffCharacter band={band} stage={stage} className="mx-auto h-40 w-40" />
        <h2 className="font-display text-3xl tracking-tight text-fg">Come on — see how you rank</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          A short trivia on Southeast Asia. Five to eight questions, mixed new every round. Drop a
          nickname. That is the whole sign-up.
        </p>
        {save.bestTotal > 0 ? (
          <p className="mt-2 text-sm text-fg-subtle">
            Best here: {save.bestCorrect}/{save.bestTotal} ({percent(save.bestCorrect, save.bestTotal)}%)
          </p>
        ) : null}
        <label className="mt-4 block text-left">
          <span className="text-xs font-medium tracking-wide text-fg-subtle uppercase">Your name on the board</span>
          <input
            value={nameDraft}
            onChange={(event) => onNameDraft(event.target.value)}
            maxLength={20}
            placeholder="e.g. Auntie K"
            autoComplete="nickname"
            className="mt-1.5 h-11 w-full rounded-xl border border-border bg-bg-elevated px-3 text-sm text-fg"
          />
        </label>
        {nameHint ? <p className="mt-2 text-left text-sm text-unhealthy">{nameHint}</p> : null}
        <button
          type="button"
          onClick={onStart}
          className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96] sm:w-auto"
        >
          <Sparkles className="size-4" />
          I'm in
        </button>
      </div>

      <section className="rounded-2xl border border-border bg-bg-elevated p-5">
        <h3 className="inline-flex items-center gap-2 text-sm font-medium text-fg">
          <Trophy className="size-4" />
          Who is ranking
        </h3>
        {boardError ? <p className="mt-3 text-sm text-fg-muted">{boardError}</p> : null}
        {board === null && !boardError ? (
          <div className="mt-3 h-24 animate-pulse rounded-xl bg-bg-subtle" />
        ) : null}
        {board && board.length === 0 && !boardError ? (
          <p className="mt-3 text-sm text-fg-muted">Empty board. First nickname here gets bragging rights.</p>
        ) : null}
        {board && board.length > 0 ? (
          <ol className="mt-3 flex flex-col gap-2">
            {board.map((row, i) => (
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
    </div>
  );
}

function Ask({
  questions,
  index,
  picked,
  score,
  onPick,
  onNext,
}: {
  questions: QuizQuestion[];
  index: number;
  picked: number | null;
  score: number;
  onPick: (choice: number) => void;
  onNext: () => void;
}) {
  const q = questions[index]!;
  const locked = picked != null;
  const correct = picked === q.answer;
  const where = q.tag === "sg" ? "Singapore" : "Southeast Asia";

  return (
    <div className="mt-6 flex flex-col gap-5">
      <p className="text-xs font-medium tracking-wide text-fg-subtle uppercase">
        Round of {questions.length} · {index + 1} / {questions.length} · {score} right · {where}
      </p>
      <h2 className="font-display text-2xl leading-snug tracking-tight text-fg">{q.prompt}</h2>
      <div className="flex flex-col gap-2">
        {q.choices.map((choice, i) => {
          const isAnswer = i === q.answer;
          const isPicked = i === picked;
          return (
            <button
              key={`${q.id}-${i}`}
              type="button"
              disabled={locked}
              onClick={() => onPick(i)}
              className={cn(
                "min-h-14 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-transform duration-150 ease-out active:scale-[0.96] disabled:active:scale-100",
                !locked && "border-border bg-bg-elevated text-fg",
                locked && isAnswer && "border-good bg-good/12 text-good",
                locked && isPicked && !isAnswer && "border-unhealthy bg-unhealthy/10 text-unhealthy",
                locked && !isAnswer && !isPicked && "border-border bg-bg-elevated text-fg-subtle",
              )}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {locked ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-fg-muted">{correct ? q.wow : q.oof}</p>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-4 text-sm font-medium text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            {index + 1 === questions.length ? "See score" : "Next"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Done({
  band,
  stage,
  score,
  total,
  posted,
  postError,
  nameDraft,
  onNameDraft,
  onPost,
  onAgain,
  onLobby,
}: {
  band: BandId;
  stage: number;
  score: number;
  total: number;
  posted: boolean;
  postError: string | null;
  nameDraft: string;
  onNameDraft: (value: string) => void;
  onPost: () => void;
  onAgain: () => void;
  onLobby: () => void;
}) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 text-center">
      <PuffCharacter band={band} stage={stage} popping className="h-48 w-48" />
      <p className="font-display text-3xl tracking-tight text-fg">
        {score}/{total} · {percent(score, total)}%
      </p>
      {posted ? (
        <p className="max-w-prose text-sm leading-relaxed text-fg-muted">
          You are on the board as {nameDraft}. Another round is a different 5 to 8 questions.
        </p>
      ) : (
        <div className="w-full max-w-sm text-left">
          <p className="text-sm leading-relaxed text-fg-muted">
            {postError ?? "Put a nickname on this run and you are ranked. No account."}
          </p>
          <label className="mt-3 block">
            <span className="text-xs font-medium tracking-wide text-fg-subtle uppercase">Nickname</span>
            <input
              value={nameDraft}
              onChange={(event) => onNameDraft(event.target.value)}
              maxLength={20}
              placeholder="e.g. Auntie K"
              autoComplete="nickname"
              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-bg-elevated px-3 text-sm text-fg"
            />
          </label>
          <button
            type="button"
            onClick={onPost}
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl bg-accent px-4 text-sm font-medium text-accent-fg transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            Put me on the board
          </button>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={onAgain}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-4 text-sm font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.96]"
        >
          <Sparkles className="size-4" />
          New round
        </button>
        <button
          type="button"
          onClick={onLobby}
          className="inline-flex h-11 items-center rounded-xl border border-border bg-bg-elevated px-4 text-sm font-medium text-fg transition-transform duration-150 ease-out active:scale-[0.96]"
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}
