import { useState } from "react";
import { ArrowLeftRight, Anchor, Car, Phone, Clock, Waves } from "lucide-react";

type Direction = "skn_to_nevis" | "nevis_to_skn";
type TabType = "passenger" | "car" | "watertaxi";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PASSENGER_SCHEDULE: Record<string, { skn_to_nevis: string[]; nevis_to_skn: string[] }> = {
  Monday:    { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
  Tuesday:   { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
  Wednesday: { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
  Thursday:  { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
  Friday:    { skn_to_nevis: ["6:00 AM","7:00 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM","9:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM","8:00 PM"] },
  Saturday:  { skn_to_nevis: ["6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:45 AM","9:30 AM","10:15 AM","10:30 AM","12:00 PM","1:00 PM","2:00 PM","2:15 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","7:00 PM","8:00 PM"], nevis_to_skn: ["7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:30 AM","11:00 AM","12:00 PM","1:00 PM","2:15 PM","3:00 PM","4:00 PM","4:30 PM","5:00 PM","6:00 PM","8:00 PM","9:00 PM"] },
  Sunday:    { skn_to_nevis: ["8:00 AM","9:00 AM","10:00 AM","12:00 PM","2:00 PM","4:00 PM","6:00 PM","7:00 PM"], nevis_to_skn: ["7:00 AM","8:00 AM","9:00 AM","11:00 AM","12:00 PM","1:00 PM","3:00 PM","4:30 PM","5:00 PM","6:00 PM"] },
};

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
  },
];

const WATER_TAXIS = [
  { name: "Islander Water Taxi", tel: "869-662-7081" },
  { name: "Blu Waves Water Taxi", tel: "869-662-1762" },
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
  const [tab, setTab] = useState<TabType>("passenger");
  const [direction, setDirection] = useState<Direction>("skn_to_nevis");
  const [selectedDay, setSelectedDay] = useState(getTodayName());

  const todaySchedule = PASSENGER_SCHEDULE[selectedDay];
  const times = direction === "skn_to_nevis" ? todaySchedule.skn_to_nevis : todaySchedule.nevis_to_skn;
  const nextIdx = times.findIndex(t => isNextDeparture(t));

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Hero header */}
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <div className="flex items-center gap-2 mb-1">
          <Anchor className="w-5 h-5" style={{ color: "#1AAFCC" }} />
          <h1 className="font-extrabold text-lg text-white" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            By Water
          </h1>
        </div>
        <p className="text-sm" style={{ color: "#1AAFCC" }}>
          Ferries & Water Taxis · St Kitts ↔ Nevis
        </p>
      </div>

      {/* Seasonal disclaimer */}
      <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 shrink-0">
        <p className="text-xs text-amber-800 dark:text-amber-400">
          ⚠️ All schedules and services are subject to change, especially during off-season. Always confirm before heading out.
        </p>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-2 px-4 py-3 border-b border-border bg-muted/30 shrink-0">
        <button
          onClick={() => setTab("passenger")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold border transition-all ${tab === "passenger" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
        >
          <Anchor className="w-4 h-4" /> Ferry
        </button>
        <button
          onClick={() => setTab("car")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold border transition-all ${tab === "car" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
        >
          <Car className="w-4 h-4" /> Car Ferry
        </button>
        <button
          onClick={() => setTab("watertaxi")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold border transition-all ${tab === "watertaxi" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
        >
          <Waves className="w-4 h-4" /> Water Taxi
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* PASSENGER FERRY */}
        {tab === "passenger" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 bg-card border border-card-border rounded-xl p-1">
              <button
                onClick={() => setDirection("skn_to_nevis")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${direction === "skn_to_nevis" ? "text-white" : "text-muted-foreground"}`}
                style={direction === "skn_to_nevis" ? { background: "#1AAFCC" } : {}}
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
              >
                Nevis → SKN
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
              <Anchor className="w-3.5 h-3.5" />
              {direction === "skn_to_nevis" ? "Basseterre (Port Zante) → Charlestown, Nevis" : "Charlestown, Nevis → Basseterre (Port Zante)"}
              <span className="ml-auto">~25–45 min</span>
            </div>

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

            <div className="bg-card border border-card-border rounded-xl p-4 space-y-2.5">
              <h3 className="font-bold text-sm text-foreground">Fares & Tips</h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p>🎟 <strong className="text-foreground">EC$25–30</strong> per person (~US$9–11)</p>
                <p>📍 Departs from <strong className="text-foreground">Port Zante</strong>, Basseterre</p>
                <p>⏰ Arrive <strong className="text-foreground">15–20 min early</strong> — ferries fill up</p>
                <p>💵 <strong className="text-foreground">Cash only</strong> at the dock</p>
                <p>🌊 Schedules subject to weather — always confirm day-of</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-card-border bg-card">
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                🧂 <strong>Salty says:</strong> The passenger ferry is the most affordable way to cross. Sit outside if conditions are calm — the channel views are worth it. Water taxis are faster and more flexible if you need to move on your own schedule.
              </p>
            </div>
            <div className="h-2" />
          </div>
        )}

        {/* CAR FERRY */}
        {tab === "car" && (
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
                🧂 <strong>Salty says:</strong> If you have a rental car and want to drive around Nevis, Sea Bridge from Majors Bay is your move. It's a 15-minute crossing and you roll straight off onto the Nevis road. Bring cash.
              </p>
            </div>
            <div className="h-2" />
          </div>
        )}

        {/* WATER TAXI */}
        {tab === "watertaxi" && (
          <div className="p-4 space-y-4">
            <div className="bg-card border border-card-border rounded-xl p-4 space-y-2.5">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Waves className="w-4 h-4" style={{ color: "#1AAFCC" }} />
                Water Taxis — Reggae Beach
              </h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p>🕐 Depart approximately <strong className="text-foreground">every 15 minutes</strong> from Reggae Beach</p>
                <p>⚡ <strong className="text-foreground">Faster and more flexible</strong> than the passenger ferry</p>
                <p>📍 Default departure: <strong className="text-foreground">Reggae Beach, Southeast Peninsula</strong></p>
                <p>🌙 Available for <strong className="text-foreground">late returns</strong> — arrange in advance</p>
                <p>📞 Can be hired from <strong className="text-foreground">other locations</strong> — just call ahead</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">Operators</h3>
              {WATER_TAXIS.map(op => (
                <a
                  key={op.tel}
                  href={`tel:${op.tel}`}
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border bg-card text-sm font-semibold transition-colors hover:bg-muted/40"
                  style={{ borderColor: "#1AAFCC44", color: "#1AAFCC" }}
                >
                  <span className="text-foreground">{op.name}</span>
                  <span className="text-xs font-normal" style={{ color: "#1AAFCC" }}>{op.tel}</span>
                </a>
              ))}
            </div>

            <div className="p-3.5 rounded-xl border border-card-border bg-card">
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                🧂 <strong>Salty says:</strong> Water taxis are the move if you're already on the Southeast Peninsula or want a faster, more direct crossing. They run roughly every 15 minutes from Reggae Beach and can be arranged for late nights — just coordinate directly with the operator before you go.
              </p>
            </div>

            <div className="px-3 py-2.5 rounded-lg text-xs" style={{ background: "#1AAFCC11", borderLeft: "3px solid #1AAFCC" }}>
              <p className="text-muted-foreground">⚠️ All schedules and availability are subject to change, especially during off-season. Confirm directly with operators before heading out.</p>
            </div>
            <div className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
}
