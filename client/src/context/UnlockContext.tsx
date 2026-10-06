import { Capacitor } from "@capacitor/core";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UnlockContextType {
  unlocked: boolean;
  unlock: (code: string) => Promise<boolean>;
  stripeLink: string;
}

const UnlockContext = createContext<UnlockContextType>({
  unlocked: false,
  unlock: async () => false,
  stripeLink: "",
});

export function UnlockProvider({ children }: { children: ReactNode }) {
  // iPhone/Android app: everything unlocked for now (testing). No Stripe or codes
  // in the native app — Apple/Google require their own in-app purchase instead.
  const native = Capacitor.isNativePlatform();
  const [unlocked, setUnlocked] = useState(() => {
    return native || localStorage.getItem("salty_unlocked") === "true";
  });
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
    <UnlockContext.Provider value={{ unlocked, unlock, stripeLink }}>
      {children}
    </UnlockContext.Provider>
  );
}

export function useUnlock() {
  return useContext(UnlockContext);
}
