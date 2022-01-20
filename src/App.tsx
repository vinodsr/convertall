import "./App.css";
import Header from "@src/Components/Header/Header";
import ConverterMainWithSnack from "@src/Pages/ConverterMain";
import Footer from "@src/Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { AppThemeProvider } from "@src/Providers/AppTheme.Providers";
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
