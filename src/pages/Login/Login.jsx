import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        let isValid = true;

        if (!formData.email.trim()) {
        newErrors.email = "El correo es obligatorio.";
        isValid = false;
        }

        if (!formData.password) {
        newErrors.password = "La contraseña es obligatoria.";
        isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
        setIsSubmitting(true);
        setSubmitError("");

        console.log("¡Intentando iniciar sesión con:", formData.email);

        try {
            await login(formData.email, formData.password);
            navigate("/"); 
        } catch (error) {
            setIsSubmitting(false);
            if (error.message.includes("401") || error.message.toLowerCase().includes("incorrectos")) {
            setSubmitError("Email o contraseña incorrectos.");
            } else {
            setSubmitError("Error de conexión con el servidor.");
            }
        }
        }
    };

    const getBorderClass = (fieldName) => {
        if (errors[fieldName]) return "border-red-500";
        if (formData[fieldName]) return "border-green-500";
        return "border-black";
    };

    return (
        <div className="bg-gradient-to-r from-[#064E3B] via-[#0F766E] to-[#083344] min-h-[calc(100vh-100px)] w-full flex items-center justify-center py-12">

        <div className="relative z-10 max-w-xl mx-auto w-full pl-4 pr-6 sm:px-8">
            <div className="text-center mb-6">
            <h2 className="text-5xl font-extrabold text-white uppercase tracking-wider drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                Iniciar Sesión
            </h2>
            <p className="text-gray-200 text-xl mt-2 font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                ¡Entrá para gestionar tus favoritos!
            </p>
            </div>

            <div className="bg-[#1f2937] border-4 border-black p-8 py-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {submitError && (
                <div className="text-center mb-6 font-bold text-red-500 bg-red-950 border-4 border-red-500 p-4">
                {submitError}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 text-white mt-2"
            >
                <FormInput
                label="Correo Electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                borderClass={getBorderClass("email")}
                placeholder="steve@minecraft.com"
                />

                <FormInput
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                borderClass={getBorderClass("password")}
                placeholder="********"
                />

                <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 bg-sky-900 hover:bg-sky-800 border-4 border-black text-white font-extrabold text-xl uppercase py-4 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] disabled:opacity-50"
                >
                {isSubmitting ? "Ingresando..." : "Ingresar"}
                </button>

                <p className="text-center mt-4 text-gray-300 font-bold">
                ¿No estás registrado?{" "}
                <Link
                    to="/register"
                    className="text-green-400 hover:text-green-300 underline"
                >
                    ¡Forjá tu cuenta acá!
                </Link>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
