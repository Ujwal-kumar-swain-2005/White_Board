import { createContext, useState, useEffect} from "react";
import type { ReactNode } from "react";
type Theme = {
  backgroundColor: string;
  secondaryColor: string;
  color: string;
};
const themes: Record<"dark" | "light", Theme> = {
  dark: {
    backgroundColor: "#15171A",
    secondaryColor: "#E2E6EA",
    color: "#222",
  },
  light: {
    backgroundColor: "#E2E6EA",
    secondaryColor: "#1d2125bd",
    color: "#f2f2f2",
  },
};
type ThemeContextType = {
  dark: boolean;
  theme: Theme;
  toggle: () => void;
};
const initialState: ThemeContextType = {
  dark: true,
  theme: themes.dark,
  toggle: () => {},
};
export const ThemeContext = createContext<ThemeContextType>(initialState);
type ThemeProviderProps = {
  children: ReactNode;
};
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [dark, setDark] = useState<boolean>(true);
  useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true";
    setDark(isDark);
  }, []);
  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem("dark", JSON.stringify(isDark));
    setDark(isDark);
  };

  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
