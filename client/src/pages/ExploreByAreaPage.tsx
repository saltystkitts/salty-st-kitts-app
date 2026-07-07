import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, MapPin, X } from "lucide-react";

interface Stop {
  id: number;
  name: string;
  category: string;
  description: string;
  area: string;
  tip?: string;
  lat: number;
  lng: number;
  featured?: boolean;
  closedNote?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  historical:    "History & Culture",
  nature:        "The Bush",
  food_nightlife:"Lime & Dine",
  beach:         "Beaches",
  scenic_drive:  "Drives",
  loot:          "Loot",
};

const CATEGORY_EMOJI: Record<string, string> = {
  historical:    "🏛️",
  nature:        "🌿",
  food_nightlife:"🍹",
  beach:         "🏖️",
  scenic_drive:  "🚗",
  loot:          "🛍️",
};

// Zone definitions — area strings that belong to each zone
const ZONES = [
  {
    id: "basseterre",
    name: "Basseterre",
    subtitle: "The capital — history, food & hustle",
    emoji: "🏙️",
    areaMatches: [
      "Basseterre",
      "Central Basseterre",
      "Port Zante, Basseterre",
      "Ferry Terminal, Basseterre",
      "Needsmust, Basseterre",
      "Fortlands, Basseterre",
      "Palm Court Gardens area, Basseterre",
      "Boyd's",
      "Bird Rock, Basseterre",
    ],
  },
  {
    id: "frigate",
    name: "Frigate Bay & The Strip",
    subtitle: "Beach bars, eats & the good vibes zone",
    emoji: "🍹",
    areaMatches: [
      "Frigate Bay",
      "The Strip, Frigate Bay",
      "Timothy Hill, Frigate Bay",
      "South Friars Bay (relocating)",
      "South Friars Bay",
      "Brumaire",
    ],
  },
  {
    id: "sep",
    name: "Southeast Peninsula",
    subtitle: "Hidden bays, wild beaches & the end of the road",
    emoji: "🏖️",
    areaMatches: [
      "Southeast Peninsula",
      "Cockleshell Beach, Southeast Peninsula",
    ],
  },
  {
    id: "eastside",
    name: "Eastside",
    subtitle: "Off the tourist map — real island life",
    emoji: "🌾",
    areaMatches: [
      "Eastside",
    ],
  },
  {
    id: "northeast",
    name: "The Northeast",
    subtitle: "Villages, rainforest & the windward side",
    emoji: "🌿",
    areaMatches: [
      "North Atlantic Coast",
      "Central St Kitts",
    ],
  },
  {
    id: "dieppe",
    name: "Dieppe Bay & The North",
    subtitle: "Black sand, fresh fish & the forgotten coast",
    emoji: "🌊",
    areaMatches: [
      "Dieppe Bay",
      "Dieppe Bay Town",
      "Dieppe Bay Beach",
    ],
  },
  {
    id: "sandypoint",
    name: "Sandy Point & The Northwest",
    subtitle: "Brimstone Hill, rum history & the sunset coast",
    emoji: "🏰",
    areaMatches: [
      "Sandy Point",
      "Brimstone Hill, Sandy Point",
    ],
  },
  {
    id: "oldroad",
    name: "Old Road & Middle Island",
    subtitle: "The first settlement — sugar ruins & deep roots",
    emoji: "⚓",
    areaMatches: [
      "Old Road",
      "Old Road Town",
      "Old Road Town, Romney Manor",
      "Middle Island",
      "Caribbean Coast",
      "Island-wide",
    ],
  },
];

// Vibe definitions
const VIBES = [
  {
    id: "history",
    name: "History Buff",
    emoji: "🏛️",
    subtitle: "Forts, ruins & stories that shaped the island",
    categories: ["historical"],
  },
  {
    id: "eat",
    name: "Here to Eat",
    emoji: "🍽️",
    subtitle: "Local spots, beach bars & proper meals",
    categories: ["food_nightlife"],
  },
  {
    id: "beach",
    name: "Beach Mode",
    emoji: "🏖️",
    subtitle: "Sand, water & nothing to do",
    categories: ["beach"],
  },
  {
    id: "active",
    name: "Get Active",
    emoji: "🥾",
    subtitle: "Hikes, trails & the real outdoors",
    categories: ["nature"],
  },
  {
    id: "drive",
    name: "Road Tripper",
    emoji: "🚗",
    subtitle: "Scenic drives & island loops",
    categories: ["scenic_drive"],
  },
  {
    id: "shop",
    name: "Loot Hunter",
    emoji: "🛍️",
    subtitle: "Local crafts, markets & take-home goods",
    categories: ["loot"],
  },
];

