import { useState } from "react";
import { Phone, ExternalLink } from "lucide-react";

const ACTIVITIES = [
  // ── ZIP LINE ──────────────────────────────────────────────────────────────
  {
    id: 1,
    category: "land",
    emoji: "🦅",
    name: "Zip Line — Sky Safari",
    description: "Five lines through the rainforest canopy at Wingfield Estate, 250 feet above the valley floor at speeds up to 70 km/h. The last line is a dual race line over a natural river pool. Views of Brimstone Hill, Mount Liamuiga, and the Caribbean the whole way.",
    tip: "Ages 7–85. Weight limit 60–275 lbs — strictly enforced. Closed-toe shoes are non-negotiable. Book ahead on cruise ship days — max 20 per group and it fills fast.",
    duration: "2–3 hours",
    price: "From US$99",
    contact: "869-465-4347",
    contactLabel: "Sky Safari",
    link: "http://www.skysafaristkitts.com/",
    linkLabel: "skysafaristkitts.com",
  },

  // ── HIKING ────────────────────────────────────────────────────────────────
  {
    id: 2,
    category: "land",
    emoji: "🌋",
    name: "Mount Liamuiga Hike",
    description: "The dormant volcano that defines the island's skyline. 3,792 feet. A crater at the top locals call the Giants Salad Bowl. On a clear day you can see six neighboring islands from the rim. Dense rainforest, giant ferns, and vervet monkeys the whole way up.",
    tip: "Hire a guide from Saint Pauls village — the final crater section is steep, unmarked, and unforgiving. Start before 7am. Bring more water than you think you need.",
    duration: "4–6 hours",
    price: "Guide from EC$100",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
  {
    id: 3,
    category: "land",
    emoji: "🌿",
    name: "Wingfield Rainforest Trail",
    description: "The trail network at Wingfield Estate takes you through old-growth mahogany, wild orchids, and ancient Kalinago petroglyphs on the edge of the rainforest — all wrapped around the ruins of the oldest sugar estate in the Eastern Caribbean. Multiple difficulty levels.",
    tip: "Best combined with a zip line session or a stop at Romney Manor next door. Get a guide — the petroglyphs are easy to walk right past.",
    duration: "1–3 hours",
    price: "Estate entry fee applies",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
  {
    id: 4,
    category: "land",
    emoji: "🥾",
    name: "Southeast Peninsula Trails",
    description: "Dry scrub ridgelines with views of both the Caribbean and Atlantic simultaneously. Hidden coves, salt ponds, vervet monkey territory, and stretches of coastline that almost nobody reaches. The peninsula trail system is as wild as it gets on this island.",
    tip: "Come with a guide and plenty of water. Sun protection is not optional — there's zero shade on the ridgeline sections.",
    duration: "1.5–3 hours",
    price: "Guide recommended",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── JET SKI ───────────────────────────────────────────────────────────────
  {
    id: 5,
    category: "water",
    emoji: "🚤",
    name: "Jet Ski",
    description: "Hit the Caribbean on a jet ski out of Cockleshell Bay on the Southeast Peninsula. Open water, zero traffic, and the kind of speed that makes your face hurt from smiling. St Kitts Watersports has the most established operation on the island.",
    tip: "Book ahead — limited machines. Cockleshell Bay location is the one to use.",
    duration: "30 min – 1 hour",
    price: "From US$60",
    contact: "869-762-3543",
    contactLabel: "St Kitts Watersports",
    link: "https://www.stkittswatersports.com",
    linkLabel: "stkittswatersports.com",
  },

  // ── SNORKEL ───────────────────────────────────────────────────────────────
  {
    id: 6,
    category: "water",
    emoji: "🤿",
    name: "Snorkeling",
    description: "Clear Caribbean water, coral reefs, and a sunken shipwreck just offshore. White House Bay on the Southeast Peninsula has a wreck you can snorkel right from the beach. For guided trips, Blue Water Safaris and Leeward Island Charters both run excellent snorkel tours with gear included.",
    tip: "White House Bay is the self-guided spot — pack your own mask and fins and walk right in. For the MV Talata wreck, book a guided dive or snorkel trip out of Basseterre.",
    duration: "1 hour – half day",
    price: "From US$60 (guided)",
    contact: null,
    contactLabel: null,
    link: "https://leewardislandscharters.com/st-kitts-tours/sail-and-snorkel/",
    linkLabel: "Leeward Island Charters",
  },

  // ── WATERSPORTS ───────────────────────────────────────────────────────────
  {
    id: 7,
    category: "water",
    emoji: "🏄",
    name: "Watersports — Frigate Bay",
    description: "Paddleboards, kayaks, banana boats, and more on South Frigate Bay. The calm Caribbean-side water makes it ideal for anything that floats. Multiple operators set up on the beach — walk down and take your pick.",
    tip: "Prices are negotiable outside cruise ship days. Afternoon is quieter than morning. Cash preferred by most operators.",
    duration: "1–3 hours",
    price: "From US$20",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
  {
    id: 8,
    category: "water",
    emoji: "⛵",
    name: "Catamaran Day Trip",
    description: "Full-day sailing around the island and over to Nevis — snorkeling stops, open bar, lunch on board, and the kind of afternoon that makes you miss your flight on purpose. Blue Water Safaris and Leeward Island Charters both run excellent trips.",
    tip: "Book 48 hours ahead in season. The Nevis crossing is worth doing for the views alone.",
    duration: "Full day",
    price: "From US$95",
    contact: null,
    contactLabel: null,
    link: "https://leewardislandscharters.com",
    linkLabel: "Leeward Island Charters",
  },
  {
    id: 9,
    category: "water",
    emoji: "🎣",
    name: "Deep Sea Fishing",
    description: "Mahi-mahi, wahoo, kingfish, and blue marlin in the waters around St Kitts. Half and full-day charters out of Basseterre on proper boats with local captains who know the spots. Catch and release standard — or take it to a restaurant that'll cook it for you.",
    tip: "Book a charter directly at Basseterre harbor. Avoid the tour aggregator markup — the captains at the dock deal directly.",
    duration: "Half or full day",
    price: "From US$450 (charter)",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
  {
    id: 10,
    category: "water",
    emoji: "🐢",
    name: "Sea Turtle Watch",
    description: "Leatherback and hawksbill turtles nest on St Kitts beaches from March to September. The St Kitts Sea Turtle Monitoring Network runs guided night watches on active nesting beaches. One of the genuinely extraordinary things to witness in the Caribbean.",
    tip: "Red lights only, no flash photography, absolute silence — follow every instruction exactly. Contact the Sea Turtle Network directly to join a watch.",
    duration: "Evening",
    price: "Donation based",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── LAND / OTHER ─────────────────────────────────────────────────────────
  {
    id: 11,
    category: "land",
    emoji: "🏍️",
    name: "ATV & Off-Road Tours",
    description: "Through sugar cane fields, rainforest tracks, and old plantation roads. The island looks completely different from the back of an ATV. Kantours runs solid excursions through the agricultural belt — guides know the land.",
    tip: "Closed-toe shoes are mandatory, not optional. Two hours minimum to do it properly.",
    duration: "2–3 hours",
    price: "From US$75",
    contact: null,
    contactLabel: null,
    link: "https://www.kantours.com",
    linkLabel: "kantours.com",
  },
  {
    id: 12,
    category: "land",
    emoji: "🐴",
    name: "Horseback Riding",
    description: "Trinity Stables runs beach and trail rides through the most remote parts of the island's north Atlantic coast. Sunset rides on the black sand beaches up north are properly memorable. Small group sizes, real horses, real terrain.",
    tip: "The sunset beach ride is the one to book. Call ahead — limited spots.",
    duration: "1.5–2 hours",
    price: "From US$65",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
  {
    id: 13,
    category: "land",
    emoji: "🚗",
    name: "Self-Drive Island Tour",
    description: "Rent a Jeep and do the Ring Road. Cover the whole island in a day — plantation ruins, volcano views, black sand beaches, fishing villages, and the Southeast Peninsula. The guide you didn't know you needed is right here in your pocket.",
    tip: "Left side of the road. International licence required. Salty St Kitts rents Jeeps — call or check the site.",
    duration: "Full day",
    price: "From US$65/day",
    contact: "869-767-9021",
    contactLabel: "Salty St Kitts",
    link: "https://saltystkitts.com",
    linkLabel: "saltystkitts.com",
  },

  // ── FRIGATE BAY STRIP SPORTS ─────────────────────────────────────────────
  {
    id: 16,
    category: "land",
    emoji: "⛳",
    name: "Golf — Royal St Kitts Golf Club",
    description: "An 18-hole championship course right in Frigate Bay with two holes on the Caribbean and three overlooking the Atlantic. 6,859 yards of links-style terrain, driving range, club rentals, and lessons. Open to all — you don't need to be staying anywhere. The state took full ownership in 2026 so it's genuinely public now.",
    tip: "Tee times vary — call ahead. Club rentals available. Greens fees US$150–180 for 18 holes. Open daily from 7am.",
    duration: "Half to full day",
    price: "US$150–180 (18 holes)",
    contact: "869-466-2700",
    contactLabel: "Royal St Kitts Golf Club",
    link: "http://www.royalstkittsgolfclub.com",
    linkLabel: "royalstkittsgolfclub.com",
  },
  {
    id: 17,
    category: "land",
    emoji: "🏓",
    name: "Pickleball — Frigate Bay",
    description: "Pickup pickleball on the Frigate Bay strip. Courts are at 858 Frigate Bay Road — casual, open games, mixed locals and visitors. Fastest-growing sport on the island and already a regular scene down there.",
    tip: "Show up, sign up, play. Bring your own paddle if you have one — rentals aren't always available. Ask at the strip for current game times.",
    duration: "1–2 hours",
    price: "Free / low cost",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
  {
    id: 18,
    category: "land",
    emoji: "🏐",
    name: "Volleyball — Frigate Bay Strip",
    description: "Pickup beach volleyball on South Frigate Bay. Nets are set up on the sand and games happen organically — locals, expats, and tourists all mixed in. Especially lively on weekends and Wednesday nights when the strip is busy.",
    tip: "Just show up and ask to join. Wednesday and Saturday evenings are when it gets competitive. No formal schedule — it's the strip, not a tournament.",
    duration: "1–3 hours",
    price: "Free",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── CULTURE ───────────────────────────────────────────────────────────────
  {
    id: 14,
    category: "culture",
    emoji: "🍺",
    name: "Carib Brewery Tour",
    description: "The island's beer, brewed right here. The tour takes you through the full production process and ends exactly where it should — with cold samples fresh off the line.",
    tip: "Tours run Monday–Friday. Call ahead to confirm times as they vary.",
    duration: "1.5 hours",
    price: "From EC$30",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
  {
    id: 15,
    category: "culture",
    emoji: "🎨",
    name: "Batik Workshop — Caribelle",
    description: "Caribelle Batik has been running hands-on workshops at Romney Manor for decades. You learn the wax-resist technique, make your own fabric, and leave with something genuinely made on the island. Tourists usually love it more than they expected to.",
    tip: "Workshops run most mornings — call ahead to confirm before making the drive out.",
    duration: "1.5–2 hours",
    price: "From US$35",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
];

const CATEGORY_FILTERS = [
  { id: "all",     label: "All" },
  { id: "water",   label: "🌊 Water" },
  { id: "land",    label: "🌿 Land" },
  { id: "culture", label: "🎨 Culture" },
];

export default function ActionTingsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.category === filter);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <h1 className="font-extrabold text-lg text-white">Action Tings</h1>
        <p className="text-sm mt-0.5" style={{ color: "#1AAFCC" }}>
          You could lie on the same beach all week. But here we are.
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
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{activity.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-base text-foreground leading-tight">{activity.name}</h2>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-muted-foreground">⏱ {activity.duration}</span>
                      <span className="text-xs font-semibold" style={{ color: "#1AAFCC" }}>{activity.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-4 py-3 space-y-3">
                <p className="text-sm text-foreground leading-relaxed">{activity.description}</p>

                {/* Tip */}
                <div
                  className="flex gap-2 p-3 rounded-xl"
                  style={{ background: "#1AAFCC11", borderLeft: "3px solid #1AAFCC" }}
                >
                  <span className="text-sm shrink-0">🧂</span>
                  <p className="text-xs leading-relaxed text-foreground/80">{activity.tip}</p>
                </div>

                {/* CTAs */}
                <div className="flex gap-2 flex-wrap">
                  {activity.contact && (
                    <a
                      href={`tel:${activity.contact}`}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
                      style={{ background: "#1AAFCC" }}
                    >
                      <Phone className="w-3 h-3" />
                      {activity.contactLabel ?? activity.contact}
                    </a>
                  )}
                  {activity.link && (
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border"
                      style={{ color: "#1AAFCC", borderColor: "#1AAFCC44" }}
                    >
                      <ExternalLink className="w-3 h-3" />
                      {activity.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
