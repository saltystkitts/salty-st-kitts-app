import { Phone, Globe } from "lucide-react";
import { usePageContent, Rich } from "@/lib/pageContent";

function prettyUrl(u: string) {
  return u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default function ActionTingsPage() {
  const c = usePageContent("action_tings");
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <h1 className="font-extrabold text-lg text-white">{c.title}</h1>
        <p className="text-sm mt-0.5" style={{ color: "#1AAFCC" }}>{c.subtitle}</p>
      </div>

      <div className="px-4 py-2 border-b border-border shrink-0" style={{ background: "#E8614A14" }}>
        <p className="text-xs leading-snug text-foreground/80">🧂 Nobody pays to be here. Everything's based on years of experience and preference, and subject to change.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {c.activities.filter(a => a.name).map((a, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-2">
            <h2 className="font-bold text-base text-foreground">{a.name}</h2>
            {a.description && <p className="text-sm text-muted-foreground leading-relaxed"><Rich text={a.description} /></p>}
            {(a.phone || a.website) && (
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                {a.phone && (
                  <a href={`tel:${a.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#1AAFCC" }}>
                    <Phone className="w-3.5 h-3.5" />{a.phone}
                  </a>
                )}
                {a.website && (
                  <a href={a.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#1AAFCC" }}>
                    <Globe className="w-3.5 h-3.5" />{prettyUrl(a.website)}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="h-4" />
      </div>
    </div>
  );
}
