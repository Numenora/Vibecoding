import { useEffect, useState } from "react";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

const reactions = ["❤️", "🔥", "🌚"] as const;
type Reaction = (typeof reactions)[number];
type Counts = Record<Reaction, number>;

const emptyCounts = (): Counts => ({ "❤️": 0, "🔥": 0, "🌚": 0 });
const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env;
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;
const supabase: SupabaseClient | null = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: true, autoRefreshToken: true } })
  : null;
let anonymousUserPromise: Promise<User> | null = null;

async function ensureAnonymousUser(client: SupabaseClient) {
  const { data: sessionData } = await client.auth.getSession();
  if (sessionData.session?.user) return sessionData.session.user;

  if (!anonymousUserPromise) {
    anonymousUserPromise = client.auth.signInAnonymously().then(({ data, error }) => {
      if (error || !data.user) throw error ?? new Error("Anonymous sign-in failed");
      return data.user;
    }).catch((error) => {
      anonymousUserPromise = null;
      throw error;
    });
  }

  return anonymousUserPromise;
}

export function ReactionBar({ projectSlug, variant }: { projectSlug: string; variant: "compact" | "case" }) {
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  const [selected, setSelected] = useState<Set<Reaction>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [busy, setBusy] = useState<Reaction | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    if (!supabase) return;

    void Promise.all([
      ensureAnonymousUser(supabase),
      supabase.from("project_reaction_counts").select("emoji,count").eq("project_slug", projectSlug),
    ]).then(async ([user, countResult]) => {
      if (countResult.error) throw countResult.error;
      const ownResult = await supabase
        .from("project_reactions")
        .select("emoji")
        .eq("project_slug", projectSlug)
        .eq("user_id", user.id);
      if (ownResult.error) throw ownResult.error;
      if (!active) return;

      const nextCounts = emptyCounts();
      countResult.data.forEach((row: { emoji: string; count: number }) => {
        if (reactions.includes(row.emoji as Reaction)) nextCounts[row.emoji as Reaction] = Number(row.count);
      });
      setCounts(nextCounts);
      setSelected(new Set(ownResult.data.map((row: { emoji: Reaction }) => row.emoji)));
      setUserId(user.id);
    }).catch(() => active && setError(true));

    return () => { active = false; };
  }, [projectSlug]);

  const toggle = async (emoji: Reaction) => {
    if (busy) return;
    const wasSelected = selected.has(emoji);
    setBusy(emoji);
    setError(false);
    setSelected((current) => {
      const next = new Set(current);
      wasSelected ? next.delete(emoji) : next.add(emoji);
      return next;
    });
    setCounts((current) => ({ ...current, [emoji]: Math.max(0, current[emoji] + (wasSelected ? -1 : 1)) }));

    if (!supabase) {
      setBusy(null);
      return;
    }

    try {
      const activeUserId = (await ensureAnonymousUser(supabase)).id;
      const result = wasSelected
        ? await supabase.from("project_reactions").delete().eq("project_slug", projectSlug).eq("emoji", emoji).eq("user_id", activeUserId)
        : await supabase.from("project_reactions").insert({ project_slug: projectSlug, emoji, user_id: activeUserId });
      if (result.error) throw result.error;
      setUserId(activeUserId);
    } catch {
      setSelected((current) => {
        const next = new Set(current);
        wasSelected ? next.add(emoji) : next.delete(emoji);
        return next;
      });
      setCounts((current) => ({ ...current, [emoji]: Math.max(0, current[emoji] + (wasSelected ? 1 : -1)) }));
      setError(true);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className={`reaction-bar reaction-bar--${variant}`} aria-label="Реакции на проект">
      {reactions.map((emoji) => (
        <button
          className={selected.has(emoji) ? "is-selected" : ""}
          type="button"
          key={emoji}
          onClick={() => void toggle(emoji)}
          disabled={busy !== null}
          aria-pressed={selected.has(emoji)}
          aria-label={`${selected.has(emoji) ? "Убрать" : "Поставить"} реакцию ${emoji}`}
        >
          <span className="reaction-emoji" aria-hidden="true">{emoji}</span>
          <span className="reaction-count">{counts[emoji]}</span>
        </button>
      ))}
      {error && <span className="reaction-error" role="status">Не удалось сохранить</span>}
    </div>
  );
}
