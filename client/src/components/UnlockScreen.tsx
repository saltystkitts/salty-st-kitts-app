import { useState } from "react";
import { useUnlock } from "../context/UnlockContext";
import { X } from "lucide-react";
import saltyLogo from "@assets/salty-icon-new.png";
import { usePageContent } from "@/lib/pageContent";
import { openRedeemCode } from "@/lib/iap";

export default function UnlockScreen({ onDismiss }: { onDismiss?: () => void }) {
  const { unlock, stripeLink, ios, unlockPrice, buyUnlock, restore } = useUnlock();
  const w = usePageContent("wording");
  const u = w.unlock_popup;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [busy, setBusy] = useState<"" | "buy" | "restore">("");
  const [note, setNote] = useState("");

  // iPhone: show Apple's local price (e.g. CA$ for Canadians) in place of $8.69
  const buttonText = ios && unlockPrice ? u.button.replace("$8.69", unlockPrice) : u.button;

  async function handleBuy() {
    setBusy("buy"); setNote("");
    const r = await buyUnlock();
    setBusy("");
    if (r === "ok") onDismiss?.();
    else if (r !== "cancelled") setNote(r);
  }

  async function handleRestore() {
    setBusy("restore"); setNote("");
    const owned = await restore();
    setBusy("");
    if (owned) onDismiss?.();
    else setNote("No purchase found for this Apple ID.");
  }

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
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      {/* Modal card */}
      <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl" style={{ background: "#1C3B5A" }}>

        {/* Dismiss X */}
        <button
          onClick={() => {
            localStorage.setItem("salty_seen_paywall", "true");
            onDismiss?.();
          }}
          className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full shadow-md active:scale-95 transition-transform" style={{ background: "#E8614A" }} aria-label="Close"
        >
          <X className="w-5 h-5 text-white" strokeWidth={3} />
        </button>

        <div className="px-6 pt-8 pb-7 flex flex-col items-center">
          {/* Logo */}
          <img src={saltyLogo} alt="Salty St Kitts" className="w-16 h-16 rounded-2xl object-cover mb-4 shadow-lg" />
          <h2 className="text-xl font-extrabold text-white text-center mb-0.5">{u.title}</h2>
          <p className="text-sm mb-6" style={{ color: "#1AAFCC" }}>{u.subtitle}</p>

          {/* Free vs Paid */}
          <div className="w-full rounded-2xl p-4 mb-5 space-y-2" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wide mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>{u.free_label}</p>
                <div className="space-y-1.5 text-xs text-white/70">
                  {u.free_items.filter(Boolean).map((t, i) => <div key={i}>{t}</div>)}
                </div>
              </div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wide mb-1.5" style={{ color: "#1AAFCC" }}>{u.paid_label}</p>
                <div className="space-y-1.5 text-xs text-white/80">
                  {u.paid_items.filter(Boolean).map((t, i) => <div key={i}>{t}</div>)}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          {ios ? (
            <>
              <button
                onClick={handleBuy}
                disabled={!!busy}
                className="w-full block text-center font-bold text-white py-3.5 rounded-2xl mb-3 shadow-lg transition-opacity disabled:opacity-60 text-sm"
                style={{ background: "#E8614A" }}
              >
                {busy === "buy" ? "One sec..." : buttonText}
              </button>
              {note && <p className="text-xs text-center mb-2" style={{ color: "#E8614A" }}>{note}</p>}
              <div className="flex items-center justify-center gap-4">
                <button onClick={openRedeemCode} className="text-xs underline" style={{ color: "#1AAFCC" }}>
                  {u.redeem_link}
                </button>
                <button onClick={handleRestore} disabled={!!busy} className="text-xs underline" style={{ color: "#1AAFCC" }}>
                  {busy === "restore" ? "Checking..." : u.restore_link}
                </button>
              </div>
            </>
          ) : (
          <>
          <a
            href={stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center font-bold text-white py-3.5 rounded-2xl mb-3 shadow-lg transition-opacity hover:opacity-90 text-sm"
            style={{ background: "#E8614A" }}
          >
            {u.button}
          </a>

          {/* Code entry */}
          {!showCode ? (
            <button onClick={() => setShowCode(true)} className="text-xs underline" style={{ color: "#1AAFCC" }}>
              {u.code_link}
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
          </>
          )}

          {/* Skip */}
          <button
            onClick={() => {
              localStorage.setItem("salty_seen_paywall", "true");
              onDismiss?.();
            }}
            className="mt-5 text-sm text-white/60 underline"
          >
            {u.skip}
          </button>

          <p className="mt-4 text-xs leading-snug text-center text-white/55">
            {w.notes.nobody_pays}
          </p>
        </div>
      </div>
    </div>
  );
}
