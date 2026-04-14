import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Stop } from "@shared/schema";
import { MapView } from "../components/MapView";
import { StopCard } from "../components/StopCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { StopSheet, DesktopStopDetail } from "../components/StopSheet";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function TourApp() {
  const [category, setCategory] = useState<Category>("all");
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.3, -62.75]);
  const [mapZoom, setMapZoom] = useState(11);
  const listRef = useRef<HTMLDivElement>(null);

  const { data: stops = [], isLoading } = useQuery<Stop[]>({
    queryKey: ["/api/stops", category],
    queryFn: () =>
      apiRequest("GET", `/api/stops${category !== "all" ? `?category=${category}` : ""}`)
        .then(r => r.json()),
  });

  const handleStopSelect = (stop: Stop) => {
    setSelectedStop(stop);
    setMapCenter([stop.lat, stop.lng]);
    setMapZoom(14);
  };

  const handleMapPinClick = (stop: Stop) => {
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

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Map */}
        <div className="relative h-[42vh] md:h-full md:flex-1 flex-shrink-0">
          <MapView
            stops={stops}
            selectedStop={selectedStop}
            center={mapCenter}
            zoom={mapZoom}
            onPinClick={handleMapPinClick}
          />
        </div>

        {/* Stop list panel */}
        <div className="flex flex-col flex-1 overflow-hidden md:w-[380px] md:flex-none border-t md:border-t-0 md:border-l border-border bg-background">
          <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between shrink-0">
            <span className="text-sm font-semibold text-foreground">
              {isLoading ? "Asking the locals…" : `${stops.length} stop${stops.length !== 1 ? "s" : ""}`}
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">Tap a stop to get the inside scoop</span>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-3 space-y-2.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex gap-3 p-3.5 rounded-xl bg-card border border-card-border">
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

          <DesktopStopDetail stop={selectedStop} onClose={() => setSelectedStop(null)} />
        </div>
      </div>

      <StopSheet stop={selectedStop} onClose={() => setSelectedStop(null)} />
    </div>
  );
}
