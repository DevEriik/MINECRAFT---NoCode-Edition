import React from "react";
import GiftPico from "../../assets/ContructionPico/picoPicando.gif";
import { useTranslation } from "react-i18next";
const Construction = () => {
  const { t } = useTranslation();
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
        {t("thisPage")}
        <br />
        <span className="text-5xl text-[#4d924c] tracking-tighter">
          {t("underCons")}
        </span>
      </h2>

      <p className="text-sm text-[#1f2937] mt-6 font-bold">
        {t("disculpOne")}
        <br />
        {t("disculpTwo")}
      </p>
    </div>
  );
};

export default Construction;
