import { useState } from "react";
import { ArrowLeftRight, Anchor, Car, Phone, Clock } from "lucide-react";

type Direction = "skn_to_nevis" | "nevis_to_skn";
type FerryType = "passenger" | "car";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// PASSENGER FERRIES — Basseterre (Port Zante) ↔ Charlestown
// Sources: nevispages.com, thelabourspokesman.com official PDF schedule
const PASSENGER_SCHEDULE: Record<string, { skn_to_nevis: string[]; nevis_to_skn: string[] }> = {
  Monday:    { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
  Tuesday:   { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
  Wednesday: { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
  Thursday:  { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
  Friday:    { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM","9:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM","8:00 PM"] },
  Saturday:  { skn_to_nevis: ["6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","2:15 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM","8:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:15 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM","8:00 PM","9:00 PM"] },
  Sunday:    { skn_to_nevis: ["8:00 AM","9:00 AM","10:00 AM","12:00 PM","2:00 PM","4:00 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","8:00 AM","9:00 AM","11:00 AM","12:00 PM","1:00 PM","3:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
};

// CAR / VEHICLE FERRIES
// Sea Bridge: Majors Bay (SKN) ↔ Cades Bay (Nevis) — 15–25 min crossing, EC$25 passengers, 662-7002
// iConnect: Majors Bay (SKN) ↔ Long Point (Nevis) — 40 min, 869-466-3339
const CAR_FERRIES = [
  {
    name: "Sea Bridge",
    route: "Majors Bay → Cades Bay, Nevis",
    routeBack: "Cades Bay, Nevis → Majors Bay",
    duration: "~15–25 min",
    phone: "869-662-7002",
    price: "EC$25 per person · vehicles extra",
    note: "Drive-on, drive-off. Arrive 30 min early. Runs every 2 hrs daily.",
    skn_to_nevis: ["8:00 AM","10:00 AM","12:00 PM","2:00 PM","4:00 PM","7:00 PM"],
    nevis_to_skn: ["7:00 AM","9:00 AM","11:00 AM","1:00 PM","3:00 PM","6:00 PM"],
  },
  {
    name: "iConnect",
    route: "Majors Bay → Long Point, Nevis",
    routeBack: "Long Point, Nevis → Majors Bay",
    duration: "~40 min",
    phone: "869-466-3339",
    price: "See iconnectskn.com",
    note: "Mon–Sat: 3 trips. Sunday: 2 trips. Good for large groups and vehicles.",
    skn_to_nevis: ["9:00 AM","12:30 PM","5:30 PM"],
    nevis_to_skn: ["7:30 AM","11:00 AM","4:00 PM"],
    sunday_skn_to_nevis: ["9:00 AM","5:30 PM"],
    sunday_nevis_to_skn: ["7:30 AM","4:00 PM"],
  },
];

function getTodayName(): string {
  return DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
}

function isNextDeparture(time: string): boolean {
  const now = new Date();
  const [timePart, period] = time.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);
  let h = hours;
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  const departure = new Date();
  departure.setHours(h, minutes, 0, 0);
  return departure > now;
}

export default function FerryPage() {
  const [ferryType, setFerryType] = useState<FerryType>("passenger");
  const [direction, setDirection] = useState<Direction>("skn_to_nevis");
  const [selectedDay, setSelectedDay] = useState(getTodayName());

  const todaySchedule = PASSENGER_SCHEDULE[selectedDay];
  const times = direction === "skn_to_nevis" ? todaySchedule.skn_to_nevis : todaySchedule.nevis_to_skn;

  // Find next departure index
  const nextIdx = times.findIndex(t => isNextDeparture(t));

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Hero header */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <div className="flex items-center gap-2 mb-1">
          <Anchor className="w-5 h-5" style={{ color: "#1AAFCC" }} />
          <h1 className="font-extrabold text-lg text-white" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            Ferry Schedule
          </h1>
        </div>
        <p className="text-sm" style={{ color: "#1AAFCC" }}>
          St Kitts ↔ Nevis · 25–45 min crossing
        </p>
      </div>

      {/* Type toggle: Passenger / Car ferry */}
      <div className="flex gap-2 px-4 py-3 border-b border-border bg-muted/30 shrink-0">
        <button
          onClick={() => setFerryType("passenger")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold border transition-all ${ferryType === "passenger" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
          data-testid="ferry-type-passenger"
        >
          <Anchor className="w-4 h-4" /> Passenger
        </button>
        <button
          onClick={() => setFerryType("car")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold border transition-all ${ferryType === "car" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
          data-testid="ferry-type-car"
        >
          <Car className="w-4 h-4" /> Car Ferry
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {ferryType === "passenger" ? (
          <div className="p-4 space-y-4">
            {/* Direction toggle */}
            <div className="flex items-center gap-2 bg-card border border-card-border rounded-xl p-1">
              <button
                onClick={() => setDirection("skn_to_nevis")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${direction === "skn_to_nevis" ? "text-white" : "text-muted-foreground"}`}
                style={direction === "skn_to_nevis" ? { background: "#1AAFCC" } : {}}
                data-testid="direction-skn-nevis"
              >
                SKN → Nevis
              </button>
              <button onClick={() => setDirection(d => d === "skn_to_nevis" ? "nevis_to_skn" : "skn_to_nevis")} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground">
                <ArrowLeftRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDirection("nevis_to_skn")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${direction === "nevis_to_skn" ? "text-white" : "text-muted-foreground"}`}
                style={direction === "nevis_to_skn" ? { background: "#1AAFCC" } : {}}
                data-testid="direction-nevis-skn"
              >
                Nevis → SKN
              </button>
            </div>

            {/* Route info */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
              <Anchor className="w-3.5 h-3.5" />
              {direction === "skn_to_nevis"
                ? "Basseterre (Port Zante) → Charlestown, Nevis"
                : "Charlestown, Nevis → Basseterre (Port Zante)"}
              <span className="ml-auto">~25–45 min</span>
            </div>

            {/* Day selector */}
            <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {DAYS.map(day => {
                const isToday = day === getTodayName();
                const isSelected = day === selectedDay;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      isSelected ? "bg-primary text-primary-foreground border-primary"
                      : isToday ? "border-primary/40 text-primary bg-accent"
                      : "bg-card text-muted-foreground border-card-border"
                    }`}
                  >
                    {day.slice(0, 3)}
                    {isToday && !isSelected && <span className="ml-1">·</span>}
                  </button>
                );
              })}
            </div>

            {/* Times grid */}
            <div>
              {selectedDay === getTodayName() && nextIdx >= 0 && (
                <div className="mb-3 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: "hsl(192 78% 90%)", color: "hsl(192 60% 22%)" }}>
                  ⏱ Next departure: {times[nextIdx]}
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                {times.map((time, i) => {
                  const isNext = selectedDay === getTodayName() && i === nextIdx;
                  const isPast = selectedDay === getTodayName() && nextIdx >= 0 && i < nextIdx;
                  return (
                    <div
                      key={`${time}-${i}`}
                      className={`flex items-center justify-center py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        isNext ? "text-white border-transparent shadow-md"
                        : isPast ? "bg-muted/40 text-muted-foreground/50 border-transparent"
                        : "bg-card text-foreground border-card-border"
                      }`}
                      style={isNext ? { background: "#1AAFCC" } : {}}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing & tips */}
            <div className="bg-card border border-card-border rounded-xl p-4 space-y-2.5">
              <h3 className="font-bold text-sm text-foreground">Fares & Tips</h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p>🎟 <strong className="text-foreground">EC$25–30</strong> per person (~US$9–11)</p>
                <p>📍 Departs from <strong className="text-foreground">Port Zante</strong>, Basseterre</p>
                <p>⏰ Arrive <strong className="text-foreground">15–20 min early</strong> — ferries fill up</p>
                <p>💵 <strong className="text-foreground">Cash only</strong> at the dock</p>
                <p>🌊 Schedules subject to weather — always double-check day-of</p>
              </div>
            </div>

            {/* Salty note */}
            <div className="p-3.5 rounded-xl border border-card-border bg-card">
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                🧂 <strong>Salty says:</strong> The crossing takes 25–45 minutes depending on sea state. Sit outside if conditions are calm. If someone's handing out seasickness bags before you board — take one. No shame.
              </p>
            </div>
            <div className="h-2" />
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <p className="text-xs text-muted-foreground px-1">
              For vehicles or if you're coming from the Southeast Peninsula — car ferries dock at <strong className="text-foreground">Majors Bay</strong>, not Basseterre.
            </p>

            {CAR_FERRIES.map(ferry => (
              <div key={ferry.name} className="bg-card border border-card-border rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-border" style={{ background: "#1C3B5A" }}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white">{ferry.name}</h3>
                    <a href={`tel:${ferry.phone}`} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#1AAFCC" }}>
                      <Phone className="w-3.5 h-3.5" />
                      {ferry.phone}
                    </a>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#1AAFCC" }}>{ferry.route}</p>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ferry.duration}</span>
                    <span>💰 {ferry.price}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">SKN → Nevis</p>
                      <div className="space-y-1">
                        {ferry.skn_to_nevis.map(t => (
                          <div key={t} className="text-sm font-semibold text-foreground px-2 py-1 rounded-lg bg-muted/40">{t}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Nevis → SKN</p>
                      <div className="space-y-1">
                        {ferry.nevis_to_skn.map(t => (
                          <div key={t} className="text-sm font-semibold text-foreground px-2 py-1 rounded-lg bg-muted/40">{t}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground italic border-t border-border pt-3">💡 {ferry.note}</p>
                </div>
              </div>
            ))}

            <div className="p-3.5 rounded-xl border border-card-border bg-card">
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                🧂 <strong>Salty says:</strong> If you have a rental car and want to drive around Nevis, Sea Bridge from Majors Bay is your move. It's a 15-minute crossing and you roll straight off onto the Nevis road. Don't forget to bring cash.
              </p>
            </div>
            <div className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
}
