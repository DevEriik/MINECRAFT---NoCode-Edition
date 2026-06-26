import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Favorites } from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Details from "./pages/Details/Details.jsx";
import CreateSkin from "./pages/CreateSkin/CreateSkin.jsx";
import ARView from "./pages/ARView/ARView.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import AdminPanel from "./pages/AdminPanel/AdminPanel.jsx";
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx";
import "./locals/i18n";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#091F22] w-full">
          <Header />

          <main className="flex-grow w-full ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item/:id" element={<Details />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/crear-skin" element={<CreateSkin />} />
              <Route path="/ar-view" element={<ARView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