function StopCard({ stop, onClose }: { stop: Stop; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 w-full sm:max-w-lg bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "85vh" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="flex-1 pr-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#1AAFCC22", color: "#1AAFCC" }}>
                {CATEGORY_EMOJI[stop.category]} {CATEGORY_LABELS[stop.category]}
              </span>
              {stop.featured && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#E8614A22", color: "#E8614A" }}>
                  ⭐ Featured
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold leading-tight">{stop.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 inline" /> {stop.area}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors shrink-0">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-8" style={{ maxHeight: "60vh" }}>
          {stop.closedNote && (
            <div className="mb-3 p-3 rounded-xl text-sm font-medium" style={{ background: "#E8614A18", color: "#E8614A", border: "1px solid #E8614A44" }}>
              🚧 {stop.closedNote.replace(/See: https?:\/\/\S+/, "").trim()}
            </div>
          )}
          <p className="text-sm leading-relaxed text-foreground/90 mb-4">{stop.description}</p>
          {stop.tip && (
            <div className="p-3 rounded-xl text-sm" style={{ background: "#1AAFCC11", borderLeft: "3px solid #1AAFCC" }}>
              <span className="font-semibold text-xs uppercase tracking-wide" style={{ color: "#1AAFCC" }}>The Salt</span>
              <p className="mt-1 text-foreground/80">{stop.tip}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ZoneCard({
  zone,
  stops,
  isOpen,
  onToggle,
  onSelectStop,
}: {
  zone: typeof ZONES[0];
  stops: Stop[];
  isOpen: boolean;
  onToggle: () => void;
  onSelectStop: (s: Stop) => void;
}) {
  if (stops.length === 0) return null;
  return (
    <div className="rounded-2xl overflow-hidden border border-border mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-muted/40"
      >
        <span className="text-2xl">{zone.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-base leading-tight">{zone.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5 truncate">{zone.subtitle}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#1AAFCC22", color: "#1AAFCC" }}>
            {stops.length} spots
          </span>
          {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border">
          {stops.map((stop) => (
            <button
              key={stop.id}
              onClick={() => onSelectStop(stop)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors border-b border-border/50 last:border-b-0"
            >
              <span className="text-base shrink-0">{CATEGORY_EMOJI[stop.category]}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{stop.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {CATEGORY_LABELS[stop.category]}
                  {stop.closedNote ? " · 🚧 Closed / Relocating" : ""}
                </div>
              </div>
              <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function VibeCard({
  vibe,
  stops,
  isOpen,
  onToggle,
  onSelectStop,
}: {
  vibe: typeof VIBES[0];
  stops: Stop[];
  isOpen: boolean;
  onToggle: () => void;
  onSelectStop: (s: Stop) => void;
}) {
  if (stops.length === 0) return null;
  return (
    <div className="rounded-2xl overflow-hidden border border-border mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-muted/40"
      >
        <span className="text-2xl">{vibe.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-base leading-tight">{vibe.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5 truncate">{vibe.subtitle}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#E8614A22", color: "#E8614A" }}>
            {stops.length} spots
          </span>
          {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border">
          {stops.map((stop) => (
            <button
              key={stop.id}
              onClick={() => onSelectStop(stop)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors border-b border-border/50 last:border-b-0"
            >
              <span className="text-base shrink-0">{CATEGORY_EMOJI[stop.category]}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{stop.name}</div>
                <div className="text-xs text-muted-foreground truncate">{stop.area}</div>
              </div>
              <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExploreByAreaPage() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [mode, setMode] = useState<"area" | "vibe">("area");
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  useEffect(() => {
    fetch("/api/stops")
      .then((r) => r.json())
      .then(setStops)
      .catch(console.error);
  }, []);

  function stopsForZone(zone: typeof ZONES[0]): Stop[] {
    return stops.filter((s) =>
      zone.areaMatches.some((a) => s.area === a || s.area.includes(a) || a.includes(s.area))
    ).sort((a, b) => a.name.localeCompare(b.name));
  }

  function stopsForVibe(vibe: typeof VIBES[0]): Stop[] {
    return stops
      .filter((s) => vibe.categories.includes(s.category))
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
  }

  function toggleOpen(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <h1 className="text-xl font-bold">Explore</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Every spot on the island, your way</p>

        {/* Toggle */}
        <div
          className="mt-3 flex rounded-xl p-0.5"
          style={{ background: "var(--muted)" }}
        >
          <button
            onClick={() => { setMode("area"); setOpenId(null); }}
            className="flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: mode === "area" ? "#1AAFCC" : "transparent",
              color: mode === "area" ? "#fff" : "var(--muted-foreground)",
            }}
          >
            By Area
          </button>
          <button
            onClick={() => { setMode("vibe"); setOpenId(null); }}
            className="flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: mode === "vibe" ? "#1AAFCC" : "transparent",
              color: mode === "vibe" ? "#fff" : "var(--muted-foreground)",
            }}
          >
            By Vibe
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {mode === "area" &&
          ZONES.map((zone) => {
            const zoneStops = stopsForZone(zone);
            return (
              <ZoneCard
                key={zone.id}
                zone={zone}
                stops={zoneStops}
                isOpen={openId === zone.id}
                onToggle={() => toggleOpen(zone.id)}
                onSelectStop={setSelectedStop}
              />
            );
          })}

        {mode === "vibe" &&
          VIBES.map((vibe) => {
            const vibeStops = stopsForVibe(vibe);
            return (
              <VibeCard
                key={vibe.id}
                vibe={vibe}
                stops={vibeStops}
                isOpen={openId === vibe.id}
                onToggle={() => toggleOpen(vibe.id)}
                onSelectStop={setSelectedStop}
              />
            );
          })}
      </div>

      {/* Stop detail sheet */}
      {selectedStop && (
        <StopCard stop={selectedStop} onClose={() => setSelectedStop(null)} />
      )}
    </div>
  );
}
