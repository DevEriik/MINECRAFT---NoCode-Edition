import { useState, useEffect, useTransition } from "react";
import { Link } from "react-router-dom";
import { Notificacion } from "../Notificacion/Notificacion";
import corazon from "../../assets/corazonRojo/corazon.png";
import { Translation, useTranslation } from "react-i18next";

export const Card = ({ item, onEliminar }) => {
  const [aviso, setAviso] = useState({ mensaje: "", tipo: "" });
  const [esFavorito, setEsFavorito] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const favGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const exist = favGuardados.some((fav) => fav.id === item.id);
    setEsFavorito(exist);
  }, [item.id]);

  const mostrarNotificacion = (texto, accion) => {
    setAviso({ mensaje: texto, tipo: accion });
    setTimeout(() => {
      setAviso({ mensaje: "", tipo: "" });
    }, 5000);
  };

  const manejarFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let favGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (esFavorito) {
      favGuardados = favGuardados.filter((fav) => fav.id !== item.id);
      mostrarNotificacion(`Se eliminó ${item.name} de favoritos`, `eliminar`);
      localStorage.setItem("favoritos", JSON.stringify(favGuardados));
      setEsFavorito(false);
      if (onEliminar) {
        setTimeout(() => {
          onEliminar(item.id);
        }, 2000);
      }
    } else {
      favGuardados.push(item);
      mostrarNotificacion(`¡${item.name} se guardó en favoritos!`, `agregar`);
      localStorage.setItem("favoritos", JSON.stringify(favGuardados));
    }

    setEsFavorito(!esFavorito);

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <Link
      to={`/item/${item.id}`}
      className="block w-full h-[540px] border-4 border-black p-4 bg-[#4B4B4B] flex flex-col overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-500 transition-colors cursor-pointer"
    >
      <div className="relative h-52 flex-shrink-0 bg-gray-500 flex items-center justify-center mb-4 border-4 border-black">
        <span
          className={`absolute top-1 left-1 px-3 py-1.5 text-[15px] font-black border-2 border-black ${item.type === "ITEM" ? "bg-cyan-600 text-white" : "bg-green-600 text-white"}`}
        >
          {item.type}
        </span>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="object-contain w-full h-full p-2"
            style={{ imageRendering: "pixelated" }}
          />
        ) : (
          <span className="text-gray-400 font-bold text-sm">IMG NULL</span>
        )}
      </div>

      <div className="bg-gray-100 p-3 h-[220px] flex flex-col gap-2 border-4 border-black mb-4">
        <h3
          className="text-black font-black tracking-tight border-b-4 border-black pb-1 text-lg uppercase"
          style={{ textShadow: "none" }}
        >
          {item.name}
        </h3>
        <div className="flex flex-col gap-1 flex-grow overflow-hidden mt-1">
          <p className="text-[13px] font-bold text-gray-800 uppercase">
            <span className="text-black">
              {item.type === "MOB" ? "COMPORTAMIENTO: " : "UTILIDAD: "}
            </span>
            {item.behavior}
          </p>

          <p className="text-[13px] font-bold text-gray-800 uppercase">
            <span className="text-black">
              {item.type === "MOB" ? "TAMAÑO: " : "TIPO: "}
            </span>
            {item.size}
          </p>

          <p className="text-[14px] text-gray-700 leading-tight border-t-2 border-dashed border-gray-400 pt-2 mt-1 overflow-y-auto pr-1 custom-scrollbar">
            {item.description}
          </p>
        </div>
      </div>

      {esFavorito ? (
        <div
          onClick={manejarFavorito}
          className="w-full mt-auto py-2 px-4 bg-[var(--color-minecraft-grass)] border-4 border-black flex items-center justify-center gap-2 cursor-pointer hover:bg-[#555] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          <img
            src={corazon}
            alt="Corazón rojo"
            className="w-6 h-6 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="text-sm text-white font-black uppercase">
            {t("inFavorite")}
          </span>
        </div>
      ) : (
        <div
          onClick={manejarFavorito}
          className="w-full mt-auto py-2 px-4 bg-[#3b3b3b] border-4 border-black flex items-center justify-center gap-2 cursor-pointer hover:bg-[#555] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        >
          <span className="text-sm text-white font-black uppercase">
            ♡ {t("textFavorite")}
          </span>
        </div>
      )}

      <Notificacion mensaje={aviso.mensaje} tipo={aviso.tipo} />
    </Link>
  );
};
