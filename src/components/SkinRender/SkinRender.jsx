import React from "react";
import { TOPS, BOTTOMS, SHOES } from "../SkinCustomizer/SkinCustomizer";

import cabezaImg from "../../assets/skin/cabeza.png";
import peloImg from "../../assets/skin/pelo.png";
import torsoImg from "../../assets/skin/torso.png";
import piernasImg from "../../assets/skin/piernas.png";
import brazoDerecho from "../../assets/skin/brazoDerecho.png";
import brazoIzquierdo from "../../assets/skin/brazoIzquierdo.png";

const SkinRender = ({ currentSkin }) => {
  const selectedTop = TOPS.find((item) => item.id === currentSkin?.topId);
  const selectedBottom = BOTTOMS.find(
    (item) => item.id === currentSkin?.bottomId,
  );
  const selectedShoes = SHOES.find((item) => item.id === currentSkin?.shoesId);

  return (
    <div
      className="flex flex-col items-center transition-all duration-300 origin-center"
      style={{ transform: `scale(${currentSkin.height / 50})` }}
    >
      <div
        className="relative w-16 h-16 z-30"
        style={{ backgroundColor: currentSkin.skinColor }}
      >
        <img
          src={cabezaImg}
          alt="Cara"
          className="absolute inset-0 w-full h-full z-10"
          style={{ imageRendering: "pixelated" }}
        />
        <div
          className="absolute inset-0 w-full h-full z-40"
          style={{
            backgroundColor: currentSkin.hairColor,
            WebkitMaskImage: `url(${peloImg})`,
            maskImage: `url(${peloImg})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        ></div>
      </div>

      <div className="flex flex-row w-32 h-24 z-20 relative">
        <div
          className="w-8 h-24"
          style={{
            backgroundColor: currentSkin.skinColor,
            WebkitMaskImage: `url(${brazoIzquierdo})`,
            maskImage: `url(${brazoIzquierdo})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        ></div>

        <div
          className="relative w-16 h-24"
          style={{
            backgroundColor: currentSkin.skinColor,
            WebkitMaskImage: `url(${torsoImg})`,
            maskImage: `url(${torsoImg})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        ></div>

        <div
          className="w-8 h-24"
          style={{
            backgroundColor: currentSkin.skinColor,
            WebkitMaskImage: `url(${brazoDerecho})`,
            maskImage: `url(${brazoDerecho})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            imageRendering: "pixelated",
          }}
        ></div>

        {selectedTop && (
          <img
            src={selectedTop.image}
            alt="top"
            className="absolute inset-0 w-full h-full object-contain [image-rendering:pixelated] z-10 origin-top scale-x-[3.1] scale-y-[2.95] -translate-y-[88px] pointer-events-none"
          />
        )}
      </div>

      <div
        className="relative w-16 h-24 z-10"
        style={{
          WebkitMaskImage: `url(${piernasImg})`,
          maskImage: `url(${piernasImg})`,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          imageRendering: "pixelated",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: currentSkin.skinColor }}
        />

        {selectedBottom && (
          <img
            src={selectedBottom.image}
            alt="bottom"
            className="absolute inset-0 w-full h-full object-contain [image-rendering:pixelated] z-10 origin-top scale-x-[3.60] scale-y-[3.1] -translate-y-[112px] -translate-x-[4px] pointer-events-none"
          />
        )}

        {selectedShoes && (
          <img
            src={selectedShoes.image}
            alt="shoes"
            className="absolute inset-0 w-full h-full object-contain [image-rendering:pixelated] z-20 origin-bottom scale-x-[3.4] scale-y-[3.2] -translate-x-[8px] translate-y-24 pointer-events-none"
          />
        )}
      </div>
    </div>
  );
};

export default SkinRender;
