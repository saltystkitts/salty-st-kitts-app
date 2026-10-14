import { byDistanceFromFrigate } from "./distance";

/** Items you've put in order come first (in your order); anything else follows. */
export function byManualOrder<T extends { sortOrder?: number | null; id: number }>(a: T, b: T) {
  const x = a.sortOrder ?? Number.MAX_SAFE_INTEGER, y = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
  return x - y || a.id - b.id;
}

/** Categories where you set the order yourself in Admin. */
export const MANUAL_ORDER_CATEGORIES = ["loot", "food_nightlife"];

/** The order groups appear in under "All". */
const ALL_GROUP_ORDER = ["beach", "historical", "nature", "loot", "food_nightlife"];

/** Grocery + Lime & Dine use your order; everything else runs out from Frigate Bay.
 *  "All" shows groups in ALL_GROUP_ORDER, each sorted the way its own tab is. */
export function stopListSort(category: string): (a: any, b: any) => number {
  if (category === "all") {
    return (a: any, b: any) => {
      const ga = groupRank(a.category), gb = groupRank(b.category);
      if (ga !== gb) return ga - gb;
      return stopListSort(a.category)(a, b);
    };
  }
  return (a: any, b: any) => {
    if (MANUAL_ORDER_CATEGORIES.includes(category)) {
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

function groupRank(c: string) {
  const i = ALL_GROUP_ORDER.indexOf(c);
  return i === -1 ? ALL_GROUP_ORDER.length : i;
}
