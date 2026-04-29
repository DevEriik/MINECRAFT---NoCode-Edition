import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

import logoImage from "../../assets/logo/logo-nocodeCraft.png";
import corazon from "../../assets/corazonRojo/corazon.png";
import iconoHome from "../../assets/icons/grass_block.png";
import iconoSkin from "../../assets/icons/name_tag.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const currentLang = i18n.language || "es";
    const newLang = currentLang.startsWith("es") ? "en" : "es";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.headerContainer}>
      <Link
        to="/"
        className="flex items-center hover:scale-105 transition-transform duration-200"
      >
        <img
          src={logoImage}
          alt="NoCodeCraft Logo"
          className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          style={{ imageRendering: "pixelated" }}
        />
      </Link>

      <nav className="hidden lg:flex items-center gap-8">
        {/* LINK HOME */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg text-gray-700 hover:text-[var(--color-minecraft-grass)] uppercase tracking-wide cursor-pointer transition-transform hover:-translate-y-1"
        >
          <img
            src={iconoHome}
            className="w-8 h-8"
            style={{ imageRendering: "pixelated" }}
            alt="Home"
          />
          {t("home")}
        </Link>

        {/* LINK FAVORITOS */}
        <Link
          to="/favoritos"
          className="flex items-center gap-2 text-lg text-gray-700 hover:text-[#ff3333] uppercase tracking-wide cursor-pointer transition-transform hover:-translate-y-1"
        >
          <img
            src={corazon}
            alt="Favoritos"
            className="w-8 h-8 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
          {t("favorites")}
        </Link>

        {/* LINK SKIN CREATOR */}
        <Link
          to="/skins"
          className="flex items-center gap-2 text-lg text-gray-700 hover:text-[var(--color-minecraft-amethyst)] uppercase tracking-wide cursor-pointer transition-transform hover:-translate-y-1"
        >
          <img
            src={iconoSkin}
            className="w-8 h-8"
            style={{ imageRendering: "pixelated" }}
            alt="Skins"
          />
          {t("skin_creator")}
        </Link>
      </nav>

      {/* BOTÓN IDIOMA */}
      <div className="hidden lg:block">
        <button
          onClick={toggleLanguage}
          className="border-4 border-black bg-white text-black px-3 py-1 font-bold text-lg hover:bg-[var(--color-minecraft-grass)] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
        >
          {i18n.language === "es" ? "ES / EN" : "EN / ES"}
        </button>
      </div>

      {/* MENÚ HAMBURGUESA */}
      <button
        className="lg:hidden w-12 h-12 flex items-center justify-center border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        onClick={toggleMenu}
      >
        <span className="text-3xl font-black leading-none mb-1">
          {isMenuOpen ? "X" : "☰"}
        </span>
      </button>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className="flex flex-col gap-4">
            <Link to="/" className={styles.navItem} onClick={toggleMenu}>
              <img
                src={iconoHome}
                alt="Home"
                className="w-7 h-7 inline-block mr-2"
                style={{ imageRendering: "pixelated" }}
              />
              {t("home")}
            </Link>
            <Link
              to="/favoritos"
              className={styles.navItem}
              onClick={toggleMenu}
            >
              <img
                src={corazon}
                alt="Favoritos"
                className="w-7 h-7 inline-block mr-2"
                style={{ imageRendering: "pixelated" }}
              />
              {t("favorites")}
            </Link>
            <Link to="/skins" className={styles.navItem} onClick={toggleMenu}>
              <img
                src={iconoSkin}
                alt="Skins"
                className="w-7 h-7 inline-block mr-2"
                style={{ imageRendering: "pixelated" }}
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
