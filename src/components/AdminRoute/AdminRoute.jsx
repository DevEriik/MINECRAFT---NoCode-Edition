import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-screen font-bold text-xl">
            Cargando permisos...
        </div>
        );
    }

    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
