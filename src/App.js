

import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TampilanHome from "./tampilan/TampilanHome";
import TampilanGrafik from "./tampilan/TampilanGrafik";
import TampilanHari from "./tampilan/TampilanHari";
import NavbarPage from "./tampilan/NavbarPage";
import TampilanSekitar from "./tampilan/TampilanSekitar";
import TampilanGrafikSekitarKandangSapi from "./tampilan/TampilanGrafikSekitarKandangSapi";
import TampilanHariSekitar from "./tampilan/TampilanHariSekitar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarPage />
        <Routes>
          <Route path="/" element={<TampilanHome />} />
          <Route path="/home" element={<TampilanHome />} />
          <Route path="/sekitar" element={<TampilanSekitar />} />
          <Route path="/tampilangrafik" element={<TampilanGrafik />} />
          <Route path="/tampilangrafik2" element={<TampilanGrafikSekitarKandangSapi />} />
          <Route path="/tampilanhari" element={<TampilanHari />} />
          <Route path="/tampilanhari2" element={<TampilanHariSekitar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;