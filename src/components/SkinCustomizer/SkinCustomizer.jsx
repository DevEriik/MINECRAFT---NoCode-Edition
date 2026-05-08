import React from "react";
import { useTranslation } from "react-i18next";
import ColorPalette from "./ColorPalette";
import HeightSlider from "./HeightSlider";
import WardrobeGrid from "./WardrobeGrid";
import top_naranja from "../../assets/Ropa/PartesArriba/parteArribaNaranja.png";
import top_rojo from "../../assets/Ropa/PartesArriba/ArribarojaConNegro.png";
import top_azul from "../../assets/Ropa/PartesArriba/ArribaSheanAzul.png";
import top_negro from "../../assets/Ropa/PartesArriba/ArribaCalabera.png";
import mid_naranja from "../../assets/Ropa/Pantalones/pantalonNaranja.png";
import mid_rojo from "../../assets/Ropa/Pantalones/pantalonShean.png";
import mid_azul from "../../assets/Ropa/Pantalones/pantalonMoztasa.png";
import mid_negro from "../../assets/Ropa/Pantalones/pantalonesCalabera.png";
import zap_naranja from "../../assets/Ropa/Zapatillas/zapatillasNaranja.png";
import zap_roja from "../../assets/Ropa/Zapatillas/zapatillasRojas.png";
import zap_azul from "../../assets/Ropa/Zapatillas/zapatillasNegras.png";
import zap_negra from "../../assets/Ropa/Zapatillas/zapatillasNegrasCalabera.png";

const SKIN_COLORS = ["#FFD6A5", "#F5C293", "#D2A679", "#8D5524", "#4A3018"];
const HAIR_COLORS = ["#F4C753", "#D26015", "#5E3A1B", "#1f1f1f", "#f0f0f0"];

export const TOPS = [
  { id: "top_1", name: "Naranja", image: top_naranja },
  { id: "top_2", name: "Rojo", image: top_rojo },
  { id: "top_3", name: "Azul", image: top_azul },
  { id: "top_4", name: "Negro", image: top_negro },
];

export const BOTTOMS = [
  { id: "mid_1", name: "Naranja", image: mid_naranja },
  { id: "mid_2", name: "Rojo", image: mid_rojo },
  { id: "mid_3", name: "Azul", image: mid_azul },
  { id: "mid_4", name: "Negro", image: mid_negro },
];

export const SHOES = [
  { id: "zap_1", name: "Naranja", image: zap_naranja },
  { id: "zap_2", name: "Rojo", image: zap_roja },
  { id: "zap_3", name: "Azul", image: zap_azul },
  { id: "zap_4", name: "Negro", image: zap_negra },
];

const SkinCustomizer = ({ currentSkin, onUpdateSkin }) => {
  const { t } = useTranslation();
  const handleChange = (attribute, value) => {
    onUpdateSkin((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };
  return (
    <div className="flex flex-col bg-[#ffffff] border border-gray-200 shadow-sm w-full rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 border-b border-gray-200">
        <ColorPalette
          title={t("skin_color")}
          colors={SKIN_COLORS}
          selectedColor={currentSkin?.skinColor}
          onColorSelect={(color) => handleChange("skinColor", color)}
        />
        <ColorPalette
          title={t("hair_color")}
          colors={HAIR_COLORS}
          selectedColor={currentSkin?.hairColor}
          onColorSelect={(color) => handleChange("hairColor", color)}
        />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 p-6 border-b md:border-b-0 lg:border-r border-gray-200">
          <HeightSlider
            value={currentSkin?.height}
            onChange={(val) => handleChange("height", val)}
          />
        </div>

        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <WardrobeGrid
              title={t("top_part")}
              items={TOPS}
              selectedId={currentSkin?.topId}
              onSelect={(id) => handleChange("topId", id)}
            />
          </div>

          <div className="p-6 border-b border-gray-200">
            <WardrobeGrid
              title={t("bottom_part")}
              items={BOTTOMS}
              selectedId={currentSkin?.bottomId}
              onSelect={(id) => handleChange("bottomId", id)}
            />
          </div>

          <div className="p-6">
            <WardrobeGrid
              title={t("footwear")}
              items={SHOES}
              selectedId={currentSkin?.shoesId}
              onSelect={(id) => handleChange("shoesId", id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinCustomizer;
