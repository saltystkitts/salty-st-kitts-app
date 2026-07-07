export default function TaxiPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <h1 className="font-extrabold text-lg text-white">Taxi Fares</h1>
        <p className="text-sm mt-0.5" style={{ color: "#1AAFCC" }}>
          Fixed rates. Yellow plates. No Uber. Just flag one down.
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
            <li>🚫 No Uber, no Lyft, no rideshare of any kind</li>
            <li>✅ Always confirm the fare <strong>before</strong> you get in</li>
          </ul>
        </div>

        {/* Fare table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-bold text-base">Sample Fares</h2>
            <p className="text-xs text-muted-foreground mt-0.5">USD · 1–4 passengers · representative only — confirm with driver</p>
          </div>

          {/* Column headers */}
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

        {/* Shared taxis tip */}
        <div
          className="rounded-2xl p-4 text-sm"
          style={{ background: "#1AAFCC11", borderLeft: "3px solid #1AAFCC" }}
        >
          <p className="font-bold mb-1 text-xs uppercase tracking-wide" style={{ color: "#1AAFCC" }}>🧂 The Salt</p>
          <p className="text-foreground/85 leading-relaxed">
            Shared taxis run from the cruise port to the beaches — around <strong>US$10–25 per person</strong>. 
            Way cheaper than hiring a private cab. Look for the taxi rank at The Circus in Basseterre or near the ferry terminal.
          </p>
        </div>

        {/* Where to find taxis */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
          <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#1AAFCC" }}>Where to Find One</h2>
          <div className="space-y-2 text-sm text-foreground/85">
            <div className="flex items-start gap-2">
              <span>📍</span>
              <span><strong>The Circus</strong> — taxi rank in central Basseterre</span>
            </div>
            <div className="flex items-start gap-2">
              <span>📍</span>
              <span><strong>Ferry Terminal</strong> — taxis line up at arrivals</span>
            </div>
            <div className="flex items-start gap-2">
              <span>📍</span>
              <span><strong>Frigate Bay Strip</strong> — rank near the main road</span>
            </div>
            <div className="flex items-start gap-2">
              <span>🍹</span>
              <span>Any bar or restaurant will call one for you — just ask</span>
            </div>
          </div>
        </div>

        {/* Water taxi to Nevis */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-bold text-base">Water Taxi to Nevis</h2>
            <p className="text-xs text-muted-foreground mt-0.5">From Cockleshell Bay — 10–15 min crossing</p>
          </div>
          <div className="px-4 py-3 space-y-3">
            <p className="text-sm text-foreground/85">Around <strong>US$20 one way</strong>. Operates most days from Cockleshell Bay (Southeast Peninsula). Quickest way across if you're already on that side of the island.</p>
            {[
              { name: "Paradise Sun Charters", tel: "869-667-6203" },
              { name: "Blue Waves Water Taxi",  tel: "869-662-1762" },
              { name: "Water Sports Islander",  tel: "869-662-7081" },
            ].map((op) => (
              <a
                key={op.tel}
                href={`tel:${op.tel}`}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl border text-sm font-semibold transition-colors hover:bg-muted/40"
                style={{ borderColor: "#1AAFCC44", color: "#1AAFCC" }}
              >
                <span>{op.name}</span>
                <span className="text-xs font-normal text-muted-foreground">{op.tel}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
