import { ThemeContext } from "../contexts/Theme.Context";
import { useState } from "react";
import { createAppTheme } from "@src/themes/DefaultTheme";
import { ThemeProvider } from "@mui/material";

export function AppThemeProvider(props: { children: any }) {
  const [darkMode, setDarkMode] = useState(false);
  const setDarkTheme = (active: boolean) => {
    setDarkMode(active);
  };
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
