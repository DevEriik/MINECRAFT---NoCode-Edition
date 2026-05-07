import React from "react";
import { useTranslation } from "react-i18next";
import ColorPalette from "./ColorPalette";
import HeightSlider from "./HeightSlider";

const SKIN_COLORS = ["#FFD6A5", "#F5C293", "#D2A679", "#8D5524", "#4A3018"];
const HAIR_COLORS = ["#F4C753", "#D26015", "#5E3A1B", "#1f1f1f", "#f0f0f0"];

const SkinCustomizer = ({ currentSkin, onUpdateSkin }) => {
  const { t } = useTranslation();
  const handleChange = (attribute, value) => {
    onUpdateSkin((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };
  return (
    <div className="flex flex-col gap-8 bg-[#ffffff] p-6 border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ColorPalette
          title={t("skin_color")}
          colors={SKIN_COLORS}
          selectorColor={currentSkin?.skinColor}
          onColorSelect={(color) => handleChange("skinColor", color)}
        />

        <ColorPalette
          title={t("hair_color")}
          colors={HAIR_COLORS}
          selectorColor={currentSkin?.hairColor}
          onColorSelect={(color) => handleChange("hairColor", color)}
        />
      </div>

      <hr className="border-2 border-dashed border-[#9ca3af]" />

      <HeightSlider
        value={currentSkin?.height}
        onChange={(val) => handleChange("height", val)}
      />

      <hr className="border-2 border-dashed border-[#9ca3af]" />

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#000000]">
            {t("top_part")}
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#000000]">
            {t("bottom_part")}
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#000000]">
            {t("footwear")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SkinCustomizer;
