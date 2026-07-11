import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Stop } from "@shared/schema";
import { MapView } from "../components/MapView";
import { StopCard } from "../components/StopCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { StopSheet, DesktopStopDetail } from "../components/StopSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Map, X } from "lucide-react";

export type Category = "all" | "historical" | "nature" | "food_nightlife" | "beach" | "scenic_drive";

const EMPTY_MESSAGES: Record<Category, string> = {
  all: "Somehow we have no stops. That's impressive.",
  historical: "No history here. Fresh start.",
  nature: "Nothing in nature? On a volcanic island? Come on.",
  food_nightlife: "No food or rum?! That's a crisis. Refresh the page.",
  beach: "No beaches found. Are you sure you're on St Kitts?",
  scenic_drive: "No drives? Just pick a direction and go.",
};

const SUBTEXT: Record<Category, string> = {
  all: "Every spot worth your time on this rock",
  historical: "Where the bodies are buried (historically speaking)",
  nature: "Volcanoes, monkeys & jungle stuff",
  food_nightlife: "Rum, fish & bad decisions",
  beach: "Sand between your toes, Nevis in your face",
  scenic_drive: "Put it in drive and shut up",
};

interface TourAppProps {
  paywalled?: boolean;
  onUpgrade?: () => void;
}

export default function TourApp({ paywalled = false, onUpgrade }: TourAppProps) {
  const [category, setCategory] = useState<Category>("all");
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.3, -62.75]);
  const [mapZoom, setMapZoom] = useState(11);
  const [mapVisible, setMapVisible] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  const { data: stops = [], isLoading } = useQuery<Stop[]>({
    queryKey: ["/api/stops", category],
    queryFn: () =>
      apiRequest("GET", `/api/stops${category !== "all" ? `?category=${category}` : ""}`)
        .then(r => r.json()),
  });

  const handleStopSelect = (stop: Stop) => {
    if (paywalled && stop.category !== 'scenic_drive') {
      onUpgrade?.();
      return;
    }
    setSelectedStop(stop);
    setMapCenter([stop.lat, stop.lng]);
    setMapZoom(14);
  };

  const handleMapPinClick = (stop: Stop) => {
    if (paywalled && stop.category !== 'scenic_drive') {
      onUpgrade?.();
      return;
    }
    setSelectedStop(stop);
    setMapCenter([stop.lat, stop.lng]);
    setMapZoom(14);
    if (listRef.current) {
      const el = listRef.current.querySelector(`[data-stop-id="${stop.id}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleCategoryChange = (c: Category) => {
    setCategory(c);
    setSelectedStop(null);
    setMapCenter([17.3, -62.75]);
    setMapZoom(11);
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <CategoryFilter category={category} onChange={handleCategoryChange} />

      {/* Salty subtext bar */}
      <div className="px-4 py-1.5 bg-muted/40 border-b border-border shrink-0">
        <p className="text-xs text-muted-foreground font-medium italic">
          {SUBTEXT[category]}
        </p>
      </div>

      {/* Main content area */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row">

        {/* ── STOP LIST — left on desktop, bottom on mobile ── */}
        <div className={`flex flex-col border-t md:border-t-0 md:border-r border-border bg-background min-h-0
                        ${ mapVisible ? "h-[42vh] md:h-full md:w-[360px] md:flex-none" : "h-full w-full" }
                        order-2 md:order-1`}>

          <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between shrink-0">
            <span className="text-sm font-semibold text-foreground">
              {isLoading ? "Asking the locals…" : `${stops.length} stop${stops.length !== 1 ? "s" : ""}`}
            </span>
            {!mapVisible && (
              <button
                onClick={() => setMapVisible(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors"
                style={{ borderColor: "#1AAFCC44", color: "#1AAFCC" }}
              >
                <Map className="w-3 h-3" /> Show Map
              </button>
            )}
          </div>

          {/* Scrollable list */}
          <div ref={listRef} className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-3 space-y-2.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex gap-3 p-3.5 rounded-xl bg-card border border-border">
                    <Skeleton className="w-11 h-11 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : stops.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="text-4xl mb-3">🤷</div>
                <h3 className="font-semibold text-foreground mb-1">{EMPTY_MESSAGES[category]}</h3>
              </div>
            ) : (
              <div className="p-3 space-y-2.5">
                {stops.map(stop => (
                  <StopCard
                    key={stop.id}
                    stop={stop}
                    isSelected={selectedStop?.id === stop.id}
                    onClick={() => handleStopSelect(stop)}
                  />
                ))}
                <div className="h-2" />
              </div>
            )}
          </div>

          {/* Desktop stop detail — slides up inside the panel */}
          <DesktopStopDetail stop={selectedStop} onClose={() => setSelectedStop(null)} />
        </div>

        {/* ── MAP — right on desktop, top on mobile ── */}
        {mapVisible && (
          <div className="order-1 md:order-2 h-[45vh] md:flex-1 relative" style={{ minHeight: 0 }}>
            {/* X button overlaid on map */}
            <button
              onClick={() => setMapVisible(false)}
              className="absolute top-2 right-2 z-[1000] flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-opacity hover:opacity-90"
              style={{ background: "#1C3B5A", color: "white" }}
            >
              <X className="w-4 h-4" />
            </button>
            {/* Map fills wrapper via absolute inset */}
            <div className="absolute inset-0">
              <MapView
                stops={stops}
                selectedStop={selectedStop}
                center={mapCenter}
                zoom={mapZoom}
                onPinClick={handleMapPinClick}
              />
            </div>
          </div>
        )}

      </div>

      {/* Mobile bottom sheet */}
      <StopSheet stop={selectedStop} onClose={() => setSelectedStop(null)} />
    </div>
  );
}
