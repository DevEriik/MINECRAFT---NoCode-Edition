import {useState, useEffect} from 'react'
import { Notificacion } from '../Notificacion/Notificacion'
import corazon from '../../assets/corazonRojo/corazon.png'

export const Card = ({item, onEliminar}) => {

    const [aviso, setAviso] = useState({mensaje:'', tipo:''});
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        const favGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
        const exist = favGuardados.some(fav=>fav.id === item.id)
        setEsFavorito(exist)
    }, [item.id]);

    const mostrarNotificacion = (texto, accion) =>{
        setAviso({mensaje:texto, tipo:accion})

        setTimeout(()=> {
            setAviso({mensaje:'', tipo:''})
        }, 5000);
    }

    const manejarFavorito = () => {
        let favGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (esFavorito){
            favGuardados = favGuardados.filter(fav => fav.id !== item.id)
            mostrarNotificacion(`Se elimino ${item.name} de favoritos`, `eliminar`);
            localStorage.setItem('favoritos', JSON.stringify(favGuardados))
            setEsFavorito(false)
            if(onEliminar){
                setTimeout(()=> {
                    onEliminar(item.id);
                }, 2000)
            }
        }else{
            favGuardados.push(item)
            mostrarNotificacion(`¡${item.name} se guardo en favoritos!`, `agregar`);
        }
        localStorage.setItem('favoritos', JSON.stringify(favGuardados))
        setEsFavorito(!esFavorito)
    }

    return (
        <div className="w-full h-[540px] border-4 border-black p-4 bg-[#4B4B4B] flex flex-col overflow-hidden
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:bg-gray-500 transition-colors"> 
           
           <div className="relative h-52 flex'shrink-0  bg-gray-1 flex items-center justify-center mb-4">
                <span className={`absolute top-1 left-1 px-3 py-1.5 text-[15px] font-bold font-bold
                     ${item.type === 'ITEM' ? 'bg-[#2E7D32]' : 'bg-[#1565C0]' }`}>
                    {item.type}
                </span>
                {item.image ? (
                    <img src={item.image} alt={item.name} className="object-contain w-full h-full"/>
                ) : (
                    <span className="text-gray-400 font-bold text-sm">IMG NULL</span>
                )}
            </div>

            <div className="bg-gray-100 p-3 h-[200px] flex flex-col gap-2">
                <h3 className="text-black font-bold  tracking-tight border-b-2 border-gray-10 pb-1" style={{ textShadow: "none" }}>
                    NOMBRE: {item.name.toUpperCase()} 
                </h3>
                <div className="flex flex-col gap-1 flex-grow overflow-hidden">
                    <p className="text-[15px] font-bold text-gray-800 uppercase">
                        <span className="text-black">
                            {item.type === 'MOB' ? 'COMPORTAMIENTO: ' : 'UTILIDAD: '}
                        </span> 
                        {item.behavior} 
                    </p>

                    <p className="text-[15px] font-bold text-gray-800 uppercase">
                        <span className="text-black">
                            {item.type === 'MOB' ? 'TAMAÑO: ' : 'TIPO: '}
                        </span> 
                        {item.size} 
                    </p>

                    <p className="text-[17px] text-gray-700 leading-tight border-t border-gray-300 pt-2 overflow-y-auto pr-1 custom-scrollbar">
                        {item.description}
                    </p>
                </div>
            </div>

            {esFavorito ? (
                <div 
                    onClick={manejarFavorito}
                    className='w-[90%] mx-auto mt-auto mb-3 py-2 px-4 bg-[#3b3b3b]  bg-gray-650 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-700 rounded-full transition-colors'
                >
                    <img 
                        src={corazon} 
                        alt="Corazón rojo"
                        className="w-7 h-7 object-contain"
                        style={{ imageRendering: 'pixelated' }} 
                    />
                    <span className="text-sm text-white font-bold text-gray-bold text-gray-500  hover:bg-gray-700  uppercase">
                        En Favoritos
                    </span>
                </div>
            ) : (
                <div 
                    onClick={manejarFavorito}
                    className='w-[90%] mx-auto mt-auto mb-3 py-2 px-4 bg-[#3b3b3b] flexitems-center justify-center cursor-pointer hover:bg-gray-700 transition-colors rounded-full'
                >
                    <span className='text-sm text-white font-bold uppercase '>
                        + Agregar a favoritos
                    </span>
                </div>
            )}
            <Notificacion mensaje={aviso.mensaje} tipo={aviso.tipo} />
        </div>
    )
}