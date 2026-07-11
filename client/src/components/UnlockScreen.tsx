import { useState } from "react";
import { useUnlock } from "../context/UnlockContext";
import { X } from "lucide-react";
import saltyLogo from "@assets/salty-logo.jpg";

export default function UnlockScreen({ onDismiss }: { onDismiss?: () => void }) {
  const { unlock, stripeLink } = useUnlock();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  async function handleUnlock() {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    const ok = await unlock(code);
    setLoading(false);
    if (!ok) setError("That code didn't work. Check it and try again.");
  }

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      {/* Modal card */}
      <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl" style={{ background: "#1C3B5A" }}>

        {/* Dismiss X */}
        <button
          onClick={() => {
            localStorage.setItem("salty_seen_paywall", "true");
            onDismiss?.();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full transition-colors hover:bg-white/10"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        <div className="px-6 pt-8 pb-7 flex flex-col items-center">
          {/* Logo */}
          <img src={saltyLogo} alt="Salty St Kitts" className="w-16 h-16 rounded-2xl object-cover mb-4 shadow-lg" />
          <h2 className="text-xl font-extrabold text-white text-center mb-0.5">Salty St Kitts</h2>
          <p className="text-sm mb-6" style={{ color: "#1AAFCC" }}>The Guide</p>

          {/* Free vs Paid */}
          <div className="w-full rounded-2xl p-4 mb-5 space-y-2" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Free</p>
                <div className="space-y-1.5 text-xs text-white/70">
                  <div>🗺️ Map with pins</div>
                  <div>🚗 Scenic drives</div>
                  <div>🌊 The Salt</div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: "#1AAFCC" }}>Unlocked — $8.69</p>
                <div className="space-y-1.5 text-xs text-white/80">
                  <div>✅ Full stop details</div>
                  <div>✅ Action Tings</div>
                  <div>✅ Ferry, Taxi, Weather</div>
                  <div>✅ Explore By Area</div>
                  <div>✅ Audio tours soon</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href={stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center font-bold text-white py-3.5 rounded-2xl mb-3 shadow-lg transition-opacity hover:opacity-90 text-sm"
            style={{ background: "#E8614A" }}
          >
            Unlock for $8.69 — one time
          </a>

          {/* Code entry */}
          {!showCode ? (
            <button onClick={() => setShowCode(true)} className="text-xs underline" style={{ color: "#1AAFCC" }}>
              Already paid? Enter your code
            </button>
          ) : (
            <div className="w-full space-y-2">
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleUnlock()}
                placeholder="ENTER CODE"
                className="w-full px-4 py-3 rounded-xl text-center font-bold text-base tracking-widest border-2 bg-white/10 text-white placeholder-white/30 outline-none"
                style={{ borderColor: error ? "#E8614A" : "#1AAFCC55" }}
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
              />
              {error && <p className="text-xs text-center" style={{ color: "#E8614A" }}>{error}</p>}
              <button
                onClick={handleUnlock}
                disabled={loading || !code.trim()}
                className="w-full py-3 rounded-xl font-bold text-white text-sm transition-opacity disabled:opacity-50"
                style={{ background: "#1AAFCC" }}
              >
                {loading ? "Checking..." : "Unlock"}
              </button>
            </div>
          )}

          {/* Skip */}
          <button
            onClick={() => {
              localStorage.setItem("salty_seen_paywall", "true");
              onDismiss?.();
            }}
            className="mt-5 text-xs text-white/30 underline"
          >
            Continue with free version
          </button>
        </div>
      </div>
    </div>
  );
}
