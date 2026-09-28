import { useState } from "react";
import { usePageContent, Rich, times as parseTimes } from "@/lib/pageContent";
import { ArrowLeftRight, Anchor, Car, Phone, Clock, Waves } from "lucide-react";

type Direction = "skn_to_nevis" | "nevis_to_skn";
type TabType = "passenger" | "car" | "watertaxi";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const c = usePageContent("ferry");
  const pf = c.passenger_ferry;
  const todaySchedule = (pf.schedule as any)[selectedDay] || { to_nevis: "", to_st_kitts: "" };
  const times = parseTimes(direction === "skn_to_nevis" ? todaySchedule.to_nevis : todaySchedule.to_st_kitts);
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
          {c.subtitle}
        </p>
      </div>

      {/* Seasonal disclaimer */}
      <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 shrink-0">
        <p className="text-xs text-amber-800 dark:text-amber-400">
          {c.disclaimer}
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
              {direction === "skn_to_nevis" ? pf.route_to_nevis : pf.route_to_st_kitts}
              <span className="ml-auto">{pf.crossing_time}</span>
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
                {pf.fares_and_tips.map((line, i) => <p key={i}><Rich text={line} /></p>)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-card-border bg-card">
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                🧂 <strong>Salty says:</strong> <Rich text={pf.salty_says} />
              </p>
            </div>
            <div className="h-2" />
          </div>
        )}

        {/* CAR FERRY */}
        {tab === "car" && (
          <div className="p-4 space-y-4">
            <p className="text-xs text-muted-foreground px-1">
              <Rich text={c.car_ferry.intro} />
            </p>

            {c.car_ferry.ferries.map(ferry => (
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
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ferry.crossing_time}</span>
                    <span>💰 {ferry.price}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">SKN → Nevis</p>
                      <div className="space-y-1">
                        {parseTimes(ferry.to_nevis).map(t => (
                          <div key={t} className="text-sm font-semibold text-foreground px-2 py-1 rounded-lg bg-muted/40">{t}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Nevis → SKN</p>
                      <div className="space-y-1">
                        {parseTimes(ferry.to_st_kitts).map(t => (
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
                🧂 <strong>Salty says:</strong> <Rich text={c.car_ferry.salty_says} />
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
                {c.water_taxi.title}
              </h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                {c.water_taxi.info.map((line, i) => <p key={i}><Rich text={line} /></p>)}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">Operators</h3>
              {c.water_taxi.operators.map(op => (
                <a
                  key={op.phone}
                  href={`tel:${op.phone}`}
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border bg-card text-sm font-semibold transition-colors hover:bg-muted/40"
                  style={{ borderColor: "#1AAFCC44", color: "#1AAFCC" }}
                >
                  <span className="text-foreground">{op.name}</span>
                  <span className="text-xs font-normal" style={{ color: "#1AAFCC" }}>{op.phone}</span>
                </a>
              ))}
            </div>

            <div className="p-3.5 rounded-xl border border-card-border bg-card">
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                🧂 <strong>Salty says:</strong> <Rich text={c.water_taxi.salty_says} />
              </p>
            </div>

            <div className="px-3 py-2.5 rounded-lg text-xs" style={{ background: "#1AAFCC11", borderLeft: "3px solid #1AAFCC" }}>
              <p className="text-muted-foreground">{c.water_taxi.disclaimer}</p>
            </div>
            <div className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
}
