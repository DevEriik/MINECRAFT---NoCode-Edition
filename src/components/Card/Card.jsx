import { Link } from "react-router-dom";

export const Card = ({ item }) => {
  return (
    <Link
      to={`/item/${item.id}`}
      className="block border-4 border-black p-4 bg-[#4B4B4B] flex flex-col overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-200 transition-colors cursor-pointer group"
    >
      <div
        className=" border-4 border-black p-4 bg-[#4B4B4B] flex flex-col overflow-hidden
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:bg-gray-200 transition-colors"
      >
        <div className="relative h-48 bg-gray-1 flex items-center justify-center border-b-4 border-black">
          <span
            className={`absolute top-1 left-1 px-3 py-1.5 
            text-[15px] font-bold font-bold ${item.type === "ITEM" ? "bg-[#2E7D32]" : "bg-[#1565C0]"}`}
          >
            {item.type}
          </span>

          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="object-contain w-full h-full"
            />
          ) : (
            <span className="text-gray-400 font-bold text-sm">IMG NULL</span>
          )}
        </div>

        <div className="bg-gray-100 p-3 flex flex-col gap-2">
          <h3
            className="text-black font-bold  tracking-tight border-b-2 border-gray-10 pb-1"
            style={{ textShadow: "none" }}
          >
            NOMBRE: {item.name.toUpperCase()}
          </h3>

          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-bold text-gray-600 uppercase">
              <span className="text-black">COMPORTAMIENTO:</span>{" "}
              {item.behavior}
            </p>
            <p className="text-[15px] font-bold text-gray-500 uppercase">
              <span className="text-black">TAMAÑO:</span> {item.size}
            </p>
            <p className="text-[15px] text-gray-700 italic leading-tight border-t border-gray-300 pt-2">
              {item.description}
            </p>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-400 p-3 bg-white flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-2xl text-gray-600 hover:text-red-500 transition-colors">
            {" "}
            ♡{" "}
          </span>
          <span className="text-sm font-bold text-gray-900">FAVORITO</span>
        </div>
      </div>
    </Link>
  );
};
