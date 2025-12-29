import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
type Theme = {
  backgroundColor: string;
  secondaryColor: string;
  color: string;
};

type ThemeContextType = {
  theme: Theme;
  dark: boolean;
  toggle: () => void;
};
const themes: { dark: Theme; light: Theme } = {
  dark: {
    backgroundColor: "#15171A",
    secondaryColor: "#E2E6EA",
    color: "#ffffff",
  },
  light: {
    backgroundColor: "#E2E6EA",
    secondaryColor: "#1d2125bd",
    color: "#222222",
  },
};
export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  dark: true,
  toggle: () => {},
});
type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [dark, setDark] = useState<boolean>(true);
  useEffect(() => {
    const savedTheme = localStorage.getItem("dark");
    if (savedTheme !== null) {
      setDark(savedTheme === "true");
    }
  }, []);
  const toggle = () => {
    setDark((prev) => {
      localStorage.setItem("dark", String(!prev));
      return !prev;
    });
  };

  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
