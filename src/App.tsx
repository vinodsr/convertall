import "./App.css";
import Header from "@src/components/Header/Header";
import ConverterMainWithSnack from "@src/pages/ConverterMain";
import Footer from "@src/components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { AppThemeProvider } from "@src/providers/AppTheme.Providers";
//console.log = () => {};

/**
 * Main App
 *
 */
export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <AppThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Header></Header>
          <div>
            <Routes>
              <Route path="/" element={<ConverterMainWithSnack />} />
              <Route
                path="/about"
                element={
                  <div style={{ marginTop: 10, minHeight: "85vh" }}>
                    <h1>About ?</h1>
                  </div>
                }
              />
            </Routes>
          </div>
          <Footer></Footer>
        </SnackbarProvider>
      </AppThemeProvider>
    </div>
  );
}
