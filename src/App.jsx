import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main>
        <Routes>
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
