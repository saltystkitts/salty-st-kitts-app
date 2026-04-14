import { useEffect, useRef } from "react";
import type { Stop } from "@shared/schema";
import { CATEGORY_CONFIG } from "../lib/categories";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon path issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  stops: Stop[];
  selectedStop: Stop | null;
  center: [number, number];
  zoom: number;
  onPinClick: (stop: Stop) => void;
}

export function MapView({ stops, selectedStop, center, zoom, onPinClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());
  const isInitialized = useRef(false);

  // Initialize map once
  useEffect(() => {
    if (isInitialized.current || !mapRef.current) return;
    isInitialized.current = true;

    const map = L.map(mapRef.current, {
      center: [17.3, -62.75],
      zoom: 11,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
  }, []);

  // Re-render markers whenever stops or selectedStop changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current.clear();

    stops.forEach(stop => {
      const config = CATEGORY_CONFIG[stop.category as keyof typeof CATEGORY_CONFIG] ?? CATEGORY_CONFIG.historical;
      const isSelected = selectedStop?.id === stop.id;
      const size = isSelected ? 40 : 32;

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:${size}px;height:${size}px;
          background:${isSelected ? "hsl(185,72%,28%)" : config.mapColor};
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          border:2.5px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,${isSelected ? 0.45 : 0.28});
          display:flex;align-items:center;justify-content:center;
        "><span style="transform:rotate(45deg);font-size:${isSelected ? 16 : 13}px;line-height:1;">${config.emoji}</span></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -(size + 4)],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width:160px;font-family:Cabinet Grotesk,Satoshi,system-ui,sans-serif">
            <div style="font-weight:700;font-size:13px;margin-bottom:2px">${stop.name}</div>
            <div style="font-size:11px;opacity:0.7">${config.label} · ${stop.area}</div>
          </div>
        `, { maxWidth: 220 })
        .on("click", () => {
          onPinClick(stop);
          marker.openPopup();
        });

      if (isSelected) marker.openPopup();

      markersRef.current.set(stop.id, marker);
    });
  }, [stops, selectedStop, onPinClick]);

  // Pan/zoom when center changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView(center, zoom, { animate: true });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      data-testid="map-container"
      style={{ minHeight: 200 }}
    />
  );
}
