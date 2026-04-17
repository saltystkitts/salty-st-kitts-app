import { Map, Zap, Waves, MoreHorizontal, CalendarDays } from "lucide-react";
import { useState } from "react";
import { Ship, CloudSun } from "lucide-react";

export type AppTab = "map" | "actiontings" | "salt" | "weather" | "ferry" | "holidays";

const MAIN_TABS: { id: AppTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "map",          label: "Explore",       icon: Map },
  { id: "actiontings",  label: "Action Tings",  icon: Zap },
  { id: "salt",         label: "The Salt",      icon: Waves },
];

const MORE_TABS: { id: AppTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "holidays", label: "Holidays",  icon: CalendarDays },
  { id: "weather",  label: "Weather",   icon: CloudSun },
  { id: "ferry",    label: "Ferry",     icon: Ship },
];

interface Props {
  active: AppTab;
  onChange: (tab: AppTab) => void;
}

export function BottomNav({ active, onChange }: Props) {
  const [morOpen, setMoreOpen] = useState(false);
  const isMoreActive = MORE_TABS.some(t => t.id === active);

  function handleMoreTab(id: AppTab) {
    onChange(id);
    setMoreOpen(false);
  }

  return (
    <>
      {/* More tray backdrop */}
      {morOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
      )}

      {/* More tray */}
      {morOpen && (
        <div
          className="fixed bottom-16 right-2 z-50 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
          style={{ minWidth: 160 }}
        >
          {MORE_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleMoreTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                style={{ color: isActive ? "#1AAFCC" : "var(--muted-foreground)" }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom bar */}
      <nav className="flex items-stretch border-t border-border bg-card shrink-0" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {MAIN_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { onChange(tab.id); setMoreOpen(false); }}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors relative"
              style={{ color: isActive ? "#1AAFCC" : "var(--muted-foreground)" }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: "#1AAFCC" }} />
              )}
            </button>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setMoreOpen(o => !o)}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors relative"
          style={{ color: isMoreActive || morOpen ? "#1AAFCC" : "var(--muted-foreground)" }}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] font-semibold">More</span>
          {(isMoreActive || morOpen) && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: "#1AAFCC" }} />
          )}
        </button>
      </nav>
    </>
  );
}
