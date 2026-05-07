import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SkinCustomizer from "../../components/SkinCustomizer/SkinCustomizer";
import SkinPreview from "../../components/SkinPreview/SkinPreview";
import ARBanner from "../../components/ARBanner/ARBanner";
import Alex from "../../assets/icons/alex_head.png";

const CreateSkin = () => {
  const { t } = useTranslation();
  const [currentSkin, setCurrentSkin] = useState({
    playerName: "",
    skinColor: "#FFD6A5",
    hairColor: "#5E3A1B",
    height: 50,
  });
  return (
    <div className="bg-gradient-to-r from-[#064E3B] via-[#0F766E] to-[#083344] min-h-screen w-full">
      <div className="max-w-7xl mx-auto p-4 md:p-8 ">
        <h1
          className=" text-4xl md:text-5xl font-black mb-8 text-[#000000] uppercase flex items-center gap-4"
          style={{ textShadow: "none" }}
        >
          <img src={Alex} alt="Alex" className="w-10 h-10 pixelated" />
          {t("skin_creator")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          <div className="md:col-span-1">
            <SkinPreview
              currentSkin={currentSkin}
              onUpdateSkin={setCurrentSkin}
            />
          </div>

          <div className="md:col-span-2">
            <SkinCustomizer
              currentSkin={currentSkin}
              onUpdateSkin={setCurrentSkin}
            />
          </div>
        </div>
        <div className="mt-12">
          <ARBanner currentSkin={currentSkin} />
        </div>
      </div>
    </div>
  );
};

export default CreateSkin;
