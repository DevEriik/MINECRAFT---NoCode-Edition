
export const Notificacion = ({ mensaje, tipo }) => {

    if (!mensaje) return null;

    const esAgregado = tipo === 'agregar';
    const colorFondo = esAgregado ? 'bg-[#14532D]' : 'bg-[#7F1D1D]'
    const icono = esAgregado ? '❤️': '🗑️';

    return (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-3 border-4 border-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${colorFondo}`}>
            <span className="text-xl">{icono}</span>
            <p className="text-sm uppercase tracking-wide">{mensaje}</p>
        </div>
    );
};