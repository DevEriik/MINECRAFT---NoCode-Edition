import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

import logoImage from "../../assets/logo/logo.svg";
import corazon from "../../assets/corazonRojo/corazon.png";
import iconoHome from "../../assets/icons/grass_block.png";
import iconoSkin from "../../assets/icons/alex_head.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const location = useLocation();

  const updateFavCount = () => {
    const favoritas = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavCount(favoritas.length);
  };

  useEffect(() => {
    updateFavCount();
    window.addEventListener("favoritesUpdated", updateFavCount);
    window.addEventListener("storage", updateFavCount);
    return () => {
      window.removeEventListener("favoritesUpdated", updateFavCount);
      window.removeEventListener("storage", updateFavCount);
    };
  }, []);

  const toggleLanguage = () => {
    const currentLang = i18n.language || "es";
    const newLang = currentLang.startsWith("es") ? "en" : "es";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.headerContainer}>
      {/* 1. CONTENEDOR IZQUIERDO (LOGO) */}
      <div className="flex-1 flex justify-start">
        <Link
          to="/"
          className="flex items-center hover:scale-105 transition-transform duration-200"
        >
          <img
            src={logoImage}
            alt="NoCodeCraft Logo"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          />
        </Link>
      </div>

      <nav className="hidden lg:flex items-center justify-center gap-8">
        {/* LINK HOME */}
        <Link
          to="/"
          className={`group relative flex items-center gap-2 text-lg uppercase tracking-wide cursor-pointer transition-all duration-300 hover:-translate-y-1 pb-2 ${
            location.pathname === "/"
              ? "text-[var(--color-minecraft-grass)] font-black"
              : "text-gray-700 hover:text-[var(--color-minecraft-grass)]"
          }`}
        >
          <img src={iconoHome} className="w-8 h-8" alt="Home" />
          {t("home")}
          <span
            className={`absolute bottom-0 left-0 w-full h-1 bg-[var(--color-minecraft-grass)] transition-transform duration-300 ease-out origin-center ${
              location.pathname === "/"
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </Link>

        {/* LINK FAVORITOS */}
        <Link
          to="/favoritos"
          className={`group relative flex items-center gap-2 text-lg uppercase tracking-wide cursor-pointer transition-all duration-300 hover:-translate-y-1 pb-2 ${
            location.pathname === "/favoritos"
              ? "text-[#ff3333] font-black"
              : "text-gray-700 hover:text-[#ff3333]"
          }`}
        >
          <div className="relative">
            <img
              src={corazon}
              alt="Favoritos"
              className="w-8 h-8 object-contain"
            />
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff3333] text-white text-[10px] font-black border-2 border-black w-5 h-5 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </div>
          {t("favorites")}
          <span
            className={`absolute bottom-0 left-0 w-full h-1 bg-[#ff3333] transition-transform duration-300 ease-out origin-center ${
              location.pathname === "/favoritos"
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </Link>

        {/* LINK SKIN CREATOR */}
        <Link
          to="/skins"
          className={`group relative flex items-center gap-2 text-lg uppercase tracking-wide cursor-pointer transition-all duration-300 hover:-translate-y-1 pb-2 ${
            location.pathname === "/skins"
              ? "text-[var(--color-minecraft-amethyst)] font-black"
              : "text-gray-700 hover:text-[var(--color-minecraft-amethyst)]"
          }`}
        >
          <img src={iconoSkin} className="w-8 h-8" alt="Skins" />
          {t("skin_creator")}
          <span
            className={`absolute bottom-0 left-0 w-full h-1 bg-[var(--color-minecraft-amethyst)] transition-transform duration-300 ease-out origin-center ${
              location.pathname === "/skins"
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </Link>
      </nav>

      {/* MULTI-IDIOMA Y BOTON HAMBURGUESA */}
      <div className="flex-1 flex justify-end items-center">
        <div className="hidden lg:block">
          <button
            onClick={toggleLanguage}
            className="border-4 border-black bg-white text-black px-3 py-1 font-bold text-lg hover:bg-[var(--color-minecraft-grass)] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            {i18n.language === "es" ? "ES / EN" : "EN / ES"}
          </button>
        </div>

        <button
          className="lg:hidden w-12 h-12 flex items-center justify-center border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          onClick={toggleMenu}
        >
          <span className="text-3xl font-black leading-none mb-1">
            {isMenuOpen ? "X" : "☰"}
          </span>
        </button>
      </div>

      {/* MENÚ MOBILE */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className="flex flex-col gap-4">
            {/* MOBILE HOME */}
            <Link
              to="/"
              onClick={toggleMenu}
              className={`relative overflow-hidden ${styles.navItem} transition-all duration-300 py-1 ${
                location.pathname === "/"
                  ? "text-[var(--color-minecraft-grass)] font-black pl-3 bg-gray-100"
                  : "text-gray-700 hover:pl-3"
              }`}
            >
              <span
                className={`absolute left-0 top-0 w-1 h-full bg-[var(--color-minecraft-grass)] transition-transform duration-300 origin-top ${
                  location.pathname === "/" ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <img
                src={iconoHome}
                alt="Home"
                className="w-7 h-7 inline-block mr-2"
              />
              {t("home")}
            </Link>

            {/* MOBILE FAVORITOS */}
            <Link
              to="/favoritos"
              onClick={toggleMenu}
              className={`relative overflow-hidden ${styles.navItem} transition-all duration-300 py-1 ${
                location.pathname === "/favoritos"
                  ? "text-[#ff3333] font-black pl-3 bg-gray-100"
                  : "text-gray-700 hover:pl-3"
              }`}
            >
              <span
                className={`absolute left-0 top-0 w-1 h-full bg-[#ff3333] transition-transform duration-300 origin-top ${
                  location.pathname === "/favoritos"
                    ? "scale-y-100"
                    : "scale-y-0"
                }`}
              />
              <div className="relative inline-block mr-2">
                <img
                  src={corazon}
                  alt="Favoritos"
                  className="w-7 h-7 object-contain"
                />
                {favCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#ff3333] text-white text-[9px] font-black border-2 border-black w-4 h-4 flex items-center justify-center">
                    {favCount}
                  </span>
                )}
              </div>
              {t("favorites")}
            </Link>

            {/* MOBILE SKINS */}
            <Link
              to="/skins"
              onClick={toggleMenu}
              className={`relative overflow-hidden ${styles.navItem} transition-all duration-300 py-1 ${
                location.pathname === "/skins"
                  ? "text-[var(--color-minecraft-amethyst)] font-black pl-3 bg-gray-100"
                  : "text-gray-700 hover:pl-3"
              }`}
            >
              <span
                className={`absolute left-0 top-0 w-1 h-full bg-[var(--color-minecraft-amethyst)] transition-transform duration-300 origin-top ${
                  location.pathname === "/skins" ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <img
                src={iconoSkin}
                alt="Skins"
                className="w-7 h-7 inline-block mr-2"
              />
              {t("skin_creator")}
            </Link>
          </div>

          <div className="border-t-4 border-black mt-4 pt-4">
            <button
              onClick={toggleLanguage}
              className="border-4 border-black bg-white text-black px-4 py-2 font-bold w-full hover:bg-[var(--color-minecraft-grass)] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              LANGUAGE: {i18n.language === "es" ? "ES / EN" : "EN / ES"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
