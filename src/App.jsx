import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main>
        <Routes>
          <Route
            path="/"
            element={<div>Componente en construccion</div>}
          ></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
