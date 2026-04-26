import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from './pages/Home/Home.jsx'
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "./i18n";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/item/:id" element={<div>Pagina detalle</div>} />
          <Route path="/favoritos" element={<div>Pagina favoritos</div>} />
          <Route path="*" element={<div>Pagina ERROR</div>} />
        </Routes>
      </main>
      {/* <Footer /> */}
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

