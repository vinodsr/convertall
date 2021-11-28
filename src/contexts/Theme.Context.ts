import React from "react";

/**
 * Context for theme
 */
export const ThemeContext = React.createContext({
  setDarkTheme: (active: boolean) => {},
  darkTheme: false,
});
