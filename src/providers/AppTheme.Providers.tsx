import { ThemeContext } from "../Contexts/Theme.Context";
import { useEffect, useState } from "react";
import { createAppTheme } from "@src/Themes/DefaultTheme";
import { ThemeProvider } from "@mui/material";

export function AppThemeProvider(props: { children: any }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Getting dark mode from localstorage
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true" ? true : false || false;
  });
  const setDarkTheme = (active: boolean) => {
    setDarkMode(active);
  };

  useEffect(() => {
    // storing darkmode
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);
  return (
    <ThemeContext.Provider
      value={{
        setDarkTheme,
        darkTheme: darkMode,
      }}
    >
      <ThemeProvider theme={createAppTheme(darkMode)}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
