import { createTheme } from "@mui/material/styles";

export const createAppTheme = (darkmode: boolean) =>
  createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",
    },
  });
