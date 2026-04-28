import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import creeperGif from "../../assets/NotFounCreeper/creeper-explotandov2.gif";

const NotFound = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1120] text-gray-200 text-center px-4">
        <div className="text-9xl mb-6 drop-shadow-lg">
          <img
            src={creeperGif}
            alt="Creeper explotando"
            className="w-48 md:w-64 mb-8 drop-shadow-2xl"
          />
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-green-500 mb-2 tracking-widest drop-shadow-lg">
          404
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-400 mb-10">
          {t("errorText")}
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-[#c6c6c6] text-[#333333] font-mono font-bold uppercase tracking-widest 
               border-4 border-t-white border-l-white border-b-[#555555] border-r-[#555555] 
               hover:bg-[#8bb158] hover:text-white hover:border-t-[#a4c973] hover:border-l-[#a4c973] hover:border-b-[#5c7a36] hover:border-r-[#5c7a36] 
               active:border-t-[#555555] active:border-l-[#555555] active:border-b-white active:border-r-white"
        >
          {t("buttonError")}
        </Link>
      </div>
    </>
  );
};

export default NotFound;
