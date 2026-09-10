create table if not exists quiz_scores (
  name_key text primary key,
  display_name text not null,
  best_correct integer not null,
  best_total integer not null,
  rounds integer not null default 1,
  updated_at timestamptz not null default now()
);
