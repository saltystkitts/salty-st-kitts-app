import type { Stop } from "@shared/schema";
import { X, Clock, MapPin, Lightbulb, Navigation, ParkingCircle, Cigarette, Baby, Wifi, CreditCard, Shirt, Sun, Music } from "lucide-react";
import { CATEGORY_CONFIG } from "../lib/categories";
import { Button } from "@/components/ui/button";

interface Props {
  stop: Stop | null;
  onClose: () => void;
}

// ── Attribute badge config ──────────────────────────────
const PARKING_LABELS: Record<string, { label: string; color: string }> = {
  easy:    { label: "Easy Parking", color: "#15803d" },
  limited: { label: "Limited Parking", color: "#b45309" },
  street:  { label: "Street Only", color: "#b45309" },
  none:    { label: "No Parking", color: "#dc2626" },
};
const SMOKING_LABELS: Record<string, { label: string; color: string }> = {
  cigarettes: { label: "🚬 Smoking OK", color: "#6b7280" },
  weed:       { label: "🌿 420 Friendly", color: "#15803d" },
  both:       { label: "🌿🚬 Smoke Friendly", color: "#15803d" },
  outside:    { label: "Outside Only", color: "#b45309" },
  no:         { label: "No Smoking", color: "#dc2626" },
};
const KIDS_LABELS: Record<string, { label: string; color: string }> = {
  yes:     { label: "👶 Kid Friendly", color: "#0369a1" },
  no:      { label: "Adults Only", color: "#dc2626" },
  depends: { label: "Kids OK (early)", color: "#b45309" },
};
const WIFI_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: "📶 Free WiFi", color: "#0369a1" },
  ask:  { label: "WiFi (ask)", color: "#6b7280" },
  no:   { label: "No WiFi", color: "#6b7280" },
};
const PAYMENT_LABELS: Record<string, { label: string; color: string }> = {
  cash: { label: "💵 Cash Only", color: "#b45309" },
  card: { label: "💳 Card OK", color: "#15803d" },
  both: { label: "💵💳 Cash & Card", color: "#15803d" },
};
const DRESS_LABELS: Record<string, { label: string; color: string }> = {
  anything: { label: "👕 Anything Goes", color: "#6b7280" },
  beach:    { label: "🩱 Beach Casual", color: "#0369a1" },
  smart:    { label: "👔 Smart Casual", color: "#7c3aed" },
};
const TIME_LABELS: Record<string, { label: string; color: string }> = {
  morning:   { label: "🌅 Best in AM", color: "#b45309" },
  afternoon: { label: "☀️ Best Afternoon", color: "#b45309" },
  evening:   { label: "🌆 Best at Sunset", color: "#7c3aed" },
  latenight: { label: "🌙 Late Night", color: "#1C3B5A" },
};
const VIBE_LABELS: Record<string, { label: string; color: string }> = {
  chill:   { label: "😎 Chill Vibes", color: "#0369a1" },
  lively:  { label: "🔥 Lively", color: "#dc2626" },
  local:   { label: "🏝️ Local Crowd", color: "#15803d" },
  mixed:   { label: "🌍 Mixed Crowd", color: "#6b7280" },
  tourist: { label: "📸 Tourist Spot", color: "#6b7280" },
};

function AttrBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
      style={{ background: color }}
    >
      {label}
    </span>
  );
}

function AttributeBadges({ stop }: { stop: Stop }) {
  const badges: { label: string; color: string }[] = [];
  if (stop.parking && PARKING_LABELS[stop.parking]) badges.push(PARKING_LABELS[stop.parking]);
  if (stop.smoking && SMOKING_LABELS[stop.smoking]) badges.push(SMOKING_LABELS[stop.smoking]);
  if (stop.kidsOk && KIDS_LABELS[stop.kidsOk]) badges.push(KIDS_LABELS[stop.kidsOk]);
  if (stop.wifi && WIFI_LABELS[stop.wifi]) badges.push(WIFI_LABELS[stop.wifi]);
  if (stop.payment && PAYMENT_LABELS[stop.payment]) badges.push(PAYMENT_LABELS[stop.payment]);
  if (stop.dresscode && DRESS_LABELS[stop.dresscode]) badges.push(DRESS_LABELS[stop.dresscode]);
  if (stop.bestTime && TIME_LABELS[stop.bestTime]) badges.push(TIME_LABELS[stop.bestTime]);
  if (stop.vibe && VIBE_LABELS[stop.vibe]) badges.push(VIBE_LABELS[stop.vibe]);

  if (badges.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">The Intel</p>
      <div className="flex flex-wrap gap-1.5">
        {badges.map((b, i) => <AttrBadge key={i} label={b.label} color={b.color} />)}
      </div>
    </div>
  );
}

export function StopSheet({ stop, onClose }: Props) {
  if (!stop) return null;
  const config = CATEGORY_CONFIG[stop.category as keyof typeof CATEGORY_CONFIG] ?? CATEGORY_CONFIG.historical;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`;
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:static md:z-auto bg-card border-t border-border rounded-t-2xl md:rounded-none shadow-xl md:shadow-none max-h-[80vh] overflow-y-auto md:hidden transition-all duration-300"
        data-testid="stop-sheet"
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="flex items-start justify-between px-5 py-3 border-b border-border">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: config.bgColor, color: config.textColor }}>
                {config.emoji} {config.label}
              </span>
              {stop.featured && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
                  ⭐ Featured
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-foreground leading-tight">{stop.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-2" data-testid="close-sheet">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{stop.duration}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{stop.area}</span>
          </div>

          <p className="text-sm text-foreground leading-relaxed">{stop.description}</p>

          {/* Attribute badges */}
          <AttributeBadges stop={stop} />

          <div className="flex gap-3 p-3.5 rounded-xl" style={{ background: config.bgColor }}>
            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: config.textColor }} />
            <div>
              <div className="text-xs font-semibold mb-0.5" style={{ color: config.textColor }}>Insider Tip</div>
              <p className="text-xs leading-relaxed" style={{ color: config.textColor }}>{stop.tip}</p>
            </div>
          </div>

          <Button onClick={handleDirections} className="w-full gap-2 font-semibold" data-testid="get-directions">
            <Navigation className="w-4 h-4" />
            Get Directions
          </Button>
        </div>
        <div className="h-4" />
      </div>
    </>
  );
}

export function DesktopStopDetail({ stop, onClose }: Props) {
  if (!stop) return null;
  const config = CATEGORY_CONFIG[stop.category as keyof typeof CATEGORY_CONFIG] ?? CATEGORY_CONFIG.historical;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`;
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <div className="border-t border-border bg-card/60 hidden md:block">
      <div className="flex items-start justify-between px-4 pt-3 pb-2 border-b border-border">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: config.bgColor, color: config.textColor }}>
              {config.emoji} {config.label}
            </span>
          </div>
          <h2 className="text-sm font-bold text-foreground leading-tight">{stop.name}</h2>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 py-3 space-y-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{stop.duration}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{stop.area}</span>
        </div>
        <p className="text-xs text-foreground leading-relaxed line-clamp-3">{stop.description}</p>
        <AttributeBadges stop={stop} />
        <div className="flex gap-2 p-2.5 rounded-lg" style={{ background: config.bgColor }}>
          <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: config.textColor }} />
          <p className="text-[11px] leading-relaxed" style={{ color: config.textColor }}>{stop.tip}</p>
        </div>
        <Button onClick={handleDirections} size="sm" className="w-full gap-1.5 text-xs font-semibold">
          <Navigation className="w-3.5 h-3.5" />
          Get Directions
        </Button>
      </div>
    </div>
  );
}
