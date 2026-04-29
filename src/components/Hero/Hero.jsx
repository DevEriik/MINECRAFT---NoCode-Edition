import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import heroImg from "../../assets/hero/hero-background.png";
import iconEarth from "../../assets/icons/earth.png";
import iconFavs from "../../assets/corazonRojo/corazon.png";
import iconItems from "../../assets/icons/diamond_chestplate.png";
import iconMobs from "../../assets/icons/creeper_head.png";
import iconSkins from "../../assets/icons/herobrine.png";

const Hero = () => {
  const { t } = useTranslation();
  const [activePanel, setActivePanel] = useState("bestiary");
  const [modalItem, setModalItem] = useState(null);
  const navigate = useNavigate();

  const [gridItems, setGridItems] = useState([
    { id: "favs", title: t("favorites"), icon: iconFavs, path: "/favoritos" },
    {
      id: "items",
      title: t("only_items"),
      icon: iconItems,
      path: "/?filter=items",
    },
    { id: "empty1", title: t("empty"), icon: "", path: "" },
    {
      id: "mobs",
      title: t("only_mobs"),
      icon: iconMobs,
      path: "/?filter=mobs",
    },
    { id: "empty2", title: t("empty"), icon: "", path: "" },
    { id: "skins", title: t("skin_creator"), icon: iconSkins, path: "/skins" },
    { id: "empty3", title: t("empty"), icon: "", path: "" },
    { id: "empty4", title: t("empty"), icon: "", path: "" },
    { id: "empty5", title: t("empty"), icon: "", path: "" },
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const scrollToSearch = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newGrid = [...gridItems];

    const temp = newGrid[draggedIndex];
    newGrid[draggedIndex] = newGrid[targetIndex];
    newGrid[targetIndex] = temp;

    setGridItems(newGrid);
    setDraggedIndex(null);
  };

  return (
    <>
      <div className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 -mt-4 lg:-mt-8 overflow-hidden border-b-8 border-black mb-12">
        <div
          className={`flex w-[200%] transition-transform duration-700 ease-in-out ${
            activePanel === "bestiary" ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          {/* ================= PANEL 1: HERO ================= */}
          <div
            className="w-1/2 relative flex flex-col items-center justify-center px-4 min-h-[450px] md:min-h-[600px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            <div className="relative z-10 flex flex-col items-center w-full mt-8">
              <div className="bg-transparent z-10 cursor-default px-4 mb-10 md:mb-14">
                <h1 className="minecraft-title text-5xl md:text-7xl lg:text-[6rem] uppercase text-center leading-[1.1] tracking-wider transition-transform duration-300 hover:scale-105">
                  MINECRAFT
                  <br />
                  <span className="text-[#3ed844]">NOCODE EDITION</span>
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <button
                  onClick={scrollToSearch}
                  className="border-4 border-black bg-white text-black px-8 py-4 font-black uppercase flex items-center justify-center gap-4 hover:bg-gray-100 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  <span className="text-2xl">
                    <img
                      src={iconEarth}
                      alt="Tierra"
                      className="w-6 h-6 object-contain"
                    />
                  </span>{" "}
                  {t("search_database")}
                </button>

                <button
                  onClick={() => setActivePanel("portal")}
                  className="border-4 border-black bg-black text-white px-8 py-4 font-black uppercase flex items-center justify-center gap-4 hover:bg-gray-800 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  {t("portal_table")} <span className="text-2xl">➔</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= PANEL 2: PORTAL TABLE ================= */}
          <div
            className="w-1/2 relative flex flex-col items-center justify-center py-12 px-4 md:py-16 min-h-[450px] md:min-h-[600px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            <div className="w-[95%] sm:w-full max-w-2xl flex flex-col items-center justify-center py-10 px-4 md:px-12 relative bg-white border-4 md:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <h2
                className="text-2xl md:text-4xl font-black uppercase tracking-widest mb-2 flex items-center gap-3 text-black text-center"
                style={{ textShadow: "none" }}
              >
                [ {t("portal_table")} ]
              </h2>
              <p className="text-gray-500 font-bold text-center max-w-md mb-8 uppercase text-[10px] md:text-sm tracking-widest">
                {t("portal_desc")}
              </p>

              <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4 border-4 md:border-8 border-black bg-gray-200 max-w-[450px] w-full">
                {gridItems.map((slot, index) => {
                  const isEmpty = slot.id.startsWith("empty");
                  const isDragging = draggedIndex === index;

                  return (
                    <div
                      key={slot.id + index}
                      draggable={!isEmpty}
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      onClick={() => {
                        if (!isEmpty) setModalItem(slot);
                      }}
                      className={`relative aspect-square border-4 border-black flex flex-col items-center justify-center p-2 text-center transition-all ${
                        isEmpty
                          ? "bg-gray-100 text-gray-300"
                          : "bg-white cursor-grab active:cursor-grabbing hover:bg-gray-50"
                      } ${isDragging ? "opacity-30 scale-95" : "opacity-100 scale-100"}`} // Efecto visual al arrastrar
                    >
                      {isEmpty ? (
                        <span className="font-bold text-[10px] md:text-xs tracking-widest opacity-50">
                          {slot.title}
                        </span>
                      ) : (
                        <>
                          <img
                            src={slot.icon}
                            alt={slot.title}
                            className="w-10 h-10 md:w-16 md:h-16 object-contain mb-2 drop-shadow-md pointer-events-none" // pointer-events-none evita bugs al arrastrar imágenes
                            style={{ imageRendering: "pixelated" }}
                          />
                          <span className="font-black text-[9px] md:text-xs uppercase tracking-wider text-black pointer-events-none">
                            {slot.title}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setActivePanel("bestiary")}
                className="mt-10 border-4 border-black bg-white text-black px-6 py-3 font-black uppercase flex items-center gap-2 hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <span className="text-xl inline-block rotate-180">➔</span>{" "}
                {t("go_back")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {modalItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onMouseDown={() => setModalItem(null)}
        >
          <div
            className="bg-white border-8 border-black p-6 w-full max-w-sm shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl md:text-2xl font-black uppercase mb-6 text-center text-black tracking-widest ![text-shadow:none] ![filter:none]">
              [ {t("go_to")}: {modalItem.title} ]
            </h3>

            <div className="grid grid-cols-3 gap-2 border-8 border-black bg-gray-300 p-2 md:p-4 mb-8 w-full aspect-square shadow-inner">
              {gridItems.map((slot, index) => {
                const isActive = slot.id === modalItem.id;
                const isEmpty = slot.id.startsWith("empty");

                return (
                  <div
                    key={index}
                    className={`border-4 border-black flex flex-col items-center justify-center p-1 ${
                      isActive
                        ? "bg-black cursor-pointer shadow-[inset_0px_0px_10px_rgba(255,255,255,0.2)]"
                        : "bg-white"
                    }`}
                    onClick={() => {
                      if (isActive) {
                        setModalItem(null);
                        navigate(slot.path);
                      }
                    }}
                  >
                    {isActive ? (
                      <>
                        <img
                          src={slot.icon}
                          alt="icon"
                          className="w-6 h-6 md:w-10 md:h-10 mb-1 object-contain"
                          style={{
                            imageRendering: "pixelated",
                            filter: "brightness(0) invert(1)",
                          }}
                        />
                        <span className="text-[9px] md:text-xs font-black uppercase text-white tracking-widest border-b-2 border-white pb-[2px] ![text-shadow:none]">
                          {t("enter")}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-[8px] md:text-[10px] text-gray-200 opacity-50 ![text-shadow:none]">
                        {isEmpty ? slot.title : t("empty")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setModalItem(null)}
              className="w-full border-4 border-black bg-white text-black py-4 font-black uppercase hover:bg-gray-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all tracking-widest ![text-shadow:none]"
            >
              [ {t("close")} ]
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
