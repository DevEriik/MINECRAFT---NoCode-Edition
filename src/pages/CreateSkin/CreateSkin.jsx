import React, { useState } from "react";
import SkinCustomizer from "../../components/SkinCustomizer/SkinCustomizer";
import imgCreeper from "../../assets/icons/Creeper_Head.png";

const CreateSkin = () => {
  const [currentSkin, setCurrentSkin] = useState({
    skinColor: "#FFD6A5",
    hairColor: "#5E3A1B",
    height: 50,
  });
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1
        className="text-4xl md:text-5xl font-black mb-8 text-[#000000] uppercase flex items-center gap-4"
        style={{ textShadow: "none" }}
      >
        <img src={imgCreeper} alt="Creeper" className="w-10 h-10 pixelated" />
        Crea tu skin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 bg-gradient-to-b from-[#e5f0f9] to-[#d4e5d3] border-4 border-[#000000] p-6 flex flex-col items-center justify-center min-h-[500px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-4 rounded-lg">
          <div className="w-full text-left mb-auto">
            <h2
              className="text-xl font-bold text-black"
              style={{ textShadow: "none" }}
            >
              Vista previa
            </h2>
          </div>

          <p className="text-gray-600 font-bold text-center mt-10 mb-auto">
            [ Espacio para el Ticket de Dani ]<br />
            <br />
            Acá se hace el personaje en 3D/2D
          </p>
        </div>

        <div className="md:col-span-2">
          <SkinCustomizer
            currentSkin={currentSkin}
            onUpdateSkin={setCurrentSkin}
          />
        </div>
      </div>

      <div className="mt-12 bg-[#ffffff] p-6 border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-center justify-between gap-8">
        <p className="text-gray-600 font-bold text-center">
          [ Espacio para el Ticket de Abril ]<br />
          <br />
          Acá se hace el QR con los pasos y demas cosas
        </p>
      </div>
    </div>
  );
};

export default CreateSkin;
