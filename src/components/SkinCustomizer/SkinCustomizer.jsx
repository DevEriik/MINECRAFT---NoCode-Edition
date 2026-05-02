import React from "react";

const SkinCustomizer = ({ currentSkin, onUpdateSkin }) => {
  return (
    <div className="flex flex-col gap-8 bg-[#ffffff] p-6 border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Seccion de color de piel y pelo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3 flex justify-between items-center text-[#000000]">
            <span>Color de piel</span>
            <span className="text-sm font-normal text-[#9ca3af] border-2 border-[#9ca3af] px-2 py-1">
              #HEX
            </span>
          </h3>
          {/* Cuadraditos */}
          <p className="text-sm text-[#9ca3af] mt-2">
            De mas claro a mas oscuro
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 flex justify-between items-center text-[#000000]">
            <span>Color de pelo</span>
            <span className="text-sm font-normal text-[#9ca3af] border-2 border-[#9ca3af] px-2 py-1">
              #HEX
            </span>
          </h3>
          {/* Aca van los cuadraditos */}
        </div>
      </div>

      <hr className="border-2 border-dashed border-[#9ca3af]" />

      {/* Altura */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#000000]">
          <span>🧍</span> Altura del personaje
        </h3>
        {/* Input range */}
        <div className="flex justify-between text-sm font-bold text-[#9ca3af] mt-2">
          <span>Bajo</span>
          <span className="text-[#4d924c]">Medio</span>
          <span>Alto</span>
        </div>
      </div>

      <hr className="border-2 border-dashed border-[#9ca3af]" />

      {/* Ropero */}

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#000000]">
            Parte superior (atuendo)
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#000000]">
            Parte inferior (pantalones)
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#000000]">Calzado</h3>
        </div>
      </div>
    </div>
  );
};

export default SkinCustomizer;
