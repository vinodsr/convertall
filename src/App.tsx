import "./App.css";
import Header from "@src/Components/Header/Header";
import ConverterMainWithSnack from "@src/Pages/ConverterMain";
import Footer from "@src/Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { AppThemeProvider } from "@src/Providers/AppTheme.Providers";
import { AboutPage } from "./Pages/About";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";

// supress logs for any env other than dev
if (process.env.NODE_ENV !== "development") {
  console.log =
    console.info =
    console.debug =
    console.dir =
    console.timeEnd =
      () => {};
}

/**
 * Main App
 *
 */
export default function App() {
  return (
    <Box>
      <AppThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Header></Header>
         
            <Routes>
              <Route path="/" element={<ConverterMainWithSnack />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          
          <Footer></Footer>
        </SnackbarProvider>
      </AppThemeProvider>
    </Box>
  );
}
