import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getById, getAll, getFavorites, addFavorite, removeFavorite } from "../../services/api";
import styles from "./Details.module.css";
import ExportPdfButton from "../../components/ExportPdfButton/ExportPdfButton";
import corazon from "../../assets/corazonRojo/corazon.png";
import { useAuth } from "../../context/AuthContext";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const captureRef = useRef(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        let data;
        try {
          data = await getById("items", id);
        } catch (itemErr) {
          data = await getById("mobs", id);
        }

        setItem(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (item && user) {
        try {
          const favorites = await getFavorites();
          const exists = favorites.some((fav) => fav.details && fav.details.id === item.id);
          setIsSaved(exists);
        } catch (error) {
          console.error("Error al verificar favorito:", error);
        }
      }
    };
    checkFavorite();

    const handleUpdate = () => checkFavorite();
    window.addEventListener("favoritesUpdated", handleUpdate);
    return () => window.removeEventListener("favoritesUpdated", handleUpdate);
  }, [item, user]);

  const [cargandoFav, setCargandoFav] = useState(false);

  const toggleFavorite = async () => {
    if (!user) {
      const goToLogin = window.confirm(
        "⚠️ Debes iniciar sesión para guardar favoritos. ¿Quieres ir al Login ahora?"
      );
      if (goToLogin) navigate("/login");
      return;
    }

    if (cargandoFav) return;
    setCargandoFav(true);

    try {
      const entityTypeStr = item.type === "ITEM" ? "item" : "mob";
      if (isSaved) {
        await removeFavorite(item.id, entityTypeStr);
        setIsSaved(false);
      } else {
        await addFavorite(item.id, entityTypeStr);
        setIsSaved(true);
      }
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (error) {
      console.error("Error al hacer toggle de favorito:", error);
      alert("Hubo un error al guardar en favoritos. Intenta de nuevo.");
    } finally {
      setCargandoFav(false);
    }
  };

  const handleEdit = () => {
    const isMob = item.type !== undefined && item.health !== undefined;
    navigate('/admin', { state: { cardToEdit: { ...item, cardType: isMob ? "Mob" : "Ítem" } } });
  };

  const handleDelete = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar a ${item.name} de forma permanente?`
    );
    if (confirmar) {
      console.log("Eliminando item de la base de datos...");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className={styles.sandLoading}>SAND</div>
        <p className="font-mono text-xl font-bold animate-pulse text-[#fffff]">
          {t("generating_terrain")}...
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 font-mono">
        <h2 className="text-4xl font-black text-red-500">404</h2>
        <p className="text-xl text-[#000000]">{t("item_lost_lava")}</p>
        <button
          onClick={() => navigate("/")}
          className="border-4 border-[#000000] px-4 py-2 bg-[#ffffff] text-[#000000] font-bold text-lg hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          {t("back_to_home")}
        </button>
      </div>
    );
  }

  const isMob = item.type !== undefined && item.health !== undefined;
  const themeColor = isMob ? "#4d924c" : "#4AEEE2";

  return (
    <div className={styles.detailsContainer}>
      <div className="flex flex-wrap justify-center sm:justify-between items-center gap-3 border-b-4 border-[#000000] pb-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="border-4 border-[#000000] px-4 py-2 bg-[#ffffff] text-[#000000] font-bold text-lg hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <span className="text-xl inline-block rotate-180">➔</span>{" "}
          <span className="hidden sm:inline">[ {t("go_back")} ]</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <ExportPdfButton
            elementRef={captureRef}
            filename={`Ficha-${item.name}`}
          />

          <button
            onClick={toggleFavorite}
            className="border-4 border-[#000000] px-4 py-2 bg-[#ffffff] text-[#000000] font-bold text-lg hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2 whitespace-nowrap"
          >
            {isSaved ? (
              <img
                src={corazon}
                alt={t("saved_in_favorites")}
                className="w-6 h-6 object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            ) : (
              <span className="text-[#000000] font-bold">♡</span>
            )}

            <span className="hidden sm:inline">
              [ {isSaved ? t("saved") : t("save")} ]
            </span>
          </button>
        </div>
      </div>

      <div
        ref={captureRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        <div
          className={styles.imageBox}
          style={{ borderBottomColor: themeColor, borderBottomWidth: "12px" }}
        >
          <span className="absolute top-2 left-2 bg-[#000000] text-[#ffffff] px-3 py-1 font-bold text-sm z-10">
            {isMob ? "MOB" : "ITEM"}
          </span>
          <img src={item.imageUrl} alt={item.name} />
        </div>

        <div className="flex flex-col gap-6 bg-[#f0f0f0] p-6 border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#000000]"
            style={{ textShadow: "none" }}
          >
            {item.name}
          </h1>

          <div className="border-t-4 border-dashed border-[#9ca3af] pt-4">
            <h3
              className="text-xl font-bold flex items-center gap-2 mb-2 text-[#000000]"
              style={{ textShadow: "none" }}
            >
              {t("description")}:
            </h3>
            <p
              className={`${styles.hoverCard} text-[#1f2937] text-lg leading-relaxed bg-[#ffffff] p-4 border-l-8 border-[#4AEEE2]`}
            >
              {item.description}
            </p>
          </div>

          <div className="border-t-4 border-dashed border-[#9ca3af] pt-4">
            <h3
              className="text-xl font-bold flex items-center gap-2 mb-4 text-[#000000]"
              style={{ textShadow: "none" }}
            >
              {t("statistics")}:
            </h3>

            <div className="flex flex-col gap-4">
              <div
                className={`${styles.statBox} ${styles.hoverCard} bg-[#ffffff] p-4 border-l-8 ${isMob ? "border-[#4d924c]" : "border-[#ff3333]"}`}
              >
                <span className={styles.statLabel}>
                  {isMob ? t("type") : t("utility")}
                </span>
                <span className={styles.statValue}>
                  {isMob ? item.type : item.rarity}
                </span>
              </div>

              {isMob && (
                <div
                  className={`${styles.statBox} ${styles.hoverCard} bg-[#ffffff] p-4 border-l-8 border-[#4AEEE2]`}
                >
                  <span className={styles.statLabel}>{t("health")}</span>
                  <span className={styles.statValue}>{item.health}</span>
                </div>
              )}
            </div>
          </div>

          {user && user.role === "ADMIN" && (
            <div className="border-t-4 border-[#000000] pt-4 mt-2">
              <h3 className="text-lg font-black text-red-600 uppercase mb-3 flex items-center gap-2">
                <span>👑</span> Controles de Administrador
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={handleEdit}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase py-3 border-4 border-black transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 text-sm sm:text-base"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black uppercase py-3 border-4 border-black transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 text-sm sm:text-base"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;