import { usePageContent, Rich } from "@/lib/pageContent";

export default function HolidaysPage() {
  const c = usePageContent("holidays");
  const COLORS = ["#E8614A", "#1AAFCC", "#1C3B5A"];
  const publicHolidays = c.public_holidays;
  const bigEvents = c.big_events.map((e, i) => ({ ...e, color: COLORS[i % COLORS.length] }));

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="px-4 pt-4 pb-24 max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#1AAFCC" }}>{c.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{c.subtitle}</p>
        </div>

        {/* Holiday closure warning */}
        <div className="rounded-2xl border border-amber-300 dark:border-amber-700 p-4" style={{ background: "#FFF8E7" }}>
          <p className="font-bold text-sm text-amber-800 dark:text-amber-400 mb-1">{c.warning_title}</p>
          <p className="text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
            <Rich text={c.warning_text} />
          </p>
        </div>

        {/* Big Events */}
        {bigEvents.map(event => (
          <div key={event.name} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-3" style={{ background: event.color + "18" }}>
              <span className="text-2xl">{event.emoji}</span>
              <div>
                <h2 className="font-bold text-base" style={{ color: event.color }}>{event.name}</h2>
                <p className="text-xs text-muted-foreground">{event.when}</p>
              </div>
            </div>
            <div className="px-4 py-3 space-y-3">
              <p className="text-sm text-foreground leading-relaxed"><Rich text={event.description} /></p>
              <div className="space-y-1">
                {event.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span style={{ color: event.color }} className="mt-0.5 shrink-0">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-3 py-2 text-xs text-foreground leading-relaxed" style={{ background: event.color + "15" }}>
                <span className="font-semibold" style={{ color: event.color }}>The Salt: </span>
                <Rich text={event.the_salt} />
              </div>
            </div>
          </div>
        ))}

        {/* Public Holidays */}
        <div>
          <h2 className="text-base font-bold mb-3 text-foreground">Public Holidays</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
            {publicHolidays.map((h, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3">
                <span className="text-xs font-mono font-semibold pt-0.5 shrink-0 w-14" style={{ color: "#1AAFCC" }}>{h.date}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{h.name}</p>
                  {h.note && <p className="text-xs text-muted-foreground mt-0.5">{h.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center pb-2">{c.footer}</p>
      </div>
    </div>
  );
}
