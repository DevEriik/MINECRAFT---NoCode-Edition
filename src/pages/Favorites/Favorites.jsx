import { useState, useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { useTranslation } from "react-i18next";

export const Favorites = () => {
  const [cardsFavoritas, setCardsFavorites] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const favoritas = JSON.parse(localStorage.getItem("favoritos")) || [];
    setCardsFavorites(favoritas);
  }, []);

  const quitarDeVista = (idParaBorrar) => {
    setCardsFavorites((carsdActuales) =>
      carsdActuales.filter((card) => card.id !== idParaBorrar),
    );
  };

  return (
    <div className="min-h-screen bg-[#2b2b2b] p-8">
      <h2 className="text-3xl font-bold text-white mb-6 border-b-4 border-gray-600 pb-2 inline-block uppercase tracking-wide">
        {t("favorites")}
      </h2>

      {cardsFavoritas.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 border-4 border-dashed border-gray-500 p-10 bg-[#3b3b3b] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-6xl mb-4 grayscale"> 📦 </span>
          <h3 className="text-2xl font-bold text-gray-300 uppercase tracking-widest">
            {t("inventoryEmpty")}
          </h3>
          <p className="text-gray-400 mt-2 text-lg italic">
            {t("inventoryText")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardsFavoritas.map((item) => (
            <Card key={item.id} item={item} onEliminar={quitarDeVista} />
          ))}
        </div>
      )}
    </div>
  );
};
