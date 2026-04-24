import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from './pages/Home/Home.jsx'

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          ></Route>
          <Route path="/" element={<div>Pagina Home</div>} />
          <Route path="/item/:id" element={<div>Pagina detalle</div>} />
          <Route path="/favoritos" element={<div>Pagina favoritos</div>} />
          <Route path="*" element={<div>Pagina ERROR</div>} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

