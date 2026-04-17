import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppHeader } from "./components/AppHeader";
import { BottomNav, type AppTab } from "./components/BottomNav";
import TourApp from "./pages/TourApp";
import TheSaltPage from "./pages/TheSaltPage";
import WeatherPage from "./pages/WeatherPage";
import FerryPage from "./pages/FerryPage";
import ActionTingsPage from "./pages/ActionTingsPage";
import HolidaysPage from "./pages/HolidaysPage";
import AdminPage from "./pages/AdminPage";

function MainApp() {
  const [tab, setTab] = useState<AppTab>("map");
  const [adminMode, setAdminMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  function handleLogoTap() {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 5) {
      setAdminMode(true);
      setTapCount(0);
    }
    setTimeout(() => setTapCount(0), 3000);
  }

  if (adminMode) {
    return (
      <div className="flex flex-col h-[100dvh] bg-background overflow-hidden">
        <div className="px-4 py-2 border-b border-border shrink-0 flex items-center justify-between bg-background">
          <span className="text-xs text-muted-foreground">Admin Mode</span>
          <button onClick={() => setAdminMode(false)} className="text-xs font-bold" style={{ color: "#1AAFCC" }}>← Back to App</button>
        </div>
        <div className="flex-1 overflow-hidden">
          <AdminPage />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-background overflow-hidden">
      <div onClick={handleLogoTap}>
        <AppHeader />
      </div>
      <div className="flex-1 overflow-hidden">
        {tab === "map"          && <TourApp />}
        {tab === "actiontings"  && <ActionTingsPage />}
        {tab === "salt"         && <TheSaltPage />}
        {tab === "weather"      && <WeatherPage />}
        {tab === "ferry"        && <FerryPage />}
        {tab === "holidays"     && <HolidaysPage />}
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainApp />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
