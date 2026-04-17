import { useState } from "react";
import { Zap, Phone } from "lucide-react";

const ACTIVITIES = [
  {
    id: 1,
    category: "water",
    emoji: "🤿",
    name: "Snorkeling & Diving",
    description: "Some of the best diving in the Eastern Caribbean is right here. Shipwrecks, walls, and reef systems with visibility that'll make you question everything you've settled for before.",
    tip: "The MV Talata wreck off Basseterre is a must. Ken's Dive Centre out of Frigate Bay is the most trusted operator on the island.",
    duration: "Half day",
    price: "From US$60",
    contact: null,
  },
  {
    id: 2,
    category: "water",
    emoji: "⛵",
    name: "Catamaran Day Trip",
    description: "Full-day sailing trips around the island and over to Nevis — snorkeling stops, open bar, lunch on board, and the kind of afternoon that makes you miss your flight on purpose.",
    tip: "Blue Water Safaris and Leeward Island Charters both run excellent full-day trips. Book 48hrs ahead in high season.",
    duration: "Full day",
    price: "From US$95",
    contact: null,
  },
  {
    id: 3,
    category: "water",
    emoji: "🏄",
    name: "Watersports at Frigate Bay",
    description: "Jet skis, paddleboards, kayaks, and banana boats — all available on South Frigate Bay. Calm Caribbean-side water makes it ideal for beginners and anyone who just wants to mess around.",
    tip: "Rates are negotiable outside of peak cruise ship days. Show up in the afternoon for shorter queues.",
    duration: "1–3 hours",
    price: "From US$20",
    contact: null,
  },
  {
    id: 4,
    category: "land",
    emoji: "🌋",
    name: "Mount Liamuiga Hike",
    description: "The island's dormant volcano. 3,792 feet. A crater the size of a small town at the top. Views across six islands on a clear day. Not optional if you have functioning legs.",
    tip: "Hire a local guide from Saint Pauls village — the final crater section is steep and unmarked. Start before 7am to beat the heat.",
    duration: "4–6 hours",
    price: "Guide from EC$100",
    contact: null,
  },
  {
    id: 5,
    category: "land",
    emoji: "🏍️",
    name: "ATV & Off-Road Tours",
    description: "Tear through sugar cane fields, rainforest tracks, and old plantation roads on an ATV. The island looks completely different from the back of one. Guaranteed to be the most fun you have on four wheels.",
    tip: "Kantours and Kris Tours both run ATV excursions through the agricultural belt. Closed-toe shoes are mandatory — not a suggestion.",
    duration: "2–3 hours",
    price: "From US$75",
    contact: null,
  },
  {
    id: 6,
    category: "land",
    emoji: "🦅",
    name: "Zip Line & Canopy Tour",
    description: "Sky Safari runs zip lines through the rainforest canopy on the slopes of Mount Liamuiga with views straight down to the Caribbean coast. Five lines, aerial bridges, and a platform 75 feet up in a mahogany tree.",
    tip: "Weight limit applies (250 lbs). Book online in advance — it fills up fast on cruise ship days.",
    duration: "2–3 hours",
    price: "From US$79",
    contact: null,
  },
  {
    id: 7,
    category: "land",
    emoji: "🐴",
    name: "Horseback Riding",
    description: "Trinity Stables on the Atlantic coast runs beach and trail rides through some of the most remote and beautiful parts of the island. Sunset rides on the black sand beaches of the north coast are properly memorable.",
    tip: "The sunset beach ride is the one to book. Call ahead — small group sizes mean spots go fast.",
    duration: "1.5–2 hours",
    price: "From US$65",
    contact: null,
  },
  {
    id: 8,
    category: "water",
    emoji: "🐢",
    name: "Sea Turtle Watch",
    description: "Leatherback and hawksbill turtles nest on St Kitts beaches between March and September. The St Kitts Sea Turtle Monitoring Network runs guided night watches on nesting beaches — one of the more extraordinary things you can witness in the Caribbean.",
    tip: "Contact the Sea Turtle Network directly to join a watch. Red light only, no flash photography, absolute silence — follow instructions exactly.",
    duration: "Evening",
    price: "Donation based",
    contact: null,
  },
  {
    id: 9,
    category: "culture",
    emoji: "🍺",
    name: "Carib Brewery Tour",
    description: "St Kitts's most beloved beer is brewed right here on the island. The Carib Brewery tour takes you through the full production process and ends where it should — with cold samples fresh off the line.",
    tip: "Tours run Monday–Friday. Call ahead to confirm times as they vary seasonally.",
    duration: "1.5 hours",
    price: "From EC$30",
    contact: null,
  },
  {
    id: 10,
    category: "culture",
    emoji: "🎨",
    name: "Batik Workshop at Romney Manor",
    description: "Caribelle Batik has been running hands-on workshops at Romney Manor for decades. You learn the wax-resist technique, make your own piece of fabric, and leave with something genuinely handmade on the island. Tourists usually love it more than they expected to.",
    tip: "Workshops run most mornings — call the studio to confirm before turning up.",
    duration: "1.5–2 hours",
    price: "From US$35",
    contact: null,
  },
  {
    id: 11,
    category: "water",
    emoji: "🎣",
    name: "Deep Sea Fishing",
    description: "The waters around St Kitts hold mahi-mahi, wahoo, kingfish, and blue marlin. Half and full-day charters run out of Basseterre harbor on serious boats with local captains who know exactly where the fish are.",
    tip: "Catch and release is standard unless you want to eat it — in which case several restaurants will cook your catch for you. Serious local knowledge.",
    duration: "Half or full day",
    price: "From US$450 (charter)",
    contact: null,
  },
  {
    id: 12,
    category: "land",
    emoji: "🚗",
    name: "Self-Drive Island Tour",
    description: "Rent a Jeep and do the Ring Road counter-clockwise. Cover the entire island in a day — plantation ruins, volcano views, black sand beaches, hidden fishing villages, and the Southeast Peninsula drive. The guide you didn't know you wanted is right here in your pocket.",
    tip: "We drive on the LEFT. International licence required. Salty St Kitts rents Jeeps — saltystkitts.com or call 869-767-9021.",
    duration: "Full day",
    price: "From US$65/day",
    contact: "869-767-9021",
  },
];

