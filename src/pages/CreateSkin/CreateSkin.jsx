import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SkinCustomizer from "../../components/SkinCustomizer/SkinCustomizer";
import SkinPreview from "../../components/SkinPreview/SkinPreview";
import ARBanner from "../../components/ARBanner/ARBanner";
import Alex from "../../assets/icons/alex_head.png";
import Construction from "../../components/Construction/Construction";

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
        <Construction />
      </div>
    </div>
    // <div className="bg-gradient-to-r from-[#064E3B] via-[#0F766E] to-[#083344] min-h-screen w-full">
    //   <div className="max-w-7xl mx-auto p-4 md:p-8 ">
    //     <h2
    //       className=" text-4xl md:text-5xl font-black text-white uppercase tracking-widest drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-4"
    //       style={{ textShadow: "none" }}
    //     >
    //       <img
    //         src={Alex}
    //         alt="Alex"
    //         className="w-10 h-10 md:w-12 md:h-12 object-contain"
    //         style={{ imageRendering: "pixelated" }}
    //       />
    //       {t("skin_creator")}
    //     </h2>
    //     <hr className="mt-6 border-t-4 border-black opacity-50" />

    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-16">
    //       <div className="md:col-span-1">
    //         <SkinPreview
    //           currentSkin={currentSkin}
    //           onUpdateSkin={setCurrentSkin}
    //         />
    //       </div>

    //       <div className="md:col-span-2">
    //         <SkinCustomizer
    //           currentSkin={currentSkin}
    //           onUpdateSkin={setCurrentSkin}
    //         />
    //       </div>
    //     </div>
    //     <div className="mt-12">
    //       <ARBanner currentSkin={currentSkin} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default CreateSkin;
