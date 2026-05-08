import React from "react";

const WardrobeGrid = ({ title, items, selectedId, onSelect }) => {
  return (
    <div className="mb-4">
      <h3
        className="text-lg font-bold mb-3 text-[#000000]"
        style={{ textShadow: "none" }}
      >
        {title}
      </h3>

      <div className="grid grid-cols-4 gap-3">
        {items.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              title={item.name}
              className={`relative flex flex-col items-center p-2 border-4 transition-all hover:-translate-y-1 bg-white ${
                isSelected
                  ? "border-[#4d924c] shadow-[4px_4px_0px_0px_rgba(77,146,76,0.3)]"
                  : "border-[#e5e7eb] hover:border-[#9ca3af] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
              }`}
            >
              <div className="w-full h-12 md:h-16 flex items-center justify-center overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain [image-rendering:pixelated]"
                  />
                )}
              </div>

              {isSelected && (
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#4d924c] text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm z-10">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WardrobeGrid;
