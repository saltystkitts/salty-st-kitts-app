import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { installNativeApiBridge } from "./lib/nativeApi";

// Point relative /api calls at the live backend when running as a native app.
// Must run before any component mounts.
installNativeApiBridge();

if (!window.location.hash) {
  window.location.hash = "#/";
}

createRoot(document.getElementById("root")!).render(<App />);
