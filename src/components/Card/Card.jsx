import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notificacion } from "../Notificacion/Notificacion";
import corazon from "../../assets/corazonRojo/corazon.png";
import { useTranslation } from "react-i18next";
import { getFavorites, addFavorite, removeFavorite } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export const Card = ({ item, onEliminar }) => {
  const [aviso, setAviso] = useState({ mensaje: "", tipo: "" });
  const [esFavorito, setEsFavorito] = useState(false);
  const [cargandoFav, setCargandoFav] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user } = useAuth();
  
  const esMob = item.health !== undefined;
  const entityTypeStr = esMob ? "mob" : "item"; 

  useEffect(() => {
    const verificarFavorito = async () => {
      if (!user) return;
      try {
        const favoritos = await getFavorites();
        const existe = favoritos.some((fav) => fav.details && fav.details.id === item.id);
        setEsFavorito(existe);
      } catch (error) {
        console.error("Error al verificar favorito:", error);
      }
    };
    verificarFavorito();
  }, [item.id, user]); 

  const mostrarNotificacion = (texto, accion) => {
    setAviso({ mensaje: texto, tipo: accion });
    setTimeout(() => {
      setAviso({ mensaje: "", tipo: "" });
    }, 5000);
  };

  const manejarFavorito = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      const goToLogin = window.confirm(
        "⚠️ Debes iniciar sesión para guardar favoritos. ¿Quieres ir al Login ahora?"
      );
      if (goToLogin) {
        navigate("/login");
      }
      return; 
    }

    if (cargandoFav) return; 
    setCargandoFav(true);

    try {
      if (esFavorito) {
        await removeFavorite(item.id, entityTypeStr);
        setEsFavorito(false);
        mostrarNotificacion(`${item.name} se eliminó de favoritos`, `eliminar`);
        
        if (onEliminar) {
          setTimeout(() => {
            onEliminar(item.id);
          }, 2000);
        }
      } else {
        await addFavorite(item.id, entityTypeStr);
        setEsFavorito(true);
        mostrarNotificacion(`¡${item.name} se guardó en favoritos!`, `agregar`);
      }
      
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (error) {
      mostrarNotificacion("Error al procesar el favorito en el servidor", "error");
    } finally {
      setCargandoFav(false);
    }
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Navegar a edición del item:", item.id);
  };

  const manejarEliminarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmar = window.confirm(`¿Estás seguro de eliminar a ${item.name} de la base de datos?`);
    if (confirmar && onEliminar) {
      onEliminar(item.id);
    }
  };

  return (
    <Link
      to={`/item/${item.id}`}
      className="block w-full min-h-[540px] border-4 border-black p-4 bg-gray-800 flex flex-col overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-700 transition-colors cursor-pointer"
    >
      <div className="relative h-52 flex-shrink-0 bg-gray-500 flex items-center justify-center mb-4 border-4 border-black">
        <span
          className={`absolute top-1 left-1 px-3 py-1.5 text-[15px] font-black border-2 border-black ${!esMob ? "bg-cyan-600 text-white" : "bg-green-600 text-white"}`}
        >
          {esMob ? "MOB" : "ITEM"}
        </span>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
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
              {esMob ? "TIPO: " : "UTILIDAD: "}
            </span>
            {esMob ? item.type : item.rarity}
          </p>

          {esMob && (
            <p className="text-[13px] font-bold text-gray-800 uppercase">
              <span className="text-black">
                VIDA:
              </span>
              {item.health}
            </p>
          )}

          <p className="text-[14px] text-gray-700 leading-tight border-t-2 border-dashed border-gray-400 pt-2 mt-1 overflow-y-auto pr-1 custom-scrollbar">
            {item.description}
          </p>
        </div>
      </div>

      {esFavorito ? (
        <div
          onClick={manejarFavorito}
          className={`w-full mt-auto py-2 px-4 bg-green-800 border-4 border-black flex items-center justify-center gap-2 cursor-pointer hover:bg-[#444444] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${cargandoFav ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <img
            src={corazon}
            alt="Corazón rojo"
            className="w-6 h-6 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="text-sm text-white font-black uppercase">
            {cargandoFav ? "Cargando..." : t("inFavorite")}
          </span>
        </div>
      ) : (
        <div
          onClick={manejarFavorito}
          className={`w-full mt-auto py-2 px-4 bg-[#3b3b3b] border-4 border-black flex items-center justify-center gap-2 cursor-pointer hover:bg-[#444444] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${cargandoFav ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <span className="text-sm text-white font-black uppercase">
            ♡ {cargandoFav ? "Cargando..." : t("textFavorite")}
          </span>
        </div>
      )}

      {user && user.role === "ADMIN" && (
        <div className="flex gap-2 mt-3">
          <button 
            onClick={manejarEditar}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase py-2 border-4 border-black transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 text-xs"
          >
            ✏️ Editar
          </button>
          <button 
            onClick={manejarEliminarClick}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black uppercase py-2 border-4 border-black transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 text-xs"
          >
            🗑️ Eliminar
          </button>
        </div>
      )}

      <Notificacion mensaje={aviso.mensaje} tipo={aviso.tipo} />
    </Link>
  );
};