const CATEGORY_FILTERS = [
  { id: "all",     label: "All" },
  { id: "water",   label: "🌊 Water" },
  { id: "land",    label: "🌿 Land" },
  { id: "culture", label: "🎨 Culture" },
];

export default function GoOffPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? ACTIVITIES : ACTIVITIES.filter(a => a.category === filter);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5" style={{ color: "#1AAFCC" }} />
          <h1 className="font-extrabold text-lg text-white" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            Go Off
          </h1>
        </div>
        <p className="text-sm" style={{ color: "#1AAFCC" }}>
          You could lie on the same beach all week. But where's the fun in that?
        </p>
      </div>

      {/* Category filter */}
      <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto shrink-0 no-scrollbar border-b border-border">
        {CATEGORY_FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors"
            style={{
              background: filter === f.id ? "#1AAFCC" : "transparent",
              color: filter === f.id ? "white" : "var(--muted-foreground)",
              borderColor: filter === f.id ? "#1AAFCC" : "var(--border)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Activity cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {filtered.map(activity => (
            <div key={activity.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Card header */}
              <div className="px-4 pt-4 pb-3 border-b border-border">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activity.emoji}</span>
                    <div>
                      <h2 className="font-bold text-base text-foreground leading-tight">{activity.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">⏱ {activity.duration}</span>
                        <span className="text-xs font-semibold" style={{ color: "#1AAFCC" }}>{activity.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-4 py-3 space-y-3">
                <p className="text-sm text-foreground leading-relaxed">{activity.description}</p>

                {/* Tip */}
                <div className="flex gap-3 p-3 rounded-xl" style={{ background: "hsl(192 78% 95%)" }}>
                  <span className="text-sm shrink-0">💡</span>
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(192 60% 22%)" }}>
                    {activity.tip}
                  </p>
                </div>

                {/* Call CTA if contact exists */}
                {activity.contact && (
                  <a
                    href={`tel:${activity.contact}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ background: "#1AAFCC" }}
                  >
                    <Phone className="w-4 h-4" />
                    Book Now — {activity.contact}
                  </a>
                )}
              </div>
            </div>
          ))}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
