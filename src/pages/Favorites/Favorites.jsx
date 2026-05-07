import { useState, useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { useTranslation } from "react-i18next";
import corazon from "../../assets/corazonRojo/corazon.png";

export const Favorites = () => {
  const [cardsFavoritas, setCardsFavorites] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const favoritas = JSON.parse(localStorage.getItem("favoritos")) || [];
    setCardsFavorites(favoritas);
  }, []);

  const quitarDeVista = (idParaBorrar) => {
    setCardsFavorites((carsdActuales) =>
      carsdActuales.filter((card) => card.id !== idParaBorrar),
    );
  };

  // Logica para el panel de estadísticas
  const totalGuardados = cardsFavoritas.length;
  const totalMobs = cardsFavoritas.filter((item) => item.type === "MOB").length;
  const totalItems = cardsFavoritas.filter(
    (item) => item.type === "ITEM",
  ).length;

  return (
    <div className="bg-gradient-to-r from-[#064E3B] via-[#0F766E] to-[#083344] min-h-screen w-full">
      <div className="px-1 pt-8 p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-4">
            <img
              src={corazon}
              alt="Icono Favoritos"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
            {t("favorites")}
          </h2>
          <hr className="mt-6 border-t-4 border-black opacity-50" />
        </div>

        {cardsFavoritas.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 border-4 border-black p-10 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-6xl mb-4 grayscale"> 📦 </span>
            <h3
              className="text-2xl font-black text-black uppercase tracking-widest text-center"
              style={{ textShadow: "none" }}
            >
              {t("inventoryEmpty")}
            </h3>
            <p
              className="text-gray-600 mt-2 text-lg font-bold text-center"
              style={{ textShadow: "none" }}
            >
              {t("inventoryText")}
            </p>
          </div>
        ) : (
          <>
            {/* ================= PANEL DE ESTADÍSTICAS ================= */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-[#333333] border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl">
              {/* Total */}
              <div className="flex-1 border-4 border-black bg-gray-200 p-4 flex flex-col items-center justify-center shadow-inner transition-all duration-200 hover:-translate-y-2 hover:bg-gray-300">
                <span className="text-4xl md:text-5xl font-black text-black tracking-tighter">
                  {totalGuardados}
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-600 mt-2 w-full text-center">
                  {t("total_saved")}
                </span>
              </div>

              {/* Mobs */}
              <div className="flex-1 border-4 border-black bg-green-600 p-4 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-2 hover:brightness-110">
                <span
                  className="text-4xl md:text-5xl font-black text-white tracking-tighter"
                  style={{ textShadow: "2px 2px 0 #000" }}
                >
                  {totalMobs}
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white mt-2 w-full text-center">
                  {t("mobs")}
                </span>
              </div>

              {/* Ítems */}
              <div className="flex-1 border-4 border-black bg-cyan-600 p-4 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-2 hover:brightness-110">
                <span
                  className="text-4xl md:text-5xl font-black text-white tracking-tighter"
                  style={{ textShadow: "2px 2px 0 #000" }}
                >
                  {totalItems}
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white mt-2 w-full text-center">
                  {t("items")}
                </span>
              </div>
            </div>

            {/* ================= CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardsFavoritas.map((item) => (
                <Card key={item.id} item={item} onEliminar={quitarDeVista} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
