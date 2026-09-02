import { Phone } from "lucide-react";

export default function TaxiPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <h1 className="font-extrabold text-lg text-white">Taxis & Getting Around</h1>
        <p className="text-sm mt-0.5" style={{ color: "#1AAFCC" }}>
          Fixed rates. Yellow plates. Know before you go.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">

        {/* Need to know */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
          <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#1AAFCC" }}>Before You Go</h2>
          <ul className="space-y-2 text-sm text-foreground/85">
            <li>🟡 Taxis have <strong>yellow plates</strong> starting with T or TA</li>
            <li>💵 Rates are <strong>fixed in US dollars</strong> for 1–4 passengers</li>
            <li>💳 Most taxis <strong>do not take cards</strong> — bring cash</li>
            <li>🌙 <strong>50% surcharge</strong> after 10pm</li>
            <li>🧳 Extra luggage charge on airport runs</li>
            <li>✅ Always confirm the fare <strong>before</strong> you get in</li>
          </ul>
        </div>

        {/* Uber warning */}
        <div className="rounded-2xl border border-amber-300 dark:border-amber-700 p-4 space-y-2" style={{ background: "#FFF8E7" }}>
          <h2 className="font-bold text-sm uppercase tracking-wide text-amber-800 dark:text-amber-400">⚠️ About "Ubers" on St Kitts</h2>
          <p className="text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
            There is no official Uber or Lyft on St Kitts. Some drivers operate informally through WhatsApp or apps and are commonly called "Ubers" locally — but they are <strong>not sanctioned by the government</strong> and ride at your own risk. If you do use one, always <strong>confirm the driver's name</strong> before getting in, and share your location with someone you trust.
          </p>
        </div>

        {/* Fare table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-bold text-base">Sample Fares</h2>
            <p className="text-xs text-muted-foreground mt-0.5">USD · 1–4 passengers · representative only — confirm with driver</p>
          </div>

          <div className="grid grid-cols-4 px-4 py-2 border-b border-border bg-muted/40">
            <div className="text-xs font-bold text-muted-foreground col-span-1">From / To</div>
            <div className="text-xs font-bold text-center" style={{ color: "#1AAFCC" }}>Basseterre</div>
            <div className="text-xs font-bold text-center" style={{ color: "#1AAFCC" }}>Frigate Bay</div>
            <div className="text-xs font-bold text-center" style={{ color: "#1AAFCC" }}>SE Peninsula</div>
          </div>

          {[
            { label: "Airport",             basse: "$15",  frigate: "$25",  sep: "$65"  },
            { label: "Basseterre",          basse: "—",    frigate: "$25",  sep: "$65"  },
            { label: "Brimstone Hill",      basse: "$60",  frigate: "$65",  sep: "—"    },
            { label: "Caribelle Batik",     basse: "$40",  frigate: "$55",  sep: "—"    },
            { label: "Cockleshell / Majors Bay", basse: "$28", frigate: "$25", sep: "$25" },
            { label: "South Friars Bay",    basse: "$25",  frigate: "$15",  sep: "$30"  },
          ].map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-4 px-4 py-3 border-b border-border/50 last:border-b-0"
              style={{ background: i % 2 === 0 ? "transparent" : "var(--muted)/20" }}
            >
              <div className="text-sm font-medium col-span-1 pr-2 leading-tight">{row.label}</div>
              <div className="text-sm text-center font-semibold">{row.basse}</div>
              <div className="text-sm text-center font-semibold">{row.frigate}</div>
              <div className="text-sm text-center font-semibold">{row.sep}</div>
            </div>
          ))}
        </div>

        {/* Salty tip */}
        <div className="rounded-2xl p-4 text-sm" style={{ background: "#1AAFCC11", borderLeft: "3px solid #1AAFCC" }}>
          <p className="font-bold mb-1 text-xs uppercase tracking-wide" style={{ color: "#1AAFCC" }}>🧂 The Salt</p>
          <p className="text-foreground/85 leading-relaxed">
            Shared taxis run from the cruise port to the beaches — around <strong>US$10–25 per person</strong>. Way cheaper than hiring a private cab. Look for the taxi stand at The Circus in Basseterre or near the ferry terminal.
          </p>
        </div>

        {/* Taxi stands */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#1AAFCC" }}>Taxi Stands</h2>
          <div className="space-y-3 text-sm text-foreground/85">
            <div className="flex items-start gap-2">
              <span>📍</span>
              <div>
                <strong>The Circus</strong> — main taxi stand in central Basseterre
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>📍</span>
              <div>
                <strong>Ferry Terminal / Port Zante</strong> — taxis line up at arrivals
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>📍</span>
              <div>
                <strong>Frigate Bay Stand</strong> — near the main road on the Strip
                <a href="tel:8694654317" className="block mt-0.5 font-semibold" style={{ color: "#1AAFCC" }}>
                  <Phone className="w-3.5 h-3.5 inline mr-1" />869-465-4317
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>🍹</span>
              <span>Any bar or restaurant will call one for you — just ask</span>
            </div>
          </div>
        </div>

        {/* H Buses */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
          <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#1AAFCC" }}>🚌 H Buses (Public Minibuses)</h2>
          <div className="space-y-2 text-sm text-foreground/85">
            <p>St Kitts has a public minibus system — locally called <strong>H buses</strong> because of their H licence plates.</p>
            <ul className="space-y-1.5 mt-2">
              <li>🛣️ Run through <strong>Basseterre and throughout the island</strong></li>
              <li>🚫 Do <strong>not</strong> go to Frigate Bay or the Southeast Peninsula</li>
              <li>💵 <strong>Cash only</strong> — exact change is appreciated</li>
              <li>✋ <strong>Hail them on the side of the road</strong> — no fixed stops</li>
              <li>🎵 Expect music. Loud music.</li>
            </ul>
          </div>
        </div>

        {/* Late night reminder */}
        <div className="rounded-2xl p-4 text-sm border border-border bg-card">
          <p className="text-foreground/85 leading-relaxed">
            🌙 <strong>Heading out past 11:30pm?</strong> Arrange your taxi or ride in advance — they get harder to find late night, especially after a big event at Shiggidy Shack or a Carnival night. Don't get stranded.
          </p>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
