
import { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "./colors";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  colors: typeof lightColors;
  isDark: boolean;
  mode: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    systemScheme === "dark" ? "dark" : "light"
  );

  const isDark = mode === "dark";

  const toggleTheme = () => {
    setMode(prev => (prev === "dark" ? "light" : "dark"));
  };

  const value = useMemo(
    () => ({
      mode,
      isDark,
      toggleTheme,
      colors: isDark ? darkColors : lightColors,
    }),
    [mode, isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
