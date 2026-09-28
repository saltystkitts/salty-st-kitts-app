import { Phone } from "lucide-react";
import { usePageContent, Rich } from "@/lib/pageContent";

export default function TaxiPage() {
  const c = usePageContent("taxi");
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <h1 className="font-extrabold text-lg text-white">{c.title}</h1>
        <p className="text-sm mt-0.5" style={{ color: "#1AAFCC" }}>{c.subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">

        {/* Need to know */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
          <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#1AAFCC" }}>Before You Go</h2>
          <ul className="space-y-2 text-sm text-foreground/85">
            {c.before_you_go.map((line, i) => <li key={i}><Rich text={line} /></li>)}
          </ul>
        </div>

        {/* Uber warning */}
        <div className="rounded-2xl border border-amber-300 dark:border-amber-700 p-4 space-y-2" style={{ background: "#FFF8E7" }}>
          <h2 className="font-bold text-sm uppercase tracking-wide text-amber-800 dark:text-amber-400">{c.uber_title}</h2>
          <p className="text-sm text-amber-900 dark:text-amber-300 leading-relaxed"><Rich text={c.uber_text} /></p>
        </div>

        {/* Fare table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-bold text-base">Sample Fares</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{c.fares_note}</p>
          </div>

          <div className="grid grid-cols-4 px-4 py-2 border-b border-border bg-muted/40">
            <div className="text-xs font-bold text-muted-foreground col-span-1">From / To</div>
            <div className="text-xs font-bold text-center" style={{ color: "#1AAFCC" }}>{c.fare_column_1}</div>
            <div className="text-xs font-bold text-center" style={{ color: "#1AAFCC" }}>{c.fare_column_2}</div>
            <div className="text-xs font-bold text-center" style={{ color: "#1AAFCC" }}>{c.fare_column_3}</div>
          </div>

          {c.sample_fares.map((row, i) => (
            <div key={i} className="grid grid-cols-4 px-4 py-3 border-b border-border/50 last:border-b-0">
              <div className="text-sm font-medium col-span-1 pr-2 leading-tight">{row.from}</div>
              <div className="text-sm text-center font-semibold">{row.column_1}</div>
              <div className="text-sm text-center font-semibold">{row.column_2}</div>
              <div className="text-sm text-center font-semibold">{row.column_3}</div>
            </div>
          ))}
        </div>

        {/* Salty tip */}
        <div className="rounded-2xl p-4 text-sm" style={{ background: "#1AAFCC11", borderLeft: "3px solid #1AAFCC" }}>
          <p className="font-bold mb-1 text-xs uppercase tracking-wide" style={{ color: "#1AAFCC" }}>🧂 The Salt</p>
          <p className="text-foreground/85 leading-relaxed"><Rich text={c.the_salt} /></p>
        </div>

        {/* Taxi stands */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#1AAFCC" }}>Taxi Stands</h2>
          <div className="space-y-3 text-sm text-foreground/85">
            {c.taxi_stands.map((st, i) => (
              <div key={i} className="flex items-start gap-2">
                <span>📍</span>
                <div>
                  <strong>{st.name}</strong>{st.detail ? <> — {st.detail}</> : null}
                  {st.phone && (
                    <a href={`tel:${st.phone.replace(/[^0-9+]/g, "")}`} className="block mt-0.5 font-semibold" style={{ color: "#1AAFCC" }}>
                      <Phone className="w-3.5 h-3.5 inline mr-1" />{st.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {c.stands_footer && <div><Rich text={c.stands_footer} /></div>}
          </div>
        </div>

        {/* H Buses */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
          <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#1AAFCC" }}>{c.h_bus_title}</h2>
          <div className="space-y-2 text-sm text-foreground/85">
            <p><Rich text={c.h_bus_intro} /></p>
            <ul className="space-y-1.5 mt-2">
              {c.h_bus_points.map((line, i) => <li key={i}><Rich text={line} /></li>)}
            </ul>
          </div>
        </div>

        {/* Late night reminder */}
        <div className="rounded-2xl p-4 text-sm border border-border bg-card">
          <p className="text-foreground/85 leading-relaxed"><Rich text={c.late_night} /></p>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
