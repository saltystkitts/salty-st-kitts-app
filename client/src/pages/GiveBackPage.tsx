import { Capacitor } from "@capacitor/core";
import { usePageContent } from "@/lib/pageContent";

export default function GiveBackPage() {
  const g = usePageContent("wording").give_back;
  // Apple requires tips inside the iPhone app to use Apple's own purchase, so the
  // Stripe beer link only shows on the website until that's built.
  const showBeer = !Capacitor.isNativePlatform() && !!g.beer_link;
  const card = "rounded-2xl border border-border bg-card p-4 space-y-2";
  const btn = "inline-block mt-1 px-4 py-2.5 rounded-xl font-bold text-sm text-white";
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="px-4 py-4 border-b border-border shrink-0" style={{ background: "#1C3B5A" }}>
        <h1 className="font-extrabold text-xl text-white">{g.title}</h1>
        {g.subtitle && <p className="text-sm mt-0.5" style={{ color: "#1AAFCC" }}>{g.subtitle}</p>}
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {showBeer && (
          <div className={card}>
            <h2 className="font-bold text-lg text-foreground">{g.beer_title}</h2>
            {g.beer_text && <p className="text-base text-muted-foreground leading-relaxed">{g.beer_text}</p>}
            <a href={g.beer_link} target="_blank" rel="noopener noreferrer" className={btn} style={{ background: "#E8614A" }}>{g.beer_button}</a>
          </div>
        )}
        {g.causes.filter(c => c.name).map((c, i) => (
          <div key={i} className={card}>
            <h2 className="font-bold text-lg text-foreground">{c.name}</h2>
            {c.description && <p className="text-base text-muted-foreground leading-relaxed">{c.description}</p>}
            {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer" className={btn} style={{ background: "#1AAFCC" }}>{c.button || "Visit →"}</a>}
          </div>
        ))}
        <div className="h-4" />
      </div>
    </div>
  );
}
