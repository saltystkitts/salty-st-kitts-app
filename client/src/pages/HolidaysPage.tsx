export default function HolidaysPage() {
  const publicHolidays = [
    { date: "Jan 1",    name: "New Year's Day" },
    { date: "Jan 2",    name: "Carnival Last Lap", note: "Rolls over from Carnival season" },
    { date: "Mar/Apr",  name: "Good Friday",       note: "Date varies" },
    { date: "Mar/Apr",  name: "Easter Monday",     note: "Date varies" },
    { date: "May 1",    name: "Labour Day" },
    { date: "May/Jun",  name: "Whit Monday",       note: "Date varies" },
    { date: "Aug",      name: "Emancipation Day",  note: "First Monday in August" },
    { date: "Aug",      name: "Culturama Day",     note: "Nevis — first Tuesday after Emancipation Monday" },
    { date: "Sep 19",   name: "Independence Day",  note: "National holiday — big celebrations island-wide" },
    { date: "Nov",      name: "National Heroes Day", note: "Observed in November" },
    { date: "Dec 25",   name: "Christmas Day" },
    { date: "Dec 26",   name: "Boxing Day" },
  ];

  const bigEvents = [
    {
      emoji: "🎭",
      name: "Carnival",
      period: "Late December – Early January",
      color: "#E8614A",
      description: "St Kitts Carnival — locally called Sugar Mas — is the most culturally significant celebration on the island. It runs from mid-December through January 2nd. The streets come alive with J'ouvert (jouvert), calypso, soca music, elaborate masquerade bands, and steel pan. The energy is electric and nothing else on the island compares.",
      highlights: [
        "J'ouvert — early morning street party, paint and powder everywhere",
        "Masquerade bands parade through Basseterre",
        "Calypso and soca competitions",
        "Street food, rum, and dancing until the sun comes up",
        "Last Lap on January 2nd closes it all out",
      ],
      tip: "If you are on island for Carnival, clear your schedule. J'ouvert starts around 4am and that's not a joke — show up.",
    },
    {
      emoji: "🎵",
      name: "St Kitts Music Festival",
      period: "Late June (usually last weekend)",
      color: "#1AAFCC",
      description: "The St Kitts Music Festival is one of the premier music events in the Eastern Caribbean, drawing international and regional artists across R&B, reggae, soca, jazz, and gospel over three nights at the Warner Park stadium. It has hosted everyone from Lionel Richie to Beres Hammond. The crowd is a genuine mix of locals and visitors — this is not a tourist trap, it is a real event.",
      highlights: [
        "Three nights of live performances",
        "International headliners alongside Caribbean artists",
        "R&B, reggae, soca, jazz, and gospel stages",
        "Warner Park Stadium, Basseterre",
        "Street food vendors and bars around the venue",
      ],
      tip: "Book accommodation well in advance — the island fills up fast during Music Fest weekend. Friday night tends to have the best lineup.",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="px-4 pt-4 pb-24 max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#1AAFCC" }}>Holidays & Events</h1>
          <p className="text-sm text-muted-foreground mt-1">The St Kitts calendar — what's happening and when.</p>
        </div>

        {/* Big Events */}
        {bigEvents.map(event => (
          <div key={event.name} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-3" style={{ background: event.color + "18" }}>
              <span className="text-2xl">{event.emoji}</span>
              <div>
                <h2 className="font-bold text-base" style={{ color: event.color }}>{event.name}</h2>
                <p className="text-xs text-muted-foreground">{event.period}</p>
              </div>
            </div>
            <div className="px-4 py-3 space-y-3">
              <p className="text-sm text-foreground leading-relaxed">{event.description}</p>
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
                {event.tip}
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

        <p className="text-xs text-muted-foreground text-center pb-2">Dates may shift year to year. Always verify locally.</p>
      </div>
    </div>
  );
}
