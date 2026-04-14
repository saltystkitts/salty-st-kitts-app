import type { Stop } from "@shared/schema";
import { Clock, MapPin, Star } from "lucide-react";
import { CATEGORY_CONFIG } from "../lib/categories";

interface Props {
  stop: Stop;
  isSelected: boolean;
  onClick: () => void;
}

export function StopCard({ stop, isSelected, onClick }: Props) {
  const config = CATEGORY_CONFIG[stop.category as keyof typeof CATEGORY_CONFIG] ?? CATEGORY_CONFIG.historical;

  return (
    <button
      onClick={onClick}
      data-stop-id={stop.id}
      data-testid={`stop-card-${stop.id}`}
      className={`
        w-full text-left p-3.5 rounded-xl border transition-all duration-150
        flex gap-3 items-start group
        ${isSelected
          ? "bg-accent border-primary/40 shadow-md ring-1 ring-primary/20"
          : "bg-card border-card-border hover:border-border hover:shadow-sm hover:bg-card"
        }
      `}
    >
      {/* Category icon badge */}
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
        style={{ background: config.bgColor }}
      >
        {config.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm text-foreground leading-tight truncate">
            {stop.name}
          </h3>
          {stop.featured && (
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400 flex-shrink-0 mt-0.5" />
          )}
        </div>

        <div className="flex items-center gap-1 mt-0.5 mb-1">
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ background: config.bgColor, color: config.textColor }}
          >
            {config.label}
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {stop.description}
        </p>

        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {stop.duration}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {stop.area}
          </span>
        </div>
      </div>
    </button>
  );
}
