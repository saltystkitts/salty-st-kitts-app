import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import saltyLogo from "@assets/salty-logo.jpg";

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card shrink-0">
      <div className="flex items-center gap-3">
        <img
          src={saltyLogo}
          alt="Salty St Kitts"
          className="h-10 w-auto object-contain"
        />
        <div>
          <div
            className="font-extrabold text-base leading-tight text-foreground tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
          >
            Salty St Kitts
          </div>
          <div className="text-[10px] leading-tight uppercase tracking-widest font-semibold" style={{ color: "#1AAFCC" }}>
            The Guide · saltystkitts.com
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        data-testid="theme-toggle"
        className="w-9 h-9"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
    </header>
  );
}
