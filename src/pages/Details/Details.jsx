import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById } from "../../services/getItemById";
import styles from "./Details.module.css";

import corazon from "../../assets/corazonRojo/corazon.png";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
      const favorites =
        JSON.parse(localStorage.getItem("minecraft_favorites")) || [];
      const exists = favorites.some((fav) => fav.id === item.id);
      setIsSaved(exists);
    }
  }, [item]);

  // FUNCIONES
  const toggleFavorite = () => {
    let favorites =
      JSON.parse(localStorage.getItem("minecraft_favorites")) || [];
    if (isSaved) {
      favorites = favorites.filter((fav) => fav.id !== item.id);
    } else {
      favorites.push(item);
    }
    localStorage.setItem("minecraft_favorites", JSON.stringify(favorites));
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className={styles.sandLoading}>SAND</div>
        <p className="font-mono text-xl font-bold animate-pulse text-black">
          Generando terreno...
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 font-mono">
        <h2 className="text-4xl font-black text-red-500">404</h2>
        <p className="text-xl text-black">
          Ese elemento cayó a la lava y se perdió.
        </p>
        <button
          onClick={() => navigate("/")}
          className="border-4 border-black px-4 py-2 bg-white text-black font-bold text-lg hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  const isMob = item.type === "MOB";
  const themeColor = isMob
    ? "var(--color-minecraft-grass)"
    : "var(--color-minecraft-diamond)";

  return (
    <div className={styles.detailsContainer}>
      <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="border-4 border-black px-4 py-2 bg-white text-black font-bold text-lg hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
        >
          <span>{"<"}</span> [ ATRÁS ]
        </button>
        <button
          onClick={toggleFavorite}
          className="border-4 border-black px-4 py-2 bg-white text-black font-bold text-lg hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
        >
          {isSaved ? (
            <img
              src={corazon}
              alt="Guardado en favoritos"
              className="w-6 h-6 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <span className="text-black font-bold">♡</span>
          )}

          {isSaved ? "[ GUARDADO ]" : "[ GUARDAR ]"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div
          className={styles.imageBox}
          style={{ borderBottomColor: themeColor, borderBottomWidth: "12px" }}
        >
          <span className="absolute top-2 left-2 bg-black text-white px-3 py-1 font-bold text-sm z-10">
            {item.type}
          </span>
          <img src={item.image} alt={item.name} />
        </div>

        <div className="flex flex-col gap-6 bg-[#f0f0f0] p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black"
            style={{ textShadow: "none" }}
          >
            {item.name}
          </h1>

          <div className="border-t-4 border-dashed border-gray-400 pt-4">
            <h3
              className="text-xl font-bold flex items-center gap-2 mb-2 text-black"
              style={{ textShadow: "none" }}
            >
              <span>📖</span> DESCRIPCIÓN
            </h3>
            <p
              className={`${styles.hoverCard} text-gray-800 text-lg leading-relaxed bg-white p-4 border-l-8 border-[var(--color-minecraft-diamond)]`}
            >
              {item.description}
            </p>
          </div>

          <div className="border-t-4 border-dashed border-gray-400 pt-4">
            <h3
              className="text-xl font-bold flex items-center gap-2 mb-4 text-black"
              style={{ textShadow: "none" }}
            >
              <span>📊</span> ESTADÍSTICAS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`${styles.statBox} ${styles.hoverCard} ${item.type === "MOB" ? "border-l-[var(--color-minecraft-grass)]" : "border-l-[var(--color-minecraft-redstone)]"}`}
              >
                <span className={styles.statLabel}>Comportamiento</span>
                <span className={styles.statValue}>{item.behavior}</span>
              </div>

              <div
                className={`${styles.statBox} ${styles.hoverCard} border-l-[var(--color-minecraft-diamond)]`}
              >
                <span className={styles.statLabel}>Tamaño</span>
                <span className={styles.statValue}>{item.size}</span>
              </div>

              <div
                className={`${styles.statBox} ${styles.hoverCard} border-l-[#a95eea]`}
              >
                <span className={styles.statLabel}>Tipo</span>
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
