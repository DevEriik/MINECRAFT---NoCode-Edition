import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

import logoImage from "../../assets/logo/logo-nocodeCraft.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar el idioma y guardarlo
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
          className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-md"
        />
      </Link>

      <nav className="hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-2 text-lg text-gray-700 uppercase tracking-wide cursor-pointer focus-within:text-[var(--color-minecraft-diamond)] transition-colors">
          <span>🔍</span>
          <input
            type="text"
            placeholder={t("home")}
            className="border-b-2 border-black bg-transparent px-2 py-1 outline-none text-lg placeholder-gray-500 focus:border-b-4 focus:border-[var(--color-minecraft-diamond)] transition-all"
          />
        </div>

        <Link
          to="/favoritos"
          className="flex items-center gap-2 text-lg text-gray-700 hover:text-[var(--color-minecraft-cherry)] uppercase tracking-wide cursor-pointer transition-colors"
        >
          <span>🤍</span> {t("favorites")}
        </Link>

        <Link
          to="/skins"
          className="flex items-center gap-2 text-lg text-gray-700 hover:text-[var(--color-minecraft-amethyst)] uppercase tracking-wide cursor-pointer transition-colors"
        >
          <span>✒️</span> {t("skin_creator")}
        </Link>
      </nav>

      <div className="hidden lg:block">
        <button
          onClick={toggleLanguage}
          className="border-4 border-black bg-white text-black px-3 py-1 font-bold text-lg hover:bg-[var(--color-minecraft-grass)] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
        >
          {i18n.language === "es" ? "ES / EN" : "EN / ES"}
        </button>
      </div>

      <button
        className="lg:hidden border-4 border-black p-1 bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        onClick={toggleMenu}
      >
        <span className="text-2xl font-bold px-1">
          {isMenuOpen ? "X" : "≡"}
        </span>
      </button>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className="flex flex-col gap-4 border-b-2 border-dashed border-gray-300 pb-4">
            <div className="flex items-center gap-2">
              <span>🔍</span>
              <input
                type="text"
                placeholder={t("home")}
                className="w-full border-b-2 border-black outline-none py-1"
              />
            </div>
          </div>
          <Link to="/favoritos" className={styles.navItem} onClick={toggleMenu}>
            🤍 {t("favorites")}
          </Link>
          <Link to="/skins" className={styles.navItem} onClick={toggleMenu}>
            ✒️ {t("skin_creator")}
          </Link>
          <button
            onClick={toggleLanguage}
            className={`${styles.langButton} w-max mt-2`}
          >
            LANGUAGE: {i18n.language === "es" ? "ES / EN" : "EN / ES"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
