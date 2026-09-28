import { useEffect, useState } from "react";
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";
import { PAGE_DEFAULTS, PAGE_LABELS, type PageKey } from "@shared/pageDefaults";
import { mergeContent } from "@/lib/pageContent";

const ADMIN_HEADERS = { "Content-Type": "application/json", "x-admin-password": "salty2026" };

const LABEL_OVERRIDES: Record<string, string> = {
  to_nevis: "To Nevis — times, separated by commas",
  to_st_kitts: "To St Kitts — times, separated by commas",
  salty_says: "Salty says",
  the_salt: "The Salt",
  column_1: "Col 1", column_2: "Col 2", column_3: "Col 3",
  h_bus_title: "H bus title", h_bus_intro: "H bus intro", h_bus_points: "H bus points",
};

function pretty(key: string) {
  if (LABEL_OVERRIDES[key]) return LABEL_OVERRIDES[key];
  const s = key.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function blankLike(v: any): any {
  if (typeof v === "string") return "";
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blankLike(x)]));
  return v;
}

const inputCls = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm";

function TextField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const long = value.length > 50 || value.includes("\n");
  return long ? (
    <textarea className={inputCls} rows={Math.min(8, Math.max(2, Math.ceil(value.length / 45)))} value={value} onChange={e => onChange(e.target.value)} />
  ) : (
    <input className={inputCls} value={value} onChange={e => onChange(e.target.value)} />
  );
}

function Field({ name, value, onChange, depth }: { name: string; value: any; onChange: (v: any) => void; depth: number }) {
  const label = <label className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground block mb-1">{pretty(name)}</label>;

  if (typeof value === "string") {
    return <div>{label}<TextField value={value} onChange={onChange} /></div>;
  }

  if (Array.isArray(value)) {
    const template = value.length ? value[0] : "";
    const isStrings = typeof template === "string";
    const move = (i: number, d: number) => {
      const j = i + d; if (j < 0 || j >= value.length) return;
      const next = [...value]; [next[i], next[j]] = [next[j], next[i]]; onChange(next);
    };
    return (
      <div>
        {label}
        <div className="space-y-2">
          {value.map((item, i) => (
            <div key={i} className={isStrings ? "flex gap-1.5 items-start" : "rounded-xl border border-border bg-muted/20 p-3 space-y-2"}>
              {isStrings ? (
                <div className="flex-1"><TextField value={item} onChange={v => { const n = [...value]; n[i] = v; onChange(n); }} /></div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{item.name || item.from || item.date || `Item ${i + 1}`}</span>
                  <span />
                </div>
              )}
              {!isStrings && Object.entries(item).map(([k, v]) => (
                <Field key={k} name={k} value={v} depth={depth + 1} onChange={nv => { const n = [...value]; n[i] = { ...item, [k]: nv }; onChange(n); }} />
              ))}
              <div className={`flex gap-1 ${isStrings ? "" : "justify-end pt-1"}`}>
                <button type="button" title="Move up" onClick={() => move(i, -1)} className="p-1.5 rounded-md border border-border text-muted-foreground"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button type="button" title="Move down" onClick={() => move(i, 1)} className="p-1.5 rounded-md border border-border text-muted-foreground"><ChevronDown className="w-3.5 h-3.5" /></button>
                <button type="button" title="Remove" onClick={() => { if (isStrings || confirm("Remove this item?")) onChange(value.filter((_, j) => j !== i)); }} className="p-1.5 rounded-md border border-red-200 text-red-500"><X className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => onChange([...value, blankLike(template)])} className="w-full py-2 rounded-lg border border-dashed text-xs font-bold flex items-center justify-center gap-1" style={{ borderColor: "#1AAFCC", color: "#1AAFCC" }}>
            <Plus className="w-3.5 h-3.5" /> Add {isStrings ? "line" : "item"}
          </button>
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const body = (
      <div className="space-y-3 pt-2">
        {Object.entries(value).map(([k, v]) => (
          <Field key={k} name={k} value={v} depth={depth + 1} onChange={nv => onChange({ ...value, [k]: nv })} />
        ))}
      </div>
    );
    return (
      <details className="rounded-xl border border-border bg-card px-3 py-2" open={depth === 0 ? false : undefined}>
        <summary className="text-sm font-bold cursor-pointer select-none py-1" style={{ color: "#1C3B5A" }}>{pretty(name)}</summary>
        {body}
      </details>
    );
  }
  return null;
}

export function PageEditor() {
  const [page, setPage] = useState<PageKey>("ferry");
  const [content, setContent] = useState<any>(PAGE_DEFAULTS.ferry);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let live = true;
    fetch(`/api/pages/${page}`).then(r => r.json()).then(d => {
      if (live) { setContent(mergeContent(PAGE_DEFAULTS[page], d?.content)); setDirty(false); }
    }).catch(() => live && setContent(PAGE_DEFAULTS[page]));
    return () => { live = false; };
  }, [page]);

  async function save() {
    setStatus("saving");
    const r = await fetch(`/api/admin/pages/${page}`, { method: "PUT", headers: ADMIN_HEADERS, body: JSON.stringify({ content }) });
    setStatus(r.ok ? "saved" : "error"); if (r.ok) setDirty(false);
    setTimeout(() => setStatus("idle"), 2500);
  }

  async function reset() {
    if (!confirm(`Reset ${PAGE_LABELS[page]} back to the original content? Your edits on this page will be lost.`)) return;
    await fetch(`/api/admin/pages/${page}`, { method: "DELETE", headers: ADMIN_HEADERS });
    setContent(PAGE_DEFAULTS[page]); setDirty(false);
  }

  function switchPage(p: PageKey) {
    if (dirty && !confirm("You have unsaved changes. Leave without saving?")) return;
    setPage(p);
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(Object.keys(PAGE_DEFAULTS) as PageKey[]).map(p => (
          <button key={p} onClick={() => switchPage(p)} className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border"
            style={{ background: page === p ? "#1AAFCC" : "transparent", color: page === p ? "white" : "var(--muted-foreground)", borderColor: page === p ? "#1AAFCC" : "var(--border)" }}>
            {PAGE_LABELS[p]}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Tap a section to open it. Put <strong>**double asterisks**</strong> around words to make them bold. Hit Save when done. Changes go live instantly.
      </p>

      <div className="space-y-2">
        {Object.entries(content).map(([k, v]) => (
          <Field key={page + k} name={k} value={v} depth={0} onChange={nv => { setContent({ ...content, [k]: nv }); setDirty(true); }} />
        ))}
      </div>

      <div className="sticky bottom-0 bg-background pt-2 pb-3 flex gap-2">
        <button onClick={save} disabled={status === "saving"} className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
          style={{ background: status === "saved" ? "#22c55e" : status === "error" ? "#E8614A" : "#1AAFCC" }}>
          {status === "saving" ? "Saving…" : status === "saved" ? "✓ Saved" : status === "error" ? "Save failed — try again" : `Save ${PAGE_LABELS[page]}`}
        </button>
        <button onClick={reset} className="px-3 py-3 rounded-xl text-xs font-bold border border-border text-muted-foreground">Reset</button>
      </div>
    </div>
  );
}
