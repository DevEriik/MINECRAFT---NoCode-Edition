import { useState } from "react"; 
import FormInput from "../../components/FormInput/FormInput";
import { Link } from "react-router-dom";
import register from "../../assets/register/register.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El formato no es válido. Ej: steve@gmail.com";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Debe tener al menos 6 caracteres.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      setSubmitError("");
      setSuccessMessage("");

      // --- SIMULACIÓN DE ENVÍO  
      console.log("¡Datos listos para enviar al Backend!", formData);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage("¡Bienvenido, te registraste con éxito! ");
        setFormData({ name: "", email: "", password: "" });
      }, 1500);

    }
  };

  const getBorderClass = (fieldName) => {
    if (errors[fieldName]) return "border-red-500";
    if (formData[fieldName]) return "border-green-500";
    return "border-black";
  };

  return (
    <div
      className="relative w-full min-h-[calc(100vh-100px)] flex items-center justify-center bg-cover bg-center bg-no-repeat py-12"
      style={{ backgroundImage: `url(${register})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 max-w-xl mx-auto w-full pl-4 pr-6 sm:px-8">
        <div className="text-center mb-6">
          <h2 className="text-5xl font-extrabold text-white uppercase tracking-wider drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            ¡Únete a nuestro Servidor!
          </h2>
          <p className="text-gray-200 text-xl mt-2 font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Creá tu cuenta para guardar favoritos
          </p>
        </div>

        <div className="bg-[#1f2937] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {submitError && (
            <div className="text-center mb-6 font-bold text-red-500 bg-red-950 border-4 border-red-500 p-4">
              {submitError}
            </div>
          )}
          {successMessage && (
            <div className="text-center mb-6 font-bold text-green-400 bg-green-950 border-4 border-green-500 p-4">
              {successMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-8 text-white mt-4"
          >
            <FormInput
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              borderClass={getBorderClass("name")}
              placeholder="Ingresa tu nombre de usuario"
            />

            <FormInput
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              borderClass={getBorderClass("email")}
              placeholder="steve@gmail.com"
            />

            <FormInput
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              borderClass={getBorderClass("password")}
              placeholder="Mínimo 6 caracteres"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 bg-sky-900 hover:bg-sky-800 border-4 border-black text-white font-extrabold text-xl uppercase py-4 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Forjando..." : "Registrarse"}
            </button>

            <p className="text-center mt-4 text-gray-300 font-bold">
              ¿Ya tenés una cuenta?{" "}
              <Link
                to="/login"
                className="text-green-400 hover:text-green-300 underline drop-shadow-md"
              >
                ¡Iniciá sesión acá!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
