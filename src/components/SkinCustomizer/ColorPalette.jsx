import React from "react";

const ColorPalette = ({
  title,
  subtitle,
  colors,
  selectorColor,
  onColorSelect,
}) => {
  return (
    <div>
      <h3
        className="text-lg font-bold mb-3 flex justify-between items-center text-[#000000]"
        style={{ textShadow: "none" }}
      >
        <span>{title}</span>
        <span className="text-sm font-normal text-[#9ca3af] border-2 border-[#9ca3af] px-2 py-1">
          #HEX
        </span>
      </h3>

      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`w-10 h-11 md:w-12 md:h-12 border-2 rounded-lg transition-all hover:scale-110 ${
              selectorColor === color
                ? "border-[#4d924c] shadow-[inset_0px_0px_0px_2px_white]"
                : "border-[#000000] opacity-80 hover:opacity-100"
            }`}
            style={{ backgroundColor: color }}
            title={`${title}: ${color}`}
          >
            {selectorColor === color && (
              <span className="flex items-center justify-center h-full text-white drop-shadow-md font-bold text-sm"></span>
            )}
          </button>
        ))}
      </div>

      {subtitle && <p className="text-sm text-[#9ca3af] mt-2">{subtitle}</p>}
    </div>
  );
};

export default ColorPalette;
