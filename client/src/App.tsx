import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppHeader } from "./components/AppHeader";
import { BottomNav, type AppTab } from "./components/BottomNav";
import { UnlockProvider, useUnlock } from "./context/UnlockContext";
import UnlockScreen from "./components/UnlockScreen";
import TourApp from "./pages/TourApp";
import TheSaltPage from "./pages/TheSaltPage";
import WeatherPage from "./pages/WeatherPage";
import FerryPage from "./pages/FerryPage";
import ActionTingsPage from "./pages/ActionTingsPage";
import HolidaysPage from "./pages/HolidaysPage";
import ExploreByAreaPage from "./pages/ExploreByAreaPage";
import TaxiPage from "./pages/TaxiPage";
import AdminPage from "./pages/AdminPage";

// Pages that are free for everyone
const FREE_TABS: AppTab[] = ["map", "salt"];

function MainApp() {
  const { unlocked } = useUnlock();
  const [tab, setTab] = useState<AppTab>("map");
  const [adminMode, setAdminMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  // Show paywall on first visit if not unlocked
  useEffect(() => {
    const seen = localStorage.getItem("salty_seen_paywall");
    if (!unlocked && !seen) {
      setShowPaywall(true);
    }
  }, [unlocked]);

  // If user unlocked, hide paywall
  useEffect(() => {
    if (unlocked) setShowPaywall(false);
  }, [unlocked]);

  function handleLogoTap() {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 5) {
      setAdminMode(true);
      setTapCount(0);
    }
    setTimeout(() => setTapCount(0), 3000);
  }

  // When a locked tab is tapped, show paywall instead
  function handleTabChange(newTab: AppTab) {
    if (!unlocked && !FREE_TABS.includes(newTab)) {
      setShowPaywall(true);
      return;
    }
    setTab(newTab);
  }

  if (adminMode) {
    return (
      <div className="flex flex-col h-[100dvh] bg-background overflow-hidden">
        <div className="px-4 py-2 border-b border-border shrink-0 flex items-center justify-between bg-background">
          <span className="text-xs text-muted-foreground">Admin Mode</span>
          <button onClick={() => setAdminMode(false)} className="text-xs font-bold" style={{ color: "#1AAFCC" }}>← Back to App</button>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <AdminPage />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-background overflow-hidden">
      {/* Paywall overlay */}
      {showPaywall && !unlocked && (
        <UnlockScreen onDismiss={() => {
          localStorage.setItem("salty_seen_paywall", "true");
          setShowPaywall(false);
        }} />
      )}

      <div onClick={handleLogoTap}>
        <AppHeader />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {/* Free tabs — always available */}
        {tab === "map"  && <TourApp paywalled={!unlocked} onUpgrade={() => setShowPaywall(true)} />}
        {tab === "salt" && <TheSaltPage />}

        {/* Paid tabs — only render if unlocked */}
        {unlocked && tab === "actiontings"  && <ActionTingsPage />}
        {unlocked && tab === "weather"      && <WeatherPage />}
        {unlocked && tab === "ferry"        && <FerryPage />}
        {unlocked && tab === "holidays"     && <HolidaysPage />}
        {unlocked && tab === "explore-area" && <ExploreByAreaPage />}
        {unlocked && tab === "taxi"         && <TaxiPage />}
      </div>

      <BottomNav active={tab} onChange={handleTabChange} unlocked={unlocked} onUpgrade={() => setShowPaywall(true)} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UnlockProvider>
          <MainApp />
          <Toaster />
        </UnlockProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
