import { useQuery } from "@tanstack/react-query";
import { Wind, Droplets, Eye, Thermometer, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Open-Meteo free API — no key needed, returns current + 7-day forecast
const LAT = 17.2948;
const LNG = -62.7261;

interface WeatherData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
    visibility: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_probability_max: number[];
  };
}

function wmoDescription(code: number): { desc: string; emoji: string } {
  if (code === 0) return { desc: "Clear sky", emoji: "☀️" };
  if (code <= 2) return { desc: "Partly cloudy", emoji: "⛅" };
  if (code === 3) return { desc: "Overcast", emoji: "☁️" };
  if (code <= 49) return { desc: "Foggy", emoji: "🌫️" };
  if (code <= 59) return { desc: "Light drizzle", emoji: "🌦️" };
  if (code <= 69) return { desc: "Rainy", emoji: "🌧️" };
  if (code <= 79) return { desc: "Sleet / hail", emoji: "🌨️" };
  if (code <= 82) return { desc: "Rain showers", emoji: "🌦️" };
  if (code <= 99) return { desc: "Thunderstorm", emoji: "⛈️" };
  return { desc: "Unknown", emoji: "🌡️" };
}

function windDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function dayLabel(dateStr: string, index: number): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function WeatherPage() {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery<WeatherData>({
    queryKey: ["weather-stkitts"],
    queryFn: () =>
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,visibility&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&wind_speed_unit=mph&temperature_unit=celsius&forecast_days=7&timezone=America%2FSt_Kitts`
      ).then(r => r.json()),
    staleTime: 1000 * 60 * 30, // 30 min
  });

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : null;

  const current = data?.current;
  const daily = data?.daily;
  const weather = current ? wmoDescription(current.weather_code) : null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Hero current weather */}
      <div className="px-4 py-5 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: "#1AAFCC" }}>
              Basseterre, St Kitts
            </p>
            {isLoading ? (
              <Skeleton className="h-14 w-32 mt-1" />
            ) : error ? (
              <p className="text-red-400 text-sm mt-2">Couldn't load weather. Check your connection.</p>
            ) : current && weather ? (
              <>
                <div className="flex items-end gap-3">
                  <span className="text-6xl font-bold text-white leading-none">
                    {Math.round(current.temperature_2m)}°
                  </span>
                  <span className="text-4xl mb-1">{weather.emoji}</span>
                </div>
                <p className="text-white font-semibold mt-1">{weather.desc}</p>
                <p className="text-sm mt-0.5" style={{ color: "#1AAFCC" }}>
                  Feels like {Math.round(current.apparent_temperature)}°C
                </p>
              </>
            ) : null}
          </div>

          <button
            onClick={() => refetch()}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#1AAFCC" }}
            data-testid="weather-refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Stats row */}
        {current && !isLoading && (
          <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <Droplets className="w-3.5 h-3.5" style={{ color: "#1AAFCC" }} />
              {current.relative_humidity_2m}% humidity
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <Wind className="w-3.5 h-3.5" style={{ color: "#1AAFCC" }} />
              {Math.round(current.wind_speed_10m)} mph {windDirection(current.wind_direction_10m)}
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <Eye className="w-3.5 h-3.5" style={{ color: "#1AAFCC" }} />
              {current.visibility >= 1000 ? `${Math.round(current.visibility / 1000)}km vis` : "Low vis"}
            </div>
          </div>
        )}

        {lastUpdated && (
          <p className="text-[10px] mt-3 opacity-50 text-white">Updated {lastUpdated}</p>
        )}
      </div>

      {/* 7-day forecast */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">7-Day Forecast</h2>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : daily ? (
            <div className="space-y-2">
              {daily.time.map((date, i) => {
                const w = wmoDescription(daily.weather_code[i]);
                const rain = daily.precipitation_probability_max[i];
                return (
                  <div
                    key={date}
                    className="flex items-center justify-between bg-card border border-card-border rounded-xl px-4 py-3"
                    data-testid={`forecast-day-${i}`}
                  >
                    <div className="w-24">
                      <p className="text-sm font-semibold text-foreground">{dayLabel(date, i)}</p>
                      {rain > 20 && (
                        <p className="text-xs text-blue-500 mt-0.5">💧 {rain}% rain</p>
                      )}
                    </div>
                    <span className="text-2xl">{w.emoji}</span>
                    <p className="text-xs text-muted-foreground w-20 text-center">{w.desc}</p>
                    <div className="text-right">
                      <span className="text-sm font-bold text-foreground">{Math.round(daily.temperature_2m_max[i])}°</span>
                      <span className="text-sm text-muted-foreground"> / {Math.round(daily.temperature_2m_min[i])}°</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Salty weather note */}
          <div className="mt-4 p-3.5 rounded-xl border border-card-border bg-card">
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              🧂 <strong>The Salty take on St Kitts weather:</strong> It's the Caribbean. It's going to be warm. It might rain for 20 minutes in the afternoon and then be perfect again. Pack sunscreen, not an umbrella.
            </p>
          </div>
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
