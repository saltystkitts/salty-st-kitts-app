import { byDistanceFromFrigate } from "./distance";

/** Items you've put in order come first (in your order); anything else follows. */
export function byManualOrder<T extends { sortOrder?: number | null; id: number }>(a: T, b: T) {
  const x = a.sortOrder ?? Number.MAX_SAFE_INTEGER, y = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
  return x - y || a.id - b.id;
}

/** Loot uses your order; everything else runs out from Frigate Bay. */
export function stopListSort(category: string) {
  return (a: any, b: any) => {
    if (category === "loot") {
      const x = a.sortOrder ?? Number.MAX_SAFE_INTEGER, y = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      if (x !== y) return x - y;
    }
    // Delivery-only businesses have no real spot, so they go to the bottom
    const da = isDelivery(a) ? 1 : 0, db = isDelivery(b) ? 1 : 0;
    if (da !== db) return da - db;
    return byDistanceFromFrigate(a, b);
  };
}

function isDelivery(s: any) {
  return typeof s.area === "string" && s.area.trim().toLowerCase().startsWith("delivery");
}
