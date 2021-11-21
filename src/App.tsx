import "./App.css";
import Header from "@src/components/Header/Header";
import ConverterMainWithSnack from "@src/pages/ConverterMain";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
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
    </div>
  );
}
