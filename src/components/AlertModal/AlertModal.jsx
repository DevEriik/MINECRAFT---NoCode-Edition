const AlertModal = ({ isOpen, type, title, message, onConfirm, onClose }) => {
    if (!isOpen) return null; 

    const isError = type === "error";
    const isSuccess = type === "success";
    const isConfirm = type === "confirm";

    const borderTheme = isError
        ? "border-red-600"
        : isSuccess
        ? "border-[#00FF00]"
        : "border-gray-400";
    const textTheme = isError
        ? "text-red-500"
        : isSuccess
        ? "text-[#00FF00]"
        : "text-white";

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
        <div
            className={`bg-[#091F22] border-4 ${borderTheme} p-8 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
        >
            <h3
            className={`text-2xl font-black uppercase mb-4 tracking-wider ${textTheme}`}
            >
            {title}
            </h3>

            <p className="mb-10 text-white font-medium text-lg">{message}</p>

            <div className="flex justify-end gap-4">
            {isConfirm ? (
                <>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-black uppercase border-2 border-black border-b-4 border-r-4 active:border-b-2 active:border-r-2 active:translate-y-[2px] active:translate-x-[2px] transition-all"
                >
                    CANCELAR
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-black uppercase border-2 border-black border-b-4 border-r-4 active:border-b-2 active:border-r-2 active:translate-y-[2px] active:translate-x-[2px] transition-all"
                >
                    SÍ, ELIMINAR
                </button>
                </>
            ) : (
                <button
                onClick={onClose}
                className={`px-8 py-2 text-white font-black uppercase border-2 border-black border-b-4 border-r-4 active:border-b-2 active:border-r-2 active:translate-y-[2px] active:translate-x-[2px] transition-all
                    ${isError ? "bg-red-600 hover:bg-red-500" : "bg-[#005C6E] hover:bg-[#007A8F]"}`}
                >
                ACEPTAR
                </button>
            )}
            </div>
        </div>
        </div>
    );
};

export default AlertModal;
