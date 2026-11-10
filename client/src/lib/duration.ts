// Hide visit-time on categories where it doesn't make sense, or when empty
export function showDuration(stop: { duration?: string | null; category?: string | null }): boolean {
  if (!stop.duration || !stop.duration.trim()) return false;
  return !["beach", "food_nightlife"].includes(stop.category ?? "");
}
