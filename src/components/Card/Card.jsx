export const Card = ({item}) => {
    return (
        <div className=" border-4 border-black p-4 bg-gray-400 flex flex-col overflow-hidden
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:bg-gray-200 transition-colors"> 
           
           <div className="relative h-48 bg-gray-1 flex items-center justify-center border-b-4 border-black">
            <span className="absolute top-1 left-1 bg-black text-white px-3 py-1.5 
            text-[15px] font-bold font-bold">
                {item.type}
            </span>

                {item.image ? (
                    <img src={item.image} alt={item.name} className="object-contain w-full h-full"/>
                ) : (
                    <span className="text-gray-400 font-bold text-sm">IMG NULL</span>
                )}
            </div>


        <div className="bg-gray-100 p-3 flex flex-col gap-2">
            <h3 className="text-black font-bold  tracking-tight border-b-2 border-gray-10 pb-1" style={{ textShadow: "none" }}>
                 NAME: {item.name.toUpperCase()} 
            </h3>
        
            <div className="flex flex-col gap-1">
                {/* me falta agregar como la infor de cada item o mob  */}
            </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-400 p-3 bg-white flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-2xl text-gray-600 hover:text-red-500 transition-colors"> ♡ </span> 
            <span className="text-sm font-bold text-gray-900">FAVORITO</span>
        </div>
        </div>
    )
}