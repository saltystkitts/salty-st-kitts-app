import { Map, Zap, Waves, MoreHorizontal, CalendarDays, Compass, Car, Lock } from "lucide-react";
import { useState } from "react";
import { Ship, CloudSun } from "lucide-react";

export type AppTab = "map" | "actiontings" | "salt" | "weather" | "ferry" | "holidays" | "explore-area" | "taxi";

const FREE_TABS: AppTab[] = ["map", "salt", "actiontings"];

const MAIN_TABS: { id: AppTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "map",         label: "Explore",      icon: Map },
  { id: "actiontings", label: "Action Tings", icon: Zap },
  { id: "salt",        label: "The Salt",     icon: Waves },
];

const MORE_TABS: { id: AppTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "explore-area", label: "By Area",  icon: Compass },
  { id: "taxi",         label: "Taxis",    icon: Car },
  { id: "holidays",     label: "Holidays", icon: CalendarDays },
  { id: "weather",      label: "Weather",  icon: CloudSun },
  { id: "ferry",        label: "By Water", icon: Ship },
];

interface Props {
  active: AppTab;
  onChange: (tab: AppTab) => void;
  unlocked?: boolean;
  onUpgrade?: () => void;
}

export function BottomNav({ active, onChange, unlocked = false, onUpgrade }: Props) {
  const [morOpen, setMoreOpen] = useState(false);
  const isMoreActive = MORE_TABS.some(t => t.id === active);

  function handleTab(id: AppTab) {
    if (!unlocked && !FREE_TABS.includes(id)) {
      onUpgrade?.();
      setMoreOpen(false);
      return;
    }
    onChange(id);
    setMoreOpen(false);
  }

  return (
    <>
      {morOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
      )}

      {morOpen && (
        <div
          className="fixed bottom-16 right-2 z-50 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
          style={{ minWidth: 170 }}
        >
          {MORE_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            const locked = !unlocked && !FREE_TABS.includes(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                style={{ color: isActive ? "#1AAFCC" : locked ? "var(--muted-foreground)" : "var(--foreground)" }}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{tab.label}</span>
                {locked && <Lock className="w-3 h-3 opacity-40" />}
              </button>
            );
          })}
        </div>
      )}

      <nav className="flex items-stretch border-t border-border bg-card shrink-0" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {MAIN_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          const locked = !unlocked && !FREE_TABS.includes(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors relative"
              style={{ color: isActive ? "#1AAFCC" : "var(--muted-foreground)" }}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {locked && (
                  <Lock className="w-2.5 h-2.5 absolute -top-1 -right-1.5" style={{ color: "#E8614A" }} />
                )}
              </div>
              <span className="text-[10px] font-semibold">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: "#1AAFCC" }} />
              )}
            </button>
          );
        })}

        <button
          onClick={() => setMoreOpen(o => !o)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors relative"
          style={{ color: isMoreActive || morOpen ? "#1AAFCC" : "var(--muted-foreground)" }}
        >
          <div className="relative">
            <MoreHorizontal className="w-5 h-5" />
            {!unlocked && (
              <Lock className="w-2.5 h-2.5 absolute -top-1 -right-1.5" style={{ color: "#E8614A" }} />
            )}
          </div>
          <span className="text-[10px] font-semibold">More</span>
          {(isMoreActive || morOpen) && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: "#1AAFCC" }} />
          )}
        </button>
      </nav>
    </>
  );
}
