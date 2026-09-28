// Home base for list ordering: Frigate Bay
export const FRIGATE_BAY = { lat: 17.2855, lng: -62.686 };

export function kmFromFrigate(lat: number, lng: number): number {
  const R = 6371, toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat - FRIGATE_BAY.lat), dLng = toRad(lng - FRIGATE_BAY.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(FRIGATE_BAY.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function byDistanceFromFrigate<T extends { lat: number; lng: number }>(a: T, b: T) {
  return kmFromFrigate(a.lat, a.lng) - kmFromFrigate(b.lat, b.lng);
}
