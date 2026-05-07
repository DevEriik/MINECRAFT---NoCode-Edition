import React from "react";
import { useTranslation } from "react-i18next";

const HeightSlider = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h3
        className="text-lg font-bold mb-4 flex items-center gap-2 text-[#000000]"
        style={{ textShadow: "none" }}
      >
        <span>🧍</span> {t("character_height")}
      </h3>

      <div className="relative flex items-center py-4">
        <input
          type="range"
          min="20"
          max="100"
          value={value || 50}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-4 bg-[#e5e7eb] border-[#000000] appearance-none cursor-pointer accent-[#4d924c] rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <div className="flex justify-between text-sm font-bold text-[#9ca3af] mt-1">
        <span className={value < 40 ? "text-black" : ""}>{t("short")}</span>
        <span className={value >= 40 && value <= 70 ? "text-[#4d924c]" : ""}>
          {t("medium", "Medio")}
        </span>
        <span className={value > 70 ? "text-black" : ""}> {t("tall", "Alto")} </span>
      </div>
    </div>
  );
};

export default HeightSlider;
