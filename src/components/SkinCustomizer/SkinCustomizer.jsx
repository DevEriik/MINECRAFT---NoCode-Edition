import React from "react";
import { useTranslation } from "react-i18next";
import ColorPalette from "./ColorPalette";
import HeightSlider from "./HeightSlider";
import WardrobeGrid from "./WardrobeGrid";
import top_naranja from "../../assets/Ropa/PartesArriba/parteArribaNaranja.png";
import top_rojo from "../../assets/Ropa/PartesArriba/ArribarojaConNegro.png";
import top_azul from "../../assets/Ropa/PartesArriba/ArribaSheanAzul.png";
import top_negro from "../../assets/Ropa/PartesArriba/ArribaCalabera.png";
import mid_naranja from "../../assets/Ropa/Pantalones/PantalonNaranja.png";
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
        <WardrobeGrid
          title={t("top_part")}
          items={TOPS}
          selectedId={currentSkin?.topId}
          onSelect={(id) => handleChange("topId", id)}
        />

        <WardrobeGrid
          title={t("bottom_part")}
          items={BOTTOMS}
          selectedId={currentSkin?.bottomId}
          onSelect={(id) => handleChange("bottomId", id)}
        />

        <WardrobeGrid
          title={t("footwear")}
          items={SHOES}
          selectedId={currentSkin?.shoesId}
          onSelect={(id) => handleChange("shoesId", id)}
        />
      </div>
    </div>
  );
};

export default SkinCustomizer;
