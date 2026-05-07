import React from "react";
import GiftPico from "../../assets/ContructionPico/picoPicando.gif";

const Construction = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <img
        src={GiftPico}
        alt="Sección en Construcción"
        className="w-full max-w-[250px] mx-auto mb-8 pixelated object-contain h-auto drop-shadow-md"
      />

      <h2
        className="text-4xl font-black uppercase text-[#000000] tracking-tight"
        style={{ textShadow: "none" }}
      >
        Esta página está
        <br />
        <span className="text-5xl text-[#4d924c] tracking-tighter">
          En Construcción
        </span>
      </h2>

      <p className="text-sm text-[#1f2937] mt-6 font-bold">
        Disculpá las molestias, estamos picando código.
        <br />
        ¡Volvé en la próxima versión de la snapshot!
      </p>
    </div>
  );
};

export default Construction;
