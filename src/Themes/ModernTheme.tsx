import { createTheme } from "@mui/material/styles";
import { green, yellow } from "@mui/material/colors";

/**
 * Modern theme
 * @param darkmode
 * @returns
 */
export const createAppTheme = (darkmode: boolean) =>
  createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",

      primary: {
        main: yellow[900],
      },
      secondary: {
        main: green[500],
      },
    },
  });
