import React, { useRef } from "react";
import { toPng } from "html-to-image";
import { useTranslation } from "react-i18next";

import SkinRender from "../SkinRender/SkinRender";
import paisajeFondo from "../../assets/fondos/fondo.png";

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

  return (
    <div className="bg-[#ffffff] border-4 border-[#000000] p-6 flex flex-col min-h-[950px] min-w-[50px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg">
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
        <SkinRender currentSkin={currentSkin} />
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
