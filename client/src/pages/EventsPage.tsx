import { useState } from "react";
import { Calendar, Music, Drum, Flag, Star } from "lucide-react";

type EventCategory = "all" | "holiday" | "carnival" | "festival";

interface IslandEvent {
  id: number;
  name: string;
  date: string;
  endDate?: string;
  category: EventCategory;
  description: string;
  tip: string;
  emoji: string;
  highlight?: boolean;
}

const EVENTS_2026: IslandEvent[] = [
  // PUBLIC HOLIDAYS
  { id: 1, name: "New Year's Day", date: "2026-01-01", category: "holiday", emoji: "🎆", description: "The island is quiet, hungover, and beautiful. Streets are empty, beaches are yours.", tip: "Best morning of the year to drive the Southeast Peninsula — zero traffic, zero people." },
  { id: 2, name: "Carnival Day (Last Lap)", date: "2026-01-02", category: "carnival", emoji: "🎭", description: "The final day of Sugar Mas — Last Lap is the farewell parade where revelers give everything they have left. Pure soca chaos on the streets of Basseterre.", tip: "Position yourself at The Circus for the best view of the parade passing through.", highlight: true },
  { id: 3, name: "Good Friday", date: "2026-04-03", category: "holiday", emoji: "✝️", description: "A solemn public holiday. Most businesses close, beaches are quiet, and the island slows way down.", tip: "Perfect day for a peaceful hike or a deserted beach — most tourists don't leave the resort." },
  { id: 4, name: "Easter Monday", date: "2026-04-06", category: "holiday", emoji: "🐣", description: "A relaxed public holiday. Families head to the beach and kite-flying is a traditional Easter pastime across the Caribbean.", tip: "Head to the Atlantic side of Frigate Bay to watch the kite-flying — it's a genuinely lovely local tradition." },
  { id: 5, name: "Labour Day", date: "2026-05-04", category: "holiday", emoji: "🛠️", description: "Public holiday honoring the working people of St Kitts. Government and most businesses are closed.", tip: "Beach bars stay open. Enough said." },
  { id: 6, name: "Whit Monday", date: "2026-05-25", category: "holiday", emoji: "⛪", description: "Christian public holiday, 50 days after Easter. A relaxed long weekend on the island.", tip: "Sunday evening before Whit Monday often has good live music at local spots — ask around." },
  { id: 7, name: "Emancipation Day", date: "2026-08-03", category: "holiday", emoji: "✊", description: "Commemorating the emancipation of enslaved people across the British Caribbean in 1834. A deeply significant day marked with cultural events and reflection.", tip: "The National Museum in Basseterre runs special programming around Emancipation — worth a visit." },
  { id: 8, name: "National Heroes Day", date: "2026-09-16", category: "holiday", emoji: "🦸", description: "Honoring the national heroes of St Kitts and Nevis — those who shaped the island's path to independence.", tip: "The ceremony at Independence Square is short but dignified — a good window into local pride." },
  { id: 9, name: "Independence Day", date: "2026-09-19", category: "holiday", emoji: "🇰🇳", description: "St Kitts and Nevis gained independence from Britain on September 19, 1983. Celebrated with parades, flag-raising ceremonies, and a lot of national pride.", tip: "The parade through Basseterre is colorful and genuinely festive — unlike anything you'd see on an ordinary day.", highlight: true },
  { id: 10, name: "Christmas Day", date: "2026-12-25", category: "holiday", emoji: "🎄", description: "Christmas in the Caribbean hits different. The island is alive with music, family gatherings, and the buildup to Carnival season.", tip: "The Basseterre waterfront is beautifully lit and festive on Christmas Eve — a great evening stroll." },
  { id: 11, name: "Boxing Day (Jouvert!)", date: "2026-12-26", category: "carnival", emoji: "🥁", description: "Boxing Day on St Kitts means one thing: J'ouvert. Starting at 4 AM, the streets fill with revelers covered in paint, mud, and powder dancing to soca at full volume. It's electric, chaotic, and unlike anything else in the Caribbean.", tip: "Wear clothes you're prepared to throw away. Show up by 4 AM. Bring cash only. Leave your phone in a waterproof bag.", highlight: true },
  // MUSIC FESTIVAL
  { id: 12, name: "St Kitts Music Festival — Night 1", date: "2026-06-25", category: "festival", emoji: "🎵", description: "Night one of the 28th annual St Kitts Music Festival at Warner Park Stadium. Three nights of world-class performers including Steel Pulse and Fantasia. The biggest event on the island's cultural calendar.", tip: "Gates open at 6 PM — arrive early for the best standing spots near the stage. Bring cash for vendors.", highlight: true },
  { id: 13, name: "St Kitts Music Festival — Night 2", date: "2026-06-26", category: "festival", emoji: "🎶", description: "Night two at Warner Park. The middle night typically has the strongest lineup — international headliners at their full power.", tip: "The food vendors outside the stadium are often better (and cheaper) than inside — eat before you go in." },
  { id: 14, name: "St Kitts Music Festival — Night 3", date: "2026-06-27", category: "festival", emoji: "🎸", description: "The final night of Music Fest — traditionally the biggest crowd and the most energy. The island stays awake all night.", tip: "Night 3 is also the best night to catch after-parties at the beach bars. The Strip at Frigate Bay goes until sunrise.", highlight: true },
  // SUGAR MAS CARNIVAL
  { id: 15, name: "Sugar Mas Carnival Opens", date: "2026-12-13", category: "carnival", emoji: "🎪", description: "Sugar Mas — St Kitts's legendary Christmas Carnival — kicks off with opening ceremonies, cultural shows, and the first wave of fetes. The island shifts gear into full party mode for three weeks.", tip: "The early carnival events are often the best value and least crowded. The big shows come later but the vibe peaks early.", highlight: true },
  { id: 16, name: "Carnival Grand Parade — Day 1", date: "2027-01-01", category: "carnival", emoji: "🎊", description: "New Year's Day brings the first Grand Parade — masqueraders in full costume flooding the streets of Basseterre in an explosion of colour, soca, and steel pan. The culmination of Sugar Mas.", tip: "Get to Independence Square by 10 AM for the best spot. The parade builds through the afternoon — pace yourself on the rum." },
  { id: 17, name: "Carnival Last Lap — Day 2", date: "2027-01-02", category: "carnival", emoji: "🎭", description: "The emotional farewell of Sugar Mas. Last Lap is the second parade day where the energy is bittersweet — everyone giving absolutely everything because it's over until next December.", tip: "Last Lap hits hardest in the late afternoon when the sun drops and the soca gets serious. Don't leave early." },
];

