import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    // Mientras chequea el token, mostramos algo de carga
    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-screen font-bold text-xl">
            Cargando permisos...
        </div>
        );
    }

    // Si no hay usuario logueado, o si el usuario existe pero NO es ADMIN, lo pateamos al Home
    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    // Si es ADMIN, lo dejamos pasar al contenido (children)
    return children;
};

export default AdminRoute;
