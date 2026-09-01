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

  // ── SNORKELING CHARTER ───────────────────────────────────────────────────
  {
    id: 6,
    category: "water",
    emoji: "🤿",
    name: "Snorkel Charters",
    description: "Crystal clear Caribbean water, coral reefs, and a sunken shipwreck at White House Bay you can snorkel right from the beach. For guided charters, Orange Cat Charters runs excellent snorkel trips around the island.",
    tip: "White House Bay is accessible on your own — no guide needed. For a fuller experience with multiple snorkel spots, book a charter. Bring your own mask if you have one.",
    duration: "Half day to full day",
    price: "Varies by operator",
    contact: null,
    contactLabel: null,
    link: "https://www.orangecatcharters.com",
    linkLabel: "orangecatcharters.com",
  },

  // ── WATERSPORTS ───────────────────────────────────────────────────────────
  {
    id: 7,
    category: "water",
    emoji: "🏄",
    name: "Watersports",
    description: "Paddleboards, kayaks, banana boats, jet skis, and more. The calm Caribbean-side water at Frigate Bay is ideal for anything that floats. Dave's Watersports is the main operator at Frigate Bay. A couple of additional options are also available down at Cockleshell Bay on the Southeast Peninsula.",
    tip: "Walk down to the Frigate Bay Strip and you'll find Dave's right on the beach. Cockleshell options are more casual — just show up and ask around.",
    duration: "Flexible",
    price: "Varies by activity",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── CATAMARAN ─────────────────────────────────────────────────────────────
  {
    id: 8,
    category: "water",
    emoji: "⛵",
    name: "Catamaran Day Trip",
    description: "Full-day sailing around the island and over to Nevis — snorkeling stops, open bar, lunch on board, and the kind of afternoon that makes you miss your flight on purpose. Multiple operators run regular departures.",
    tip: "Book in advance during peak season. Most trips include an open bar — pace yourself, the sun does the rest of the work.",
    duration: "Full day",
    price: "From US$110",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── DEEP SEA FISHING ──────────────────────────────────────────────────────
  {
    id: 9,
    category: "water",
    emoji: "🎣",
    name: "Deep Sea Fishing",
    description: "Mahi-mahi, wahoo, kingfish, and blue marlin in the waters around St Kitts. Half and full-day charters with local captains who know the spots. Catch and release standard on billfish.",
    tip: "For the most current charter options and availability, contact Salty St Kitts directly — we keep an updated list of trusted operators.",
    duration: "Half day to full day",
    price: "Contact for pricing",
    contact: null,
    contactLabel: null,
    link: "https://saltystkitts.com",
    linkLabel: "saltystkitts.com",
  },

  // ── SEA TURTLE WATCH ──────────────────────────────────────────────────────
  {
    id: 10,
    category: "water",
    emoji: "🐢",
    name: "Sea Turtle Watch",
    description: "Leatherback and hawksbill turtles nest on St Kitts beaches from March to September. The St Kitts Sea Turtle Monitoring Network runs guided Sunday morning ecotours where you can watch turtles being brought in for data collection by their in-water research team. One of the genuinely special things you can do on this island.",
    tip: "Book in advance — spaces are limited and they fill quickly. All proceeds support conservation and local guides. Check their website for current tour dates.",
    duration: "2–3 hours",
    price: "See website",
    contact: null,
    contactLabel: null,
    link: "https://www.stkittsturtles.org",
    linkLabel: "stkittsturtles.org",
  },

  // ── ATV ───────────────────────────────────────────────────────────────────
  {
    id: 11,
    category: "land",
    emoji: "🏍️",
    name: "ATV Tours",
    description: "Multiple ATV tour companies operate on the island, taking you through dirt roads, agricultural tracks, and the occasional main road with some good scenery along the way. A fun way to see parts of the island you'd otherwise miss.",
    tip: "Just a heads up — if you're a true off-road person expecting serious terrain, this probably isn't it. You'll mostly be on dirt roads and sections of the main road. It's a good time, just go in with the right expectations.",
    duration: "2–3 hours",
    price: "Varies by operator",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── SELF-DRIVE ISLAND TOUR ────────────────────────────────────────────────
  {
    id: 13,
    category: "land",
    emoji: "🚗",
    name: "Self-Drive Island Tour",
    description: "Rent a Jeep, grab snorkel gear, and do the Ring Road at your own pace. Cover the whole island in a day — plantation ruins, volcano views, black sand beaches, fishing villages, the Southeast Peninsula, and everything in between. Salty St Kitts puts together a package that includes the Jeep, snorkel gear, and a cooler of drinks so you can just go.",
    tip: "Drive on the left. Roads are narrow in places, especially heading north. The Ring Road is paved all the way around — no off-road required unless you want it.",
    duration: "Full day",
    price: "From US$150",
    contact: null,
    contactLabel: null,
    link: "https://saltystkitts.com",
    linkLabel: "saltystkitts.com",
  },

  // ── GOLF ──────────────────────────────────────────────────────────────────
  {
    id: 16,
    category: "land",
    emoji: "⛳",
    name: "Golf — Royal St Kitts Golf Club",
    description: "An 18-hole championship course right in Frigate Bay with two holes on the Caribbean and three overlooking the Atlantic. 6,859 yards of links-style terrain, driving range, club rentals, and a clubhouse bar with a view that will make you forget you just lost four balls in the ocean.",
    tip: "Book tee times in advance during peak season. Carts are included. The back nine is where the real views are.",
    duration: "4–5 hours",
    price: "From US$110",
    contact: "869-465-8339",
    contactLabel: "Royal St Kitts Golf",
    link: "https://www.royalstkittsgolfclub.com",
    linkLabel: "royalstkittsgolfclub.com",
  },

  // ── VOLLEYBALL ────────────────────────────────────────────────────────────
  {
    id: 18,
    category: "land",
    emoji: "🏐",
    name: "Volleyball — Frigate Bay Strip",
    description: "Pickup beach volleyball on South Frigate Bay. Nets are set up on the sand and games happen organically — locals, expats, and tourists all mixed in. Especially lively on weekends and Wednesday nights around Shiggidy Shack.",
    tip: "Show up, ask to play, done. No booking, no fees, no pressure.",
    duration: "Flexible",
    price: "Free",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── OLD ROAD RUM TOUR ─────────────────────────────────────────────────────
  {
    id: 19,
    category: "culture",
    emoji: "🥃",
    name: "Old Road Rum Distillery Tour",
    description: "The oldest surviving rum distillery on St. Kitts, preserving the island's centuries-old sugar and rum heritage. Take a tour, learn how the rum is made, and discover the history behind an industry that helped shape St Kitts. Around here, rum isn't just a drink — it's part of Kittitian history.",
    tip: "Pairs perfectly with a stop at Wingfield Estate and Caribelle Batik next door for a proper Old Road afternoon.",
    duration: "1–2 hours",
    price: "See on arrival",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── BATIK WORKSHOP ────────────────────────────────────────────────────────
  {
    id: 15,
    category: "culture",
    emoji: "🎨",
    name: "Batik Workshop — Caribelle",
    description: "Caribelle Batik has been running hands-on workshops at Romney Manor for decades. You learn the wax-resist technique, make your own fabric, and leave with something genuinely made on the island. The gardens and the 400-year-old saman tree alone are worth the visit.",
    tip: "Minimum 6 persons for the behind-the-scenes tour and hands-on workshop. Walk-ins welcome for the gardens and shop. Book ahead for groups.",
    duration: "1–2 hours",
    price: "See on arrival",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },

  // ── CARNIVAL / J'OUVERT ───────────────────────────────────────────────────
  {
    id: 20,
    category: "culture",
    emoji: "🎭",
    name: "Carnival & J'ouvert",
    description: "Carnival (Sugar Mas) runs mid-December through January 2nd and is the most culturally significant celebration on the island. J'ouvert is the street party on Boxing Day (December 26th), starting at 4am — no special costume needed, just show up and get into it. For those who want to 'play mas' (join a costumed troupe), check Instagram for the different troops — it's not cheap but it's unforgettable.",
    tip: "For all Carnival events, take an 'Uber' or taxi in — parking is a nightmare and you'll want both hands free. Check Instagram for troupe options to play mas. J'ouvert starts at 4am and that's not a suggestion — show up.",
    duration: "Varies",
    price: "J'ouvert free / Playing mas varies",
    contact: null,
    contactLabel: null,
    link: null,
    linkLabel: null,
  },
];

const CATEGORIES = [
  { key: "all",     label: "All" },
  { key: "water",   label: "🌊 Water" },
  { key: "land",    label: "🌿 Land" },
  { key: "culture", label: "🎨 Culture" },
];

export default function ActionTingsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? ACTIVITIES : ACTIVITIES.filter(a => a.category === filter);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <h1 className="font-extrabold text-lg text-white" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
          Action Tings
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#1AAFCC" }}>
          Everything worth doing on this island.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 shrink-0">
        <p className="text-xs text-amber-800 dark:text-amber-400">
          ⚠️ All activities, prices, and availability are subject to change — especially during off-season. Always confirm directly with operators before heading out.
        </p>
      </div>

      {/* No paid listings notice */}
      <div className="px-4 py-2 border-b border-border bg-muted/20 shrink-0">
        <p className="text-xs text-muted-foreground italic">
          🧂 No one pays to be listed here. Everything is based on personal recommendations and real experience.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 px-4 py-3 border-b border-border bg-muted/30 shrink-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === cat.key
                ? "text-white border-transparent"
                : "bg-card border-border text-muted-foreground"
            }`}
            style={filter === cat.key ? { background: "#1AAFCC", borderColor: "#1AAFCC" } : {}}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {filtered.map(activity => (
          <div key={activity.id} className="bg-card border border-card-border rounded-2xl overflow-hidden">
            {/* Activity header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3">
              <span className="text-2xl">{activity.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-foreground leading-tight">{activity.name}</h3>
                <div className="flex gap-3 mt-0.5 text-xs text-muted-foreground">
                  {activity.duration && <span>⏱ {activity.duration}</span>}
                  {activity.price && <span>💰 {activity.price}</span>}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 py-3 space-y-3">
              <p className="text-sm text-foreground/90 leading-relaxed">{activity.description}</p>

              {activity.tip && (
                <div className="p-3 rounded-xl text-xs leading-relaxed" style={{ background: "#1AAFCC11", borderLeft: "3px solid #1AAFCC" }}>
                  <span className="font-bold" style={{ color: "#1AAFCC" }}>💡 Tip: </span>
                  <span className="text-muted-foreground">{activity.tip}</span>
                </div>
              )}

              {/* Contact / link */}
              <div className="flex flex-wrap gap-2">
                {activity.contact && (
                  <a
                    href={`tel:${activity.contact}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors hover:bg-muted/40"
                    style={{ borderColor: "#1AAFCC44", color: "#1AAFCC" }}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {activity.contactLabel ?? activity.contact}
                  </a>
                )}
                {activity.link && (
                  <a
                    href={activity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors hover:bg-muted/40"
                    style={{ borderColor: "#1AAFCC44", color: "#1AAFCC" }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {activity.linkLabel ?? activity.link}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="h-4" />
      </div>
    </div>
  );
}
