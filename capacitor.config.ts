import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.saltystkitts.guide",
  appName: "Salty St Kitts",
  webDir: "dist/public",
  ios: {
    contentInset: "always",
    backgroundColor: "#1C3B5A",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#1C3B5A",
      showSpinner: false,
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#1C3B5A",
    },
  },
};

export default config;
