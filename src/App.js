// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Login from "./auth/Login.js";
import Register from "./auth/Register.js";
import NavbarPage from "./tampilan/NavbarPage";
import TampilanGrafik from "./tampilan/TampilanGrafik";
import TampilanGrafikSekitarKandangSapi from "./tampilan/TampilanGrafikSekitarKandangSapi";
import TampilanHari from "./tampilan/TampilanHari";
import TampilanHariSekitar from "./tampilan/TampilanHariSekitar";
import TampilanHome from "./tampilan/TampilanHome";
import TampilanSekitar from "./tampilan/TampilanSekitar";

function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NavbarPage  />
                <Routes>
                  <Route
                    path="/"
                    element={<Login  />}
                  />
                  <Route path="/home" element={<TampilanHome />} />
                  <Route path="/sekitar" element={<TampilanSekitar />} />
                  <Route path="/tampilangrafik" element={<TampilanGrafik />} />
                  <Route
                    path="/tampilangrafik2"
                    element={<TampilanGrafikSekitarKandangSapi />}
                  />
                  <Route path="/tampilanhari" element={<TampilanHari />} />
                  <Route
                    path="/tampilanhari2"
                    element={<TampilanHariSekitar />}
                  />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
