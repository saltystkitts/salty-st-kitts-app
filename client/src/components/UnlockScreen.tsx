import { useState } from "react";
import { useUnlock } from "../context/UnlockContext";
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
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 py-10"
      style={{ background: "#1C3B5A" }}
    >
      {/* Logo */}
      <img
        src={saltyLogo}
        alt="Salty St Kitts"
        className="w-24 h-24 rounded-2xl object-cover mb-5 shadow-lg"
      />

      <h1 className="text-2xl font-extrabold text-white text-center mb-1">
        Salty St Kitts
      </h1>
      <p className="text-sm text-center mb-8" style={{ color: "#1AAFCC" }}>
        The Guide
      </p>

      {/* Free tier info */}
      <div className="w-full max-w-sm bg-white/10 rounded-2xl p-4 mb-6 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wide text-white/60">What's free</p>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>🗺️</span> Map with pins
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>🚗</span> Scenic drives
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>🌊</span> The Salt — local posts
        </div>
        <div className="h-px bg-white/20 my-2" />
        <p className="text-xs font-bold uppercase tracking-wide text-white/60">Unlock everything — $8.69</p>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>✅</span> All stops with full details & tips
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>✅</span> Action Tings, Ferry, Taxi, Weather
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>✅</span> Explore By Area
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>✅</span> Audio tours — coming soon
        </div>
      </div>

      {/* CTA */}
      <a
        href={stripeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-sm block text-center font-bold text-white py-3.5 rounded-2xl mb-3 shadow-lg transition-opacity hover:opacity-90"
        style={{ background: "#E8614A" }}
      >
        Unlock for $8.69 — one time
      </a>

      {/* Already paid toggle */}
      {!showCode ? (
        <button
          onClick={() => setShowCode(true)}
          className="text-sm underline"
          style={{ color: "#1AAFCC" }}
        >
          Already paid? Enter your code
        </button>
      ) : (
        <div className="w-full max-w-sm space-y-2 mt-1">
          <input
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleUnlock()}
            placeholder="Enter unlock code"
            className="w-full px-4 py-3 rounded-xl text-center font-bold text-lg tracking-widest border-2 bg-white/10 text-white placeholder-white/30 outline-none focus:border-cyan-400"
            style={{ borderColor: error ? "#E8614A" : "#1AAFCC44" }}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
          />
          {error && (
            <p className="text-xs text-center" style={{ color: "#E8614A" }}>{error}</p>
          )}
          <button
            onClick={handleUnlock}
            disabled={loading || !code.trim()}
            className="w-full py-3 rounded-xl font-bold text-white transition-opacity disabled:opacity-50"
            style={{ background: "#1AAFCC" }}
          >
            {loading ? "Checking..." : "Unlock"}
          </button>
        </div>
      )}

      {/* Skip — use free version */}
      <button
        onClick={() => {
          localStorage.setItem("salty_seen_paywall", "true");
          onDismiss?.();
        }}
        className="mt-6 text-xs text-white/40 underline"
      >
        Continue with free version
      </button>
    </div>
  );
}
