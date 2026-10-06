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
    return byDistanceFromFrigate(a, b);
  };
}
