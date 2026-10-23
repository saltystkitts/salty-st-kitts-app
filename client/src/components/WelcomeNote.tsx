import saltyLogo from "@assets/salty-icon-new.png";
import { usePageContent } from "@/lib/pageContent";

/** One-time note shown the very first time the app opens. */
export default function WelcomeNote({ onDone }: { onDone: () => void }) {
  const w = usePageContent("wording").welcome;
  return (
    <div className="fixed inset-0 z-[2100] flex items-center justify-center p-5" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-[3px] border-[#1C3B5A] bg-card">
        <div className="h-1.5 w-full" style={{ background: "#1AAFCC" }} />
        <div className="px-6 pt-7 pb-6 flex flex-col items-center text-center">
          <img src={saltyLogo} alt="Salty St Kitts" className="w-16 h-16 rounded-2xl object-cover mb-4 shadow-md" />
          <h2 className="text-2xl font-extrabold text-foreground mb-4">{w.title}</h2>
          {w.line_1 && <p className="text-base leading-relaxed text-foreground mb-2">{w.line_1}</p>}
          {w.line_2 && <p className="text-base leading-relaxed text-foreground mb-4">{w.line_2}</p>}
          {w.signature && <p className="text-sm leading-relaxed text-muted-foreground mb-6">{w.signature}</p>}
          <button
            onClick={() => { localStorage.setItem("salty_seen_welcome", "true"); onDone(); }}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-base shadow-lg active:scale-[0.98] transition-transform"
            style={{ background: "#E8614A" }}
            data-testid="welcome-continue"
          >
            {w.button}
          </button>
        </div>
      </div>
    </div>
  );
}
