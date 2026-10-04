import { Capacitor } from "@capacitor/core";

/**
 * Native app (iOS/Android):
 *  - relative /api/* calls go to the live Railway backend
 *  - public GET content is saved on the phone every time it loads, and when
 *    there's no signal the app falls back to that saved copy, then to the
 *    snapshot packed into the app at build time. So it works fully offline.
 *  - photos come from the copies packed into the app.
 */
export const API_ORIGIN = "https://salty-st-kitts-app-production.up.railway.app";

type Snapshot = { generatedAt: string | null; responses: Record<string, string>; images: Record<string, string> };
let snapshot: Snapshot = { generatedAt: null, responses: {}, images: {} };

const CACHE_PREFIX = "salty_off:";
const NETWORK_TIMEOUT_MS = 6000;

function isCacheable(path: string, method: string) {
  return method === "GET" && path.startsWith("/api/") && !path.startsWith("/api/admin") && !path.startsWith("/api/images");
}

function jsonResponse(text: string) {
  return new Response(text, { status: 200, headers: { "Content-Type": "application/json", "X-Salty-Offline": "1" } });
}

function offlineCopy(path: string): string | null {
  const packed = snapshot.responses[path] ?? null;
  try {
    const saved = localStorage.getItem(CACHE_PREFIX + path);
    const savedAt = localStorage.getItem(CACHE_PREFIX + "@" + path);
    // Use whichever copy is newer: the one saved on the phone, or the one packed into this build
    if (saved && (!packed || !snapshot.generatedAt || (savedAt && savedAt > snapshot.generatedAt))) return saved;
  } catch {}
  return packed;
}

/** Load the packed-in snapshot. Call (and await) before the app renders. */
export async function loadOfflineSnapshot() {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const mod = await import("../offline/snapshot.json");
    snapshot = (mod as any).default ?? (mod as any);
  } catch {}
}

export function installNativeApiBridge() {
  if (!Capacitor.isNativePlatform()) return;

  const originalFetch = window.fetch.bind(window);

  async function cachedFetch(path: string, init?: RequestInit): Promise<Response> {
    const fallback = offlineCopy(path);
    if (!navigator.onLine && fallback) return jsonResponse(fallback);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), NETWORK_TIMEOUT_MS);
    try {
      const res = await originalFetch(API_ORIGIN + path, { ...init, signal: init?.signal ?? ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const text = await res.clone().text();
        try {
          localStorage.setItem(CACHE_PREFIX + path, text);
          localStorage.setItem(CACHE_PREFIX + "@" + path, new Date().toISOString());
        } catch {}
        return res;
      }
      if (fallback && res.status >= 500) return jsonResponse(fallback);
      return res;
    } catch (err) {
      clearTimeout(timer);
      if (fallback) return jsonResponse(fallback);
      throw err;
    }
  }

  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      let path: string | null = null;
      let method = (init?.method || "GET").toUpperCase();
      if (typeof input === "string" && input.startsWith("/api")) path = input;
      else if (input instanceof URL && input.pathname.startsWith("/api") && input.origin === window.location.origin) path = input.pathname + input.search;
      else if (input instanceof Request && input.url.startsWith("/api")) { path = input.url; method = input.method.toUpperCase(); }

      if (path) {
        if (isCacheable(path, method)) return cachedFetch(path, init);
        if (input instanceof Request) return originalFetch(new Request(API_ORIGIN + path, input), init);
        return originalFetch(API_ORIGIN + path, init);
      }
    } catch {
      // fall through to the original call
    }
    return originalFetch(input as RequestInfo, init);
  };
}

export function isNative() {
  return Capacitor.isNativePlatform();
}

/** Turn a stored image path (e.g. /api/images/12) into a URL that works in the browser and the native app (offline too). */
export function imgSrc(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (Capacitor.isNativePlatform()) {
    const local = snapshot.images[url];
    if (local) return local;
    if (url.startsWith("/")) return API_ORIGIN + url;
  }
  return url;
}
