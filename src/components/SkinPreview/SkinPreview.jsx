import React, { useRef } from "react";
import { toPng } from "html-to-image";
import { useTranslation } from "react-i18next";
import { TOPS, BOTTOMS, SHOES } from "../SkinCustomizer/SkinCustomizer";

import cabezaImg from "../../assets/skin/cabeza.png";
import peloImg from "../../assets/skin/pelo.png";
import torsoImg from "../../assets/skin/torso.png";
import piernasImg from "../../assets/skin/piernas.png";
import brazoDerecho from "../../assets/skin/brazoDerecho.png";
import brazoIzquierdo from "../../assets/skin/brazoIzquierdo.png";

import paisajeFondo from "../../assets/skin/fondo.png";

const SkinPreview = ({ currentSkin, onUpdateSkin }) => {
  const { t } = useTranslation();
  const previewRef = useRef(null);
  const manejarCambioNombre = (e) => {
    onUpdateSkin((prev) => ({
      ...prev,
      playerName: e.target.value,
    }));
  };

  const descargarSkin = async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${currentSkin.playerName || "mi_skin"}.png`;
      link.click();
    } catch (error) {
      console.error("Error al descargar la skin:", error);
    }
  };


  const selectedTop = TOPS.find((item) => item.id === currentSkin?.topId);
  const selectedBottom = BOTTOMS.find(
    (item) => item.id === currentSkin?.bottomId,
  );
  const selectedShoes = SHOES.find((item) => item.id === currentSkin?.shoesId);

  return (
    <div className="bg-[#ffffff] border-4 border-[#000000] p-6 flex flex-col min-h-[500px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg">
      <h2 className="text-3xl font-bold text-black mb-4 ">{t("preview")}</h2>
      <div className="mb-6">
        <label className="block text-black font-bold text-gray-700 mb-2">
          {t("player_name")}
        </label>
        <div className="flex items-center border-2 border-black rounded p-2 text-black">
          <span>👤</span>
          <input
            type="text"
            value={currentSkin.playerName}
            onChange={manejarCambioNombre}
            placeholder={t("my_player", "MiJugador")}
            className="w-full outline-none"
          />
        </div>
      </div>

      <div
        ref={previewRef}
        className="flex-grow flex items-center justify-center rounded border-2 border-dashed border-gray-500 relative overflow-hidden mb-6"
        style={{
          backgroundImage: `url(${paisajeFondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="flex flex-col items-center transition-all duration-300"
          style={{ transform: `scale(${currentSkin.height / 50})` }}
        >
          <div
            className="relative w-16 h-16 z-30"
            style={{ backgroundColor: currentSkin.skinColor }}
          >
            <img
              src={cabezaImg}
              alt="Cara"
              className="absolute inset-0 w-full h-full z-10"
              style={{ imageRendering: "pixelated" }}
            />
            <div
              className="absolute inset-0 w-full h-full z-40"
              style={{
                backgroundColor: currentSkin.hairColor,
                WebkitMaskImage: `url(${peloImg})`,
                maskImage: `url(${peloImg})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                imageRendering: "pixelated",
              }}
            ></div>
          </div>

          <div className="flex flex-row w-32 h-24 z-20 relative">
            <div
              className="w-8 h-24"
              style={{
                backgroundColor: currentSkin.skinColor,
                WebkitMaskImage: `url(${brazoIzquierdo})`,
                maskImage: `url(${brazoIzquierdo})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                imageRendering: "pixelated",
              }}
            ></div>

            <div
              className="relative w-16 h-24"

              style={{
                backgroundColor: currentSkin.skinColor,
                WebkitMaskImage: `url(${torsoImg})`,
                maskImage: `url(${torsoImg})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                imageRendering: "pixelated",
              }}
            ></div>
            <div
              className="w-8 h-24"
              style={{
                backgroundColor: currentSkin.skinColor,
                WebkitMaskImage: `url(${brazoDerecho})`,
                maskImage: `url(${brazoDerecho})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                imageRendering: "pixelated",
              }}
            ></div>

            {selectedTop && (
              <img
                src={selectedTop.image}
                alt="top"
                className="absolute inset-0 w-full h-full object-contain [image-rendering:pixelated] z-10 origin-top scale-[2.9] -translate-y-[88px] pointer-events-none"
              />
            )}
          </div>

          <div
            className="relative w-16 h-24 z-10"
            style={{
              WebkitMaskImage: `url(${piernasImg})`,
              maskImage: `url(${piernasImg})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              imageRendering: "pixelated",
            }}
          >
            <div
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: currentSkin.skinColor }}
            />

            {selectedBottom && (
              <img
                src={selectedBottom.image}
                alt="bottom"
                className="absolute inset-0 w-full h-full object-contain [image-rendering:pixelated] z-10 origin-top scale-x-[3.4] scale-y-[3.0] -translate-y-[112px] -translate-x-[4px] pointer-events-none"
              />
            )}

            {selectedShoes && (
              <img
                src={selectedShoes.image}
                alt="shoes"
                className="absolute inset-0 w-full h-full object-contain [image-rendering:pixelated] z-20 origin-bottom scale-x-[3.2] scale-y-[3.4] -translate-x-[8px] translate-y-24 pointer-events-none"
              />
            )}
          </div>
        </div>
      </div>

      <button
        onClick={descargarSkin}
        className="w-full bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-4 border-b-4 border-[#3b6631] active:border-b-0 active:translate-y-[4px] rounded flex items-center justify-center gap-2 transition-all uppercase"
      >
        {t("download_skin")}
      </button>
      <p className="text-center text-xs text-gray-500 mt-2">
        {t("download_png_text")}
      </p>
    </div>
  );
};
export default SkinPreview;
