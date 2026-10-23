import { Capacitor } from "@capacitor/core";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";

/** Apple in-app purchases (iPhone app only). */
export const UNLOCK_ID = "com.saltystkitts.guide.unlock";
export const BEER_ID = "com.saltystkitts.guide.beer";
export const APPLE_APP_ID = "6815387176";

export const isIOSApp = () => Capacitor.getPlatform() === "ios";

export async function ownsUnlock(): Promise<boolean> {
  try {
    const { purchases } = await NativePurchases.getPurchases({ productType: PURCHASE_TYPE.INAPP });
    return (purchases || []).some((p: any) => p.productIdentifier === UNLOCK_ID && !p.revocationDate);
  } catch {
    return false;
  }
}

export async function getPrice(id: string): Promise<string | null> {
  try {
    const { product } = await NativePurchases.getProduct({ productIdentifier: id, productType: PURCHASE_TYPE.INAPP });
    return (product as any)?.priceString || null;
  } catch {
    return null;
  }
}

/** Returns "ok", "cancelled", or an error message. */
export async function buy(id: string): Promise<"ok" | "cancelled" | string> {
  try {
    const t: any = await NativePurchases.purchaseProduct({ productIdentifier: id, productType: PURCHASE_TYPE.INAPP, quantity: 1 });
    return t && t.productIdentifier ? "ok" : "cancelled";
  } catch (e: any) {
    const msg = String(e?.message || e || "");
    if (/cancel/i.test(msg)) return "cancelled";
    return msg || "Something went wrong. Try again.";
  }
}

export async function restore(): Promise<boolean> {
  try { await NativePurchases.restorePurchases(); } catch {}
  return ownsUnlock();
}

export function onUnlockTransaction(cb: () => void) {
  NativePurchases.addListener("transactionUpdated", (t: any) => {
    if (t?.productIdentifier === UNLOCK_ID && !t?.revocationDate) cb();
  }).catch(() => {});
}

/** Opens Apple's code redemption page (for offer codes). */
export function openRedeemCode() {
  window.open(`https://apps.apple.com/redeem?ctx=offercodes&id=${APPLE_APP_ID}`, "_blank");
}
