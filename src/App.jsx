import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Favorites } from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Details from "./pages/Details/Details.jsx";
import "./i18n";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<Details />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route
              path="*"
              element={
                <div className="font-mono text-center text-red-500 font-bold mt-10">
                  Página no encontrada
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
