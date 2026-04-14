import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Stop } from "@shared/schema";
import { ArrowLeft, Clock, MapPin, Lightbulb, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_CONFIG } from "../lib/categories";

export default function StopDetail() {
  const [, params] = useRoute("/stop/:id");
  const id = params?.id;

  const { data: stop, isLoading } = useQuery<Stop>({
    queryKey: ["/api/stops", id],
    queryFn: () => apiRequest("GET", `/api/stops/${id}`).then(r => r.json()),
    enabled: !!id,
  });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading…</div>;
  if (!stop) return <div className="p-8 text-center text-muted-foreground">Stop not found.</div>;

  const config = CATEGORY_CONFIG[stop.category as keyof typeof CATEGORY_CONFIG] ?? CATEGORY_CONFIG.historical;

  return (
    <div className="max-w-xl mx-auto p-4">
      <Link href="/">
        <a className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to map
        </a>
      </Link>
      <h1 className="text-2xl font-bold mb-2">{stop.name}</h1>
      <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{stop.duration}</span>
        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{stop.area}</span>
      </div>
      <p className="text-base leading-relaxed mb-4">{stop.description}</p>
      <div className="p-4 rounded-xl mb-4" style={{ background: config.bgColor }}>
        <div className="flex gap-2">
          <Lightbulb className="w-4 h-4 mt-0.5" style={{ color: config.textColor }} />
          <p className="text-sm" style={{ color: config.textColor }}>{stop.tip}</p>
        </div>
      </div>
      <Button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`, "_blank")} className="w-full gap-2">
        <Navigation className="w-4 h-4" /> Get Directions
      </Button>
    </div>
  );
}
