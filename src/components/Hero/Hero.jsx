import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import heroVideo from "../../assets/hero/hero-video.mp4";
import iconEarth from "../../assets/icons/earth.png";
import iconFavs from "../../assets/corazonRojo/corazon.png";
import iconItems from "../../assets/icons/diamond_chestplate.png";
import iconMobs from "../../assets/icons/creeper_head.png";
import iconSkins from "../../assets/icons/herobrine.png";

const Hero = () => {
  const { t } = useTranslation();
  const [activePanel, setActivePanel] = useState("bestiary");
  const [modalItem, setModalItem] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
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
    {
      id: "skins",
      title: t("skin_creator"),
      icon: iconSkins,
      path: "/crear-skin",
    },
    { id: "empty3", title: t("empty"), icon: "", path: "" },
    { id: "empty4", title: t("empty"), icon: "", path: "" },
    { id: "empty5", title: t("empty"), icon: "", path: "" },
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const scrollToSearch = () => {
    window.scrollBy({ top: 800, behavior: "smooth" });
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

  // === EVENTOS PARA CELULARES (TOUCH) ===
  const handleTouchStart = (index) => {
    setDraggedIndex(index);
  };

  const handleTouchEnd = (e) => {
    if (draggedIndex === null) return;
    const touch = e.changedTouches[0];
    const targetElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY,
    );

    if (targetElement) {
      const dropZone = targetElement.closest("[data-index]");
      if (dropZone) {
        const targetIndex = parseInt(dropZone.getAttribute("data-index"), 10);
        if (targetIndex !== draggedIndex) {
          const newGrid = [...gridItems];
          const temp = newGrid[draggedIndex];
          newGrid[draggedIndex] = newGrid[targetIndex];
          newGrid[targetIndex] = temp;
          setGridItems(newGrid);
        }
      }
    }
    setDraggedIndex(null);
  };

  const handleCloseModal = (slot = null) => {
    setIsClosing(true);

    setTimeout(() => {
      setModalItem(null);
      setIsClosing(false);

      if (slot && slot.path) {
        navigate(slot.path);

        if (slot.path.includes("filter")) {
          setTimeout(() => {
            scrollToSearch();
          }, 50);
        }
      }
    }, 200);
  };

  return (
    <>
      <div className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 -mt-4 lg:-mt-8 overflow-hidden border-b-8 border-black mb-12 min-h-[450px] md:min-h-[600px]">
        {/* ================= HERO VIDEO ================= */}
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        <div className="absolute inset-0 bg-black/75 z-0 pointer-events-none"></div>

        <div
          className={`relative z-10 flex w-[200%] transition-transform duration-700 ease-in-out h-full ${
            activePanel === "bestiary" ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          {/* ================= PANEL 1: HERO ================= */}
          <div className="w-1/2 relative flex flex-col items-center justify-center px-4 py-12">
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
                  className="border-4 border-black bg-[#4d924c] text-white px-8 py-4 font-black uppercase flex items-center justify-center gap-4 hover:bg-[#3ed844] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  {t("portal_table")} <span className="text-2xl">➔</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= PANEL 2: PORTAL TABLE ================= */}
          <div className="w-1/2 relative flex flex-col items-center justify-center py-12 px-2 sm:px-4 md:py-16">
            <div className="w-full max-w-2xl flex flex-col items-center justify-center py-8 px-3 sm:px-4 md:px-12 relative bg-[#8B5A2B] border-4 md:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <h2
                className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-widest mb-2 flex items-center justify-center text-white text-center drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full"
                style={{ textShadow: "none" }}
              >
                [ {t("portal_table")} ]
              </h2>
              <p className="text-[#e0e0e0] font-bold text-center max-w-md mb-6 uppercase text-[8px] sm:text-[10px] md:text-sm tracking-widest drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] px-2">
                {t("portal_desc")}
              </p>

              <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 p-2 sm:p-3 md:p-4 border-4 md:border-8 border-black bg-[#4A2E15] max-w-[450px] w-full shadow-[inset_0px_8px_15px_rgba(0,0,0,0.6)]">
                {gridItems.map((slot, index) => {
                  const isEmpty = slot.id.startsWith("empty");
                  const isDragging = draggedIndex === index;

                  return (
                    <div
                      key={slot.id + index}
                      data-index={index}
                      draggable={!isEmpty}
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      onTouchStart={() => {
                        if (!isEmpty) handleTouchStart(index);
                      }}
                      onTouchEnd={handleTouchEnd}
                      onClick={() => {
                        if (!isEmpty) setModalItem(slot);
                      }}
                      className={`relative aspect-square w-full border-[3px] sm:border-4 border-black flex flex-col items-center justify-center p-0.5 sm:p-2 text-center transition-all overflow-hidden touch-none select-none ${
                        isEmpty
                          ? "bg-[#724722] text-[#4A2E15] shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.4)]"
                          : "bg-[#A66F3A] cursor-grab active:cursor-grabbing hover:bg-[#C28B52] shadow-[inset_4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                      } ${isDragging ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}
                    >
                      {isEmpty ? (
                        <span className="font-black text-[7px] sm:text-[10px] md:text-xs tracking-widest opacity-60">
                          {slot.title}
                        </span>
                      ) : (
                        <>
                          <img
                            src={slot.icon}
                            alt={slot.title}
                            className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 object-contain mb-0.5 sm:mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] pointer-events-none"
                            style={{ imageRendering: "pixelated" }}
                          />
                          <span className="font-black text-[6.5px] sm:text-[9px] md:text-xs uppercase tracking-wider text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] pointer-events-none leading-tight">
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
                className="mt-6 sm:mt-10 border-4 border-black bg-[#333333] text-white px-4 sm:px-6 py-2 sm:py-3 font-black uppercase flex items-center gap-2 hover:bg-[#444444] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-xs sm:text-base"
              >
                <span className="text-lg sm:text-xl inline-block rotate-180">
                  ➔
                </span>{" "}
                {t("go_back")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {modalItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onMouseDown={() => handleCloseModal()}
          style={{
            animation: isClosing
              ? "fadeOut 0.2s ease-in forwards"
              : "fadeIn 0.2s ease-out forwards",
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
              }
              @keyframes popIn {
                from { opacity: 0; transform: scale(0.8) translateY(20px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
              }
              @keyframes popOut {
                from { opacity: 1; transform: scale(1) translateY(0); }
                to { opacity: 0; transform: scale(0.8) translateY(20px); }
              }
            `}
          </style>

          <div
            className="bg-[#8B5A2B] border-8 border-black p-4 sm:p-6 w-full max-w-sm md:max-w-md shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center relative"
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              animation: isClosing
                ? "popOut 0.2s ease-in forwards"
                : "popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards",
            }}
          >
            <h3
              className="text-lg sm:text-xl md:text-2xl font-black uppercase mb-4 sm:mb-6 text-center text-white tracking-widest drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] leading-tight px-2"
              style={{ textShadow: "none" }}
            >
              [ {t("go_to")}: {modalItem.title} ]
            </h3>

            <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 border-4 sm:border-8 border-black bg-[#4A2E15] p-2 sm:p-3 md:p-4 mb-6 sm:mb-8 w-full shadow-[inset_0px_8px_15px_rgba(0,0,0,0.6)]">
              {gridItems.map((slot, index) => {
                const isActive = slot.id === modalItem.id;
                const isEmpty = slot.id.startsWith("empty");

                return (
                  <div
                    key={index}
                    className={`aspect-square w-full border-[3px] sm:border-4 border-black flex flex-col items-center justify-center p-0.5 sm:p-1 transition-all overflow-hidden ${
                      isActive
                        ? "bg-[#4d924c] cursor-pointer shadow-[inset_4px_4px_0px_rgba(255,255,255,0.4)] scale-110 z-10"
                        : isEmpty
                          ? "bg-[#724722] shadow-[inset_4px_4px_0px_rgba(0,0,0,0.4)] opacity-80"
                          : "bg-[#A66F3A] opacity-40 grayscale shadow-[inset_4px_4px_0px_rgba(255,255,255,0.2)]"
                    }`}
                    onClick={() => {
                      if (isActive) {
                        handleCloseModal(slot);
                      }
                    }}
                  >
                    {isActive ? (
                      <>
                        <img
                          src={slot.icon}
                          alt="icon"
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 mb-0.5 sm:mb-1 object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                          style={{
                            imageRendering: "pixelated",
                            filter: "brightness(0) invert(1)",
                          }}
                        />
                        <span
                          className="text-[8px] sm:text-[10px] md:text-sm font-black uppercase text-white tracking-widest border-b-[1px] sm:border-b-2 border-white pb-[2px] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] leading-none"
                          style={{ textShadow: "none" }}
                        >
                          {t("enter")}
                        </span>
                      </>
                    ) : (
                      <span
                        className={`font-black text-[6px] sm:text-[8px] md:text-[10px] text-center uppercase tracking-widest leading-tight ${
                          isEmpty ? "text-[#4A2E15]" : "text-black"
                        }`}
                      >
                        {isEmpty ? slot.title : slot.title}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => handleCloseModal()}
              className="w-full border-4 border-black bg-[#ff3333] text-white py-3 sm:py-4 font-black uppercase hover:bg-[#ff5555] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all tracking-widest text-sm sm:text-base md:text-lg"
              style={{ textShadow: "none" }}
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
