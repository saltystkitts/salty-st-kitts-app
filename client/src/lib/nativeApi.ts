import { Capacitor } from "@capacitor/core";

/**
 * In the native iOS/Android app the webview is served from capacitor://localhost,
 * so relative API calls like fetch("/api/stops") have no server to hit.
 *
 * This rewrites any relative /api/* request to the live Railway backend so the
 * exact same frontend code works in the browser AND in the native app with no
 * per-call changes.
 */
export const API_ORIGIN = "https://salty-st-kitts-app-production.up.railway.app";

export function installNativeApiBridge() {
  if (!Capacitor.isNativePlatform()) return;

  const originalFetch = window.fetch.bind(window);

  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      if (typeof input === "string" && input.startsWith("/api")) {
        return originalFetch(API_ORIGIN + input, init);
      }
      if (input instanceof Request && input.url.startsWith("/api")) {
        return originalFetch(new Request(API_ORIGIN + input.url, input), init);
      }
      if (input instanceof URL && input.pathname.startsWith("/api") && input.origin === window.location.origin) {
        return originalFetch(API_ORIGIN + input.pathname + input.search, init);
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

/** Turn a stored image path (e.g. /api/images/12) into a URL that works in the browser and the native app. */
export function imgSrc(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("/") && Capacitor.isNativePlatform()) return API_ORIGIN + url;
  return url;
}
