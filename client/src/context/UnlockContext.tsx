import { Capacitor } from "@capacitor/core";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { isIOSApp, ownsUnlock, onUnlockTransaction, UNLOCK_ID, buy, restore as iapRestore, getPrice } from "@/lib/iap";

interface UnlockContextType {
  unlocked: boolean;
  unlock: (code: string) => Promise<boolean>;
  stripeLink: string;
  /** iPhone app: Apple in-app purchase */
  ios: boolean;
  unlockPrice: string | null;
  buyUnlock: () => Promise<"ok" | "cancelled" | string>;
  restore: () => Promise<boolean>;
}

const UnlockContext = createContext<UnlockContextType>({
  unlocked: false,
  unlock: async () => false,
  stripeLink: "",
  ios: false,
  unlockPrice: null,
  buyUnlock: async () => "cancelled",
  restore: async () => false,
});

export function UnlockProvider({ children }: { children: ReactNode }) {
  // iPhone app: Apple in-app purchase. Android app: everything unlocked for now
  // (testing) until Google Play billing is set up. Website: Stripe + codes.
  const ios = isIOSApp();
  const android = Capacitor.isNativePlatform() && !ios;
  const IOS_KEY = "salty_unlocked_ios";
  const [unlocked, setUnlocked] = useState(() => {
    if (android) return true;
    if (ios) return localStorage.getItem(IOS_KEY) === "true";
    return localStorage.getItem("salty_unlocked") === "true";
  });
  const [unlockPrice, setUnlockPrice] = useState<string | null>(null);

  function markIOSUnlocked(v: boolean) {
    try { v ? localStorage.setItem(IOS_KEY, "true") : localStorage.removeItem(IOS_KEY); } catch {}
    setUnlocked(v);
  }

  useEffect(() => {
    if (!ios) return;
    // Check what Apple says this Apple ID owns (works offline from Apple's cache)
    ownsUnlock().then(owned => { if (owned) markIOSUnlocked(true); });
    onUnlockTransaction(() => markIOSUnlocked(true));
    getPrice(UNLOCK_ID).then(setUnlockPrice);
  }, []);

  async function buyUnlock() {
    const r = await buy(UNLOCK_ID);
    if (r === "ok") markIOSUnlocked(true);
    return r;
  }

  async function restore() {
    const owned = await iapRestore();
    if (owned) markIOSUnlocked(true);
    return owned;
  }
  const [stripeLink, setStripeLink] = useState("https://buy.stripe.com/8x200c8P86CgdsQg5XgEg0S");

  useEffect(() => {
    fetch("/api/stripe-link")
      .then(r => r.json())
      .then(d => { if (d.stripeLink) setStripeLink(d.stripeLink); })
      .catch(() => {});
  }, []);

  async function unlock(code: string): Promise<boolean> {
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem("salty_unlocked", "true");
        setUnlocked(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  return (
    <UnlockContext.Provider value={{ unlocked, unlock, stripeLink, ios, unlockPrice, buyUnlock, restore }}>
      {children}
    </UnlockContext.Provider>
  );
}

export function useUnlock() {
  return useContext(UnlockContext);
}
