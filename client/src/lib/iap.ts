import { Capacitor } from "@capacitor/core";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";

/** Store in-app purchases: Apple (iPhone app) and Google Play Billing (Android app). */
export const UNLOCK_ID = "com.saltystkitts.guide.unlock";
export const BEER_ID = "com.saltystkitts.guide.beer";
export const APPLE_APP_ID = "6815387176";

export const isIOSApp = () => Capacitor.getPlatform() === "ios";
export const isAndroidApp = () => Capacitor.getPlatform() === "android";
/** True inside either store app (Apple or Google billing). */
export const isStoreApp = () => isIOSApp() || isAndroidApp();

const validPurchase = (p: any) =>
  p && p.productIdentifier === UNLOCK_ID && !p.revocationDate &&
  (!isAndroidApp() || p.purchaseState === undefined || String(p.purchaseState) === "1" || String(p.purchaseState).toUpperCase() === "PURCHASED");

export async function ownsUnlock(): Promise<boolean> {
  try {
    const { purchases } = await NativePurchases.getPurchases({ productType: PURCHASE_TYPE.INAPP });
    return (purchases || []).some(validPurchase);
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
    // The beer is consumable: on Android it must be consumed so it can be bought again.
    const t: any = await NativePurchases.purchaseProduct({ productIdentifier: id, productType: PURCHASE_TYPE.INAPP, quantity: 1, isConsumable: id === BEER_ID });
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
    if (validPurchase(t)) cb();
  }).catch(() => {});
}

/** Opens Apple's code redemption page (for offer codes). */
export function openRedeemCode() {
  window.open(`https://apps.apple.com/redeem?ctx=offercodes&id=${APPLE_APP_ID}`, "_blank");
}
