import React from "react";
import { useTranslation } from "react-i18next"; // <-- Sumamos el hook de traducciones
import iconoLupa from "../../assets/icons/lupa.png";
import iconoPico from "../../assets/icons/diamond_pickaxe.webp";
import iconoZombie from "../../assets/icons/zombie_head.png";

const Searcher = ({
  alBuscar,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  alFiltrarSecundario,
}) => {
  const { t } = useTranslation(); // <-- Inicializamos la función t()

  return (
    <div className="w-full bg-transparent border-b-8 border-black py-8 mb-12 px-4 shadow-[inset_0px_8px_15px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 font-mono">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* buscador */}
          <div className="flex-grow flex border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <img src={iconoLupa} alt="Buscar" className="w-6 h-6 m-4" />
            <input
              type="text"
              placeholder={t("search_placeholder")} // Traducido
              onChange={(evento) => alBuscar && alBuscar(evento.target.value)}
              className="flex-grow p-3 font-mono text-lg outline-none w-full text-black placeholder-gray-400 font-bold uppercase"
            />
          </div>

          {/* botones */}
          <div className="flex gap-4 h-full">
            <button
              onClick={() =>
                setCategoriaSeleccionada && setCategoriaSeleccionada("Todos")
              }
              className={`px-6 py-3 border-4 font-bold uppercase transition-all flex items-center gap-2 ${
                categoriaSeleccionada === "Todos"
                  ? "bg-black text-white border-white shadow-none translate-y-1 translate-x-1"
                  : "bg-[#333333] text-white border-black hover:bg-[#444444] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1"
              }`}
            >
              ☰ {t("all")} {/* Traducido */}
            </button>

            <button
              onClick={() =>
                setCategoriaSeleccionada && setCategoriaSeleccionada("ITEM")
              }
              className={`px-6 py-3 border-4 font-bold uppercase transition-all flex items-center gap-2 ${
                categoriaSeleccionada === "ITEM"
                  ? "bg-black text-[#55FFFF] border-[#55FFFF] shadow-none translate-y-1 translate-x-1"
                  : "bg-[#333333] text-white border-black hover:bg-[#444444] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1"
              }`}
            >
              <img src={iconoPico} alt="Items" className="w-6 h-6" />{" "}
              {t("items")}
            </button>

            <button
              onClick={() =>
                setCategoriaSeleccionada && setCategoriaSeleccionada("MOB")
              }
              className={`px-6 py-3 border-4 font-bold uppercase transition-all flex items-center gap-2 ${
                categoriaSeleccionada === "MOB"
                  ? "bg-black text-[#55FF55] border-[#55FF55] shadow-none translate-y-1 translate-x-1"
                  : "bg-[#333333] text-white border-black hover:bg-[#444444] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1"
              }`}
            >
              <img src={iconoZombie} alt="Mobs" className="w-6 h-6" />{" "}
              {t("mobs")}
            </button>
          </div>
        </div>

        {/* filtros secundarios */}
        {categoriaSeleccionada !== "Todos" && (
          <div className="flex gap-6 flex-wrap">
            {categoriaSeleccionada === "ITEM" && (
              <>
                <select
                  onChange={(e) =>
                    alFiltrarSecundario("behavior", e.target.value)
                  }
                  className="border-4 border-black p-2 bg-[#333333] text-white font-bold text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <option value="">{t("utility_all")}</option>
                  {/* Los values quedan en español para no romper el filtro, el texto se traduce */}
                  <option value="Ataque">{t("attack")}</option>
                  <option value="Alquimia">{t("alchemy")}</option>
                  <option value="Construcción">{t("construction")}</option>
                  <option value="Alimento">{t("food")}</option>
                </select>

                <select
                  onChange={(e) => alFiltrarSecundario("size", e.target.value)}
                  className="border-4 border-black p-2 bg-[#333333] text-white font-bold text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <option value="">{t("type_all")}</option>
                  <option value="Herramienta">{t("tool")}</option>
                  <option value="Bloque">{t("block")}</option>
                  <option value="Consumible">{t("consumable")}</option>
                  <option value="Recurso">{t("resource")}</option>
                </select>
              </>
            )}

            {categoriaSeleccionada === "MOB" && (
              <>
                <select
                  onChange={(e) =>
                    alFiltrarSecundario("behavior", e.target.value)
                  }
                  className="border-4 border-black p-2 bg-[#333333] text-white font-bold text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <option value="">{t("behavior_all")}</option>
                  <option value="Hostil">{t("hostile")}</option>
                  <option value="Neutral">{t("neutral")}</option>
                  <option value="Pasivo">{t("passive")}</option>
                  <option value="Amigable">{t("friendly")}</option>
                </select>

                <select
                  onChange={(e) => alFiltrarSecundario("size", e.target.value)}
                  className="border-4 border-black p-2 bg-[#333333] text-white font-bold text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <option value="">{t("size_all")}</option>
                  <option value="Pequeño">{t("small")}</option>
                  <option value="Mediano">{t("medium")}</option>
                  <option value="Grande">{t("large")}</option>
                  <option value="Gigante">{t("giant")}</option>
                </select>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Searcher;
