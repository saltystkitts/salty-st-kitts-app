import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { installNativeApiBridge, loadOfflineSnapshot } from "./lib/nativeApi";

// Native app: point /api calls at the live backend, with offline fallback.
// Must run before any component mounts.
installNativeApiBridge();

if (!window.location.hash) {
  window.location.hash = "#/";
}

loadOfflineSnapshot().finally(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
