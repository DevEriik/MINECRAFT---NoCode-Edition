import React from "react";
import { QRCodeSVG } from "qrcode.react";
import grassBlock from "../../assets/icons/grass_block.png";
import { useTranslation } from "react-i18next";

const ARBanner = ({ currentSkin }) => {
  const baseUrl = `${window.location.origin}/ar-view`;

  const queryParams = new URLSearchParams({
    skinColor: currentSkin.skinColor || "#FFD6A5",
    hairColor: currentSkin.hairColor || "#5E3A1B",
    height: currentSkin.height || 50,
    topId: currentSkin.topId || "",
    bottomId: currentSkin.bottomId || "",
    shoesId: currentSkin.shoesId || "",
  }).toString();

  const qrUrl = `${baseUrl}?${queryParams}`;

  const qrColorGreen = "#5A9144";
  const qrColorBlue = "#D0E7E8";

  const creeperSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><rect width="8" height="8" fill="#D0E7E8"/><rect x="1" y="1" width="2" height="2" fill="#5A9144"/><rect x="5" y="1" width="2" height="2" fill="#5A9144"/><rect x="3" y="3" width="2" height="2" fill="#5A9144"/><rect x="2" y="4" width="1" height="2" fill="#5A9144"/><rect x="5" y="4" width="1" height="2" fill="#5A9144"/></svg>`;
  const creeperIcon = `data:image/svg+xml;utf8,${encodeURIComponent(creeperSvg)}`;
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#ffffff] p-6 lg:p-8 border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-center gap-8 justify-between">
      <div className="flex-1 flex items-start gap-4">
        <img
          src={grassBlock}
          alt="Grass Block"
          className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
        <div>
          <h2
            className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter mb-2 leading-none"
            style={{ textShadow: "none" }}
          >
            {t("ar_title")}
          </h2>
          <p className="text-gray-700 font-bold text-sm md:text-base leading-tight">
            Escaneá el código QR con tu celular para ver tu personaje en 3D en
            el mundo real.
          </p>
        </div>
      </div>

      <div className="flex-[1.5] flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#f8f9fa] p-4 border-4 border-dashed border-[#9ca3af]">
        <div className="p-3 bg-[#D0E7E8] border-4 border-[#000000] shrink-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
          <QRCodeSVG
            value={qrUrl}
            size={160}
            level={"H"}
            bgColor={qrColorBlue}
            fgColor={qrColorGreen}
            imageSettings={{
              src: creeperIcon,
              x: undefined,
              y: undefined,
              height: 48,
              width: 48,
              excavate: true,
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="bg-[#4d924c] text-white font-black border-2 border-black w-6 h-6 flex items-center justify-center text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 mt-0.5">
              1
            </span>
            <span className="text-black font-bold text-sm tracking-tight">
              Escaneá este código con tu cámara.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-[#4d924c] text-white font-black border-2 border-black w-6 h-6 flex items-center justify-center text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 mt-0.5">
              2
            </span>
            <span className="text-black font-bold text-sm tracking-tight">
              Tu skin aparecerá en 3D.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-[#4d924c] text-white font-black border-2 border-black w-6 h-6 flex items-center justify-center text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 mt-0.5">
              3
            </span>
            <span className="text-black font-bold text-sm tracking-tight">
              Mové tu celular para verlo desde todos los ángulos.
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 hidden xl:flex justify-end">
        <div className="w-[280px] h-[140px] bg-gray-800 rounded-[2rem] border-[6px] border-black relative overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute left-3 w-4 h-16 bg-black rounded-r-xl"></div>
          <span className="text-white font-black tracking-widest opacity-30 text-xl">
            AR VIEW
          </span>
          <span className="absolute top-3 right-5 border-2 border-white text-white font-bold text-[10px] px-1.5 rounded-md">
            AR
          </span>
        </div>
      </div>
    </div>
  );
};

export default ARBanner;
