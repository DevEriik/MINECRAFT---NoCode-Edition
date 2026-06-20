import { useState } from "react";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import { create } from "../../services/api";
import { Translation } from "react-i18next";
import { describe } from "vitest";

const AddCardForm = ({ onEntityCreated }) => {
  const [entityType, setEntityType] = useState("item");
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    rarity: "",
    type: "",
    size: "",
    behavior: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const mapBackendErrors = (details) => {
    const newErrors = {};
    if (Array.isArray(details)) {
      details.forEach((err) => {
        const { field, message } = err;
        if (field.includes("name")) newErrors.name = message;
        else if (field.includes("imageUrl")) newErrors.imageUrl = message;
        else if (field.includes("description")) newErrors.description = message;
        else if (field.includes("rarity")) newErrors.rarity = message;
        else if (field.includes("type")) newErrors.type = message;
        else if (field.includes("health")) newErrors.size = message;
        else newErrors.general = message;
      });
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
      isValid = false;
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "No ingresar números.";
      isValid = false;
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Debe ingresar la URL de la imagen.";
      isValid = false;
    } else {
      try {
        new URL(formData.imageUrl);
      } catch (error) {
        newErrors.imageUrl = "El formato no es válido. Ej: https://ejemplo.com";
        isValid = false;
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = "Debe agregarle una descripción.";
      isValid = false;
    } else if (formData.description.trim().length < 15) {
      newErrors.description = "Debe tener al menos 15 caracteres.";
      isValid = false;
    }

    if (entityType === "item") {
      if (!formData.rarity) {
        newErrors.rarity = "Te faltó elegir la rareza.";
        isValid = false;
      }
      if (!formData.type) {
        newErrors.type = "Te faltó elegir el tipo.";
        isValid = false;
      }
    } else {
      if (!formData.size) {
        newErrors.size = "Te faltó elegir el tamaño.";
        isValid = false;
      }
      if (!formData.behavior) {
        newErrors.behavior = "Te faltó elegir el comportamiento.";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Datos validados y listos para enviar:", formData);
      setIsSubmitting(true);
      setSubmitError("");

      let payload = {};
      console.log("Despues del payload");
      if (entityType === "item") {
        payload = {
          imageUrl: formData.imageUrl,
          translations: [
            {
              lang: "es",
              name: formData.name,
              description: formData.description,
              rarity: formData.rarity,
            },
            {
              lang: "en",
              name: formData.name,
              description: formData.description,
              rarity: formData.rarity,
            },
          ],
        };
      } else {
        let health = 20;
        if (formData.size === "Pequeño") health = 10;
        else if (formData.size === "Mediano") health = 20;
        else if (formData.size === "Grande") health = 40;
        else if (formData.size === "Jefe") health = 100;

        payload = {
          imageUrl: formData.imageUrl,
          health,
          translations: [
            {
              lang: "es",
              name: formData.name,
              description: formData.description,
              type: formData.behavior,
            },
            {
              lang: "en",
              name: formData.name,
              description: formData.description,
              type: formData.behavior,
            },
          ],
        };
      }

      try {
        const entidad = entityType === "item" ? "items" : "mobs";
        console.log("Anteos del payload 2do");
        await create(entidad, payload);

        setFormData({
          name: "",
          imageUrl: "",
          description: "",
          rarity: "",
          type: "",
          size: "",
          behavior: "",
        });
        setErrors({});

        if (onEntityCreated) {
          onEntityCreated();
        }
      } catch (error) {
        console.error("Error al crear la entidad", error);
        if (error.status === 400 && error.details) {
          setErrors(mapBackendErrors(error.details));
        } else {
          setSubmitError(
            error.message ||
              "Ocurrio un error inesperado al conectar con el servidor",
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getBorderClass = (fieldName) => {
    if (errors[fieldName]) return "border-red-500";
    if (formData[fieldName]) return "border-green-500";
    return "border-black";
  };

  return (
    <div className="max-w-3xl mx-auto w-full mb-8 mt-8">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-white uppercase tracking-wider drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          🛠️ ¡Forja tu Inventario!
        </h2>
        <p className="text-gray-300 text-lg mt-2 font-bold ">
          Agregá un nuevo Ítem o Mob
        </p>
      </div>

      <div className="bg-[#1f2937] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-center items-center gap-10 mb-10 h-16">
          <button
            type="button"
            onClick={() => {
              setEntityType("item");
              setErrors({});
              setSubmitError("");
            }}
            className={`font-bold uppercase transition-all duration-200 ${entityType === "item" ? "px-8 py-3 text-lg bg-sky-900 border-4 border-cyan-950 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "px-5 py-2 text-sm bg-gray-600 text-white border-0 hover:bg-gray-500 hover:scale-105"}`}
          >
            ⛏️ Crear Ítem
          </button>
          <button
            type="button"
            onClick={() => {
              setEntityType("mob");
              setErrors({});
              setSubmitError("");
            }}
            className={`font-bold uppercase transition-all duration-200 ${entityType === "mob" ? "px-8 py-3 text-lg bg-green-900 border-4 border-green-950 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "px-5 py-2 text-sm bg-gray-600 text-white border-0 hover:bg-gray-500 hover:scale-105"}`}
          >
            🧟 Crear Mob
          </button>
        </div>

        {submitError && (
          <div className="text-center mb-6 font-bold text-red-500 bg-red-950 border-4 border-red-500 p-4">
            ⚠️ {submitError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-6 text-white"
        >
          <FormInput
            label={`Nombre del ${entityType}`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            borderClass={getBorderClass("name")}
            placeholder={`Ingresa el nombre del ${entityType}`}
          />
          <FormInput
            label="Link de la Imagen (URL)"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            error={errors.imageUrl}
            borderClass={getBorderClass("imageUrl")}
            placeholder="https://ejemplo.com/imagen.png"
          />
          <FormInput
            label="Descripción"
            name="description"
            isTextArea
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            borderClass={getBorderClass("description")}
            placeholder={`Ingresa la descripción del ${entityType}`}
          />

          {entityType === "item" && (
            <div className="grid grid-cols-2 gap-8">
              <FormSelect
                label="Rareza"
                name="rarity"
                value={formData.rarity}
                onChange={handleChange}
                error={errors.rarity}
                borderClass={getBorderClass("rarity")}
                options={["Común", "Poco común", "Raro", "Épico", "Legendario"]}
              />
              <FormSelect
                label="Tipo"
                name="type"
                value={formData.type}
                onChange={handleChange}
                error={errors.type}
                borderClass={getBorderClass("type")}
                options={[
                  "Herramienta",
                  "Arma",
                  "Armadura",
                  "Consumible",
                  "Material",
                ]}
              />
            </div>
          )}

          {entityType === "mob" && (
            <div className="grid grid-cols-2 gap-8">
              <FormSelect
                label="Tamaño"
                name="size"
                value={formData.size}
                onChange={handleChange}
                error={errors.size}
                borderClass={getBorderClass("size")}
                options={["Pequeño", "Mediano", "Grande", "Jefe"]}
              />
              <FormSelect
                label="Comportamiento"
                name="behavior"
                value={formData.behavior}
                onChange={handleChange}
                error={errors.behavior}
                borderClass={getBorderClass("behavior")}
                options={["Hostil", "Neutral", "Pacífico", "Mascota"]}
              />
            </div>
          )}

          <button
            type="submit"
            className={`mt-6 border-4 border-black text-white font-extrabold text-xl uppercase py-4 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] ${entityType === "item" ? "bg-sky-900 hover:bg-sky-800" : "bg-green-900 hover:bg-green-800"}`}
          >
            {isSubmitting
              ? "Guardando..."
              : `Guardar ${entityType === "item" ? "Ítem" : "Mob"}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;
