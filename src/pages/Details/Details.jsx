import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getItemById } from "../../services/getItemById";
import styles from "./Details.module.css";
import ExportPdfButton from "../../components/ExportPdfButton/ExportPdfButton";
import corazon from "../../assets/corazonRojo/corazon.png";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const captureRef = useRef(null);

  // Traer la info de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const data = await getItemById(id);
        setItem(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Revisar si está en favoritos
  useEffect(() => {
    if (item) {
      const favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
      const exists = favorites.some((fav) => fav.id === item.id);
      setIsSaved(exists);
    }
  }, [item]);

  // FUNCIONES
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (isSaved) {
      favorites = favorites.filter((fav) => fav.id !== item.id);
    } else {
      favorites.push(item);
    }

    localStorage.setItem("favoritos", JSON.stringify(favorites));
    setIsSaved(!isSaved);

    window.dispatchEvent(new Event("favoritesUpdated"));
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

  const isMob = item.type === "MOB";
  const themeColor = isMob ? "#4d924c" : "#4AEEE2";

  return (
    <div className={styles.detailsContainer}>
      {/* BOTONERA SUPERIOR */}
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

      {/* CONTENIDO PRINCIPAL */}
      <div
        ref={captureRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        <div
          className={styles.imageBox}
          style={{ borderBottomColor: themeColor, borderBottomWidth: "12px" }}
        >
          <span className="absolute top-2 left-2 bg-[#000000] text-[#ffffff] px-3 py-1 font-bold text-sm z-10">
            {item.type}
          </span>
          <img src={item.image} alt={item.name} />
        </div>

        {/* INFO Y ESTADÍSTICAS */}
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
                className={`${styles.statBox} ${styles.hoverCard} bg-[#ffffff] p-4 border-l-8 ${item.type === "MOB" ? "border-[#4d924c]" : "border-[#ff3333]"}`}
              >
                <span className={styles.statLabel}>
                  {item.type === "MOB" ? t("behavior") : t("utility")}
                </span>
                <span className={styles.statValue}>{item.behavior}</span>
              </div>

              <div
                className={`${styles.statBox} ${styles.hoverCard} bg-[#ffffff] p-4 border-l-8 border-[#4AEEE2]`}
              >
                <span className={styles.statLabel}>{t("size")}</span>
                <span className={styles.statValue}>{item.size}</span>
              </div>

              <div
                className={`${styles.statBox} ${styles.hoverCard} bg-[#ffffff] p-4 border-l-8 border-[#a95eea]`}
              >
                <span className={styles.statLabel}>{t("type")}</span>
                <span className={styles.statValue}>{item.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
