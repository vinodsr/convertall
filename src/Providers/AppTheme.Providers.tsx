import { ThemeContext } from "../Contexts/Theme.Context";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { getTheme } from "@src/Themes";

/**
 * App Theme provider for main app
 *
 * @export
 * @param {{ children: any }} props
 * @return {*}
 */
export function AppThemeProvider(props: { children: any }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Getting dark mode from localstorage
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true" ? true : false || false;
  });

  const [theme, setTheme] = useState(() => {
    //Getting theme from storage
    const currentTheme = localStorage.getItem("theme") || "Default";
    return currentTheme || "Default";
  });

  const setDarkTheme = (active: boolean) => {
    setDarkMode(active);
  };

  const updateTheme = (theme: string) => {
    setTheme(theme);
  };

  useEffect(() => {
    // storing darkmode
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  useEffect(() => {
    // setting the theme in local storage
    localStorage.setItem("theme", theme || "Default");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        setDarkTheme,
        darkTheme: darkMode,
        updateTheme,
        theme,
      }}
    >
      <ThemeProvider theme={getTheme(theme)(darkMode)}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
