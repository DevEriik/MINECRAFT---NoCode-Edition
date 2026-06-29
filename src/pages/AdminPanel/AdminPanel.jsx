import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AddCardForm from "../../components/AddCardForm/AddCardForm";
import AlertModal from "../../components/AlertModal/AlertModal"; 

const API_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
    const location = useLocation();
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cardToEdit, setCardToEdit] = useState(location.state?.cardToEdit || null);
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "confirm", 
        title: "",
        message: "",
        idToDelete: null,
        typeToDelete: null,
    });

    const fetchCards = async () => {
        setIsLoading(true);
        try {
        const [itemsRes, mobsRes] = await Promise.all([
            fetch(`${API_URL}/items`),
            fetch(`${API_URL}/mobs`),
        ]);

        const itemsData = itemsRes.ok ? await itemsRes.json() : [];
        const mobsData = mobsRes.ok ? await mobsRes.json() : [];

        const combinedCards = [
            ...itemsData.map((item) => ({ ...item, cardType: "Ítem" })),
            ...mobsData.map((mob) => ({ ...mob, cardType: "Mob" })),
        ];

        setCards(combinedCards);
        } catch (error) {
        console.error("Error al cargar las cartas:", error);
        } finally {
        setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    useEffect(() => {
        if (location.state?.cardToEdit) {
            setCardToEdit(location.state.cardToEdit);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const openDeleteModal = (id, type) => {
        setModalConfig({
        isOpen: true,
        type: "confirm",
        title: "Confirmar Eliminación",
        message: `¿Estás seguro de que querés eliminar este ${type}? Esta acción no se puede deshacer.`,
        idToDelete: id,
        typeToDelete: type,
        });
    };

    const processDelete = async () => {
        const { idToDelete, typeToDelete } = modalConfig;
        const endpoint = typeToDelete === "Mob" ? "mobs" : "items";

        try {
        const response = await fetch(`${API_URL}/${endpoint}/${idToDelete}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setCards(cards.filter((card) => (card.id || card._id) !== idToDelete));
            setModalConfig({
            isOpen: true,
            type: "success",
            title: "¡Eliminado!",
            message: `El ${typeToDelete} fue eliminado correctamente de la base de datos.`,
            idToDelete: null,
            typeToDelete: null,
            });
        } else {
            setModalConfig({
            ...modalConfig,
            type: "error",
            title: "Error al eliminar",
            message: `Ocurrió un problema al intentar borrar el ${typeToDelete}.`,
            });
        }
        } catch (error) {
        console.error("Error al eliminar:", error);
        setModalConfig({
            ...modalConfig,
            type: "error",
            title: "Error de Conexión",
            message: "No pudimos contactar al servidor. Revisá tu conexión.",
        });
        }
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="p-8 mt-20 text-white max-w-6xl mx-auto">

        <div className="mb-12">
            <AddCardForm  
                cardToEdit={cardToEdit} 
                clearEditMode={() => setCardToEdit(null)} 
                onEntityCreated={fetchCards}
            />
        </div>

        <section className="bg-[#0e1719] p-6 rounded-lg border border-gray-800 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400">
            Inventario Actual
            </h2>

            {isLoading ? (
            <p className="text-center text-gray-400 py-10">Cargando cartas...</p>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-700 text-gray-400">
                    <th className="py-3 px-4 uppercase text-sm">Nombre</th>
                    <th className="py-3 px-4 uppercase text-sm">Tipo</th>
                    <th className="py-3 px-4 uppercase text-sm text-right">
                        Acciones
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {cards.length === 0 ? (
                    <tr>
                        <td colSpan="3" className="py-8 text-center text-gray-500">
                        No hay cartas creadas todavía.
                        </td>
                    </tr>
                    ) : (
                    cards.map((card) => (
                        <tr
                        key={`${card.cardType}-${card.id || card._id}`}
                        className="border-b border-gray-800 hover:bg-[#152326] transition-colors"
                        >
                        <td className="py-3 px-4 font-medium">
                            {card.name || card.nombre || "Sin nombre"}
                        </td>
                        <td className="py-3 px-4">
                            <span
                            className={`px-2 py-1 rounded text-xs font-bold ${card.cardType === "Mob" ? "bg-red-900/50 text-red-400" : "bg-blue-900/50 text-blue-400"}`}
                            >
                            {card.cardType}
                            </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                            <button 
                                onClick={() => {
                                    setCardToEdit(card);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="text-blue-400 hover:text-blue-300 font-bold mr-4 px-2 py-1 rounded transition-colors"
                            >
                                EDITAR
                            </button>
                            <button
                            onClick={() =>
                                openDeleteModal(card.id || card._id, card.cardType)
                            }
                            className="text-red-500 hover:text-red-400 font-bold px-2 py-1 rounded transition-colors"
                            >
                            ELIMINAR
                            </button>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            )}
        </section>

        <AlertModal
            isOpen={modalConfig.isOpen}
            type={modalConfig.type}
            title={modalConfig.title}
            message={modalConfig.message}
            onClose={closeModal}
            onConfirm={processDelete}
        />
        </div>
    );
};

export default AdminPanel;
