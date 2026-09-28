import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { PAGE_DEFAULTS, type PageKey } from "@shared/pageDefaults";

/** Deep-merge saved content over defaults (objects merge, arrays/strings replace). */
export function mergeContent<T>(defaults: T, saved: any): T {
  if (saved === undefined || saved === null) return defaults;
  if (Array.isArray(defaults) || typeof defaults !== "object" || defaults === null) return saved as T;
  const out: any = { ...defaults };
  for (const k of Object.keys(saved)) {
    out[k] = k in (defaults as any) ? mergeContent((defaults as any)[k], saved[k]) : saved[k];
  }
  return out;
}

export function usePageContent<K extends PageKey>(key: K): (typeof PAGE_DEFAULTS)[K] {
  const { data } = useQuery({
    queryKey: ["/api/pages", key],
    queryFn: () => fetch(`/api/pages/${key}`).then(r => (r.ok ? r.json() : null)).catch(() => null),
    staleTime: 60_000,
  });
  return mergeContent(PAGE_DEFAULTS[key], data?.content);
}

/** Render text with **bold** markers. */
export function Rich({ text }: { text: string }) {
  const parts = (text || "").split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") && p.length > 4
          ? <strong key={i} className="text-foreground">{p.slice(2, -2)}</strong>
          : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
}

/** "6:00 AM, 7:00 AM" -> ["6:00 AM", "7:00 AM"] */
export function times(list: string): string[] {
  return (list || "").split(",").map(s => s.trim()).filter(Boolean);
}
