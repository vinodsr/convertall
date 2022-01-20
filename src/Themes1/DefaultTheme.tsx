import { createTheme } from "@mui/material/styles";
//import { green, red } from "@mui/material/colors";

export const createAppTheme = (darkmode: boolean) =>
  createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",

      // primary: {
      //   main: red[500],
      // },
      // secondary: {
      //   main: green[500],
      // },
    },
  });