const CAT_FILTERS: { value: EventCategory | "all"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "all", label: "All Events", icon: Calendar },
  { value: "holiday", label: "Public Holidays", icon: Flag },
  { value: "festival", label: "Music Fest", icon: Music },
  { value: "carnival", label: "Carnival & J'ouvert", icon: Drum },
];

const CAT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  holiday: { bg: "hsl(213 52% 94%)", text: "hsl(213 52% 22%)", dot: "#1C3B5A" },
  festival: { bg: "hsl(9 77% 94%)", text: "hsl(9 60% 30%)", dot: "#E8614A" },
  carnival: { bg: "hsl(192 78% 90%)", text: "hsl(192 60% 22%)", dot: "#1AAFCC" },
};

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
}

export default function EventsPage() {
  const [filter, setFilter] = useState<EventCategory | "all">("all");

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const filtered = EVENTS_2026
    .filter(e => filter === "all" || e.category === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcoming = filtered.filter(e => new Date(e.date) >= now);
  const past = filtered.filter(e => new Date(e.date) < now);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Filter pills */}
      <div className="flex gap-1.5 px-3 py-2.5 border-b border-border overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
        {CAT_FILTERS.map(cat => {
          const Icon = cat.icon;
          const active = filter === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              data-testid={`events-filter-${cat.value}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border flex-shrink-0
                ${active ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-card-border hover:text-foreground hover:bg-secondary"}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {upcoming.length === 0 && past.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-4xl mb-3">📅</div>
              <p className="font-medium">Nothing here. Somehow.</p>
            </div>
          )}

          {upcoming.length > 0 && (
            <>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground pb-1">Upcoming</div>
              {upcoming.map(event => {
                const colors = CAT_COLORS[event.category];
                const days = daysUntil(event.date);
                return (
                  <div
                    key={event.id}
                    data-testid={`event-card-${event.id}`}
                    className="bg-card border border-card-border rounded-xl p-4 space-y-2.5"
                    style={event.highlight ? { borderLeft: `3px solid ${colors.dot}` } : {}}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <span className="text-2xl">{event.emoji}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-sm text-foreground leading-tight">{event.name}</h3>
                            {event.highlight && <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{formatDate(event.date)}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        {days === 0 ? (
                          <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: colors.bg, color: colors.text }}>Today</span>
                        ) : days === 1 ? (
                          <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: colors.bg, color: colors.text }}>Tomorrow</span>
                        ) : (
                          <span className="text-xs font-semibold text-muted-foreground">{days}d away</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-foreground leading-relaxed">{event.description}</p>

                    <div className="flex gap-2 p-2.5 rounded-lg" style={{ background: colors.bg }}>
                      <span className="text-sm flex-shrink-0">💡</span>
                      <p className="text-xs leading-relaxed" style={{ color: colors.text }}>{event.tip}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {past.length > 0 && (
            <>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-2 pb-1">Past Events</div>
              {past.map(event => {
                const colors = CAT_COLORS[event.category];
                return (
                  <div key={event.id} className="bg-card border border-card-border rounded-xl p-4 opacity-50">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{event.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">{event.name}</h3>
                        <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                      </div>
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>Past</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
