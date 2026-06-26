import { useState, useEffect } from "react";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import { create } from "../../services/api";



// valida los datos
const validateForm = (formData, entityType) => {
  let errors = {};
  let isValid = true;

  if (!formData.name.trim()) { errors.name = "El nombre es obligatorio."; isValid = false; }
  else if (/\d/.test(formData.name)) { errors.name = "No ingresar números."; isValid = false; }

  if (!formData.imageUrl.trim()) { errors.imageUrl = "Debe ingresar la URL de la imagen."; isValid = false; }
  else {
    try { new URL(formData.imageUrl); }
    catch (e) { errors.imageUrl = "El formato no es válido. Ej: https://ejemplo.com"; isValid = false; }
  }

  if (!formData.description.trim()) { errors.description = "Debe agregarle una descripción."; isValid = false; }
  else if (formData.description.trim().length < 15) { errors.description = "Debe tener al menos 15 caracteres."; isValid = false; }

  if (entityType === "item") {
    if (!formData.rarity) { errors.rarity = "Te faltó elegir la rareza."; isValid = false; }
    if (!formData.type) { errors.type = "Te faltó elegir el tipo."; isValid = false; }
  } else {
    if (!formData.size) { errors.size = "Te faltó elegir el tamaño."; isValid = false; }
    if (!formData.behavior) { errors.behavior = "Te faltó elegir el comportamiento."; isValid = false; }
  }

  return { isValid, errors };
};

// arma paquete de datos
const buildPayload = (formData, entityType) => {
  if (entityType === "item") {
    return {
      name: formData.name,
      imageUrl: formData.imageUrl,
      translations: [
        { lang: "es", name: formData.name, description: formData.description, rarity: formData.rarity },
        { lang: "en", name: formData.name, description: formData.description, rarity: formData.rarity },
      ],
    };
  } else {
    let health = 20;
    if (formData.size === "Pequeño") health = 10;
    else if (formData.size === "Mediano") health = 20;
    else if (formData.size === "Grande") health = 40;
    else if (formData.size === "Jefe") health = 100;

    return {
      name: formData.name,
      imageUrl: formData.imageUrl,
      health,
      translations: [
        { lang: "es", name: formData.name, description: formData.description, type: formData.behavior },
        { lang: "en", name: formData.name, description: formData.description, type: formData.behavior },
      ],
    };
  }
};

// traduce errores
const mapBackendErrors = (details) => {
  const newErrors = {};
  if (Array.isArray(details)) {
    details.forEach(({ field, message }) => {
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



const AddCardForm = ({ onEntityCreated, cardToEdit, clearEditMode, onEditResult }) => {
  const [entityType, setEntityType] = useState("item");
  const [formData, setFormData] = useState({
    name: "", imageUrl: "", description: "", rarity: "", type: "", size: "", behavior: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (cardToEdit) {
      const isItem = cardToEdit.cardType === "Ítem";
      setEntityType(isItem ? "item" : "mob");

      let mappedSize = "";
      if (!isItem) {
        if (cardToEdit.health <= 10) mappedSize = "Pequeño";
        else if (cardToEdit.health <= 20) mappedSize = "Mediano";
        else if (cardToEdit.health <= 40) mappedSize = "Grande";
        else mappedSize = "Jefe";
      }

      setFormData({
        name: cardToEdit.name || cardToEdit.nombre || "",
        imageUrl: cardToEdit.imageUrl || "",
        description: cardToEdit.description || "",
        rarity: cardToEdit.rarity || "",
        type: cardToEdit.type || "",
        size: mappedSize,
        behavior: cardToEdit.type || "",
      });
    }
  }, [cardToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateForm(formData, entityType);
    setErrors(validationErrors);

    if (!isValid) return; 

    setIsSubmitting(true);
    setSubmitError("");

    // arma payload usando helper externo
    const payload = buildPayload(formData, entityType);
    const entidad = entityType === "item" ? "items" : "mobs";
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      if (cardToEdit) {
        const id = cardToEdit.id || cardToEdit._id;
        const response = await fetch(`${API_URL}/${entidad}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Error al actualizar");
        
        if (onEditResult) onEditResult(true, entityType === "item" ? "Ítem" : "Mob");
      } else {
        await create(entidad, payload);
      }
      //limpia
      setFormData({ name: "", imageUrl: "", description: "", rarity: "", type: "", size: "", behavior: "" });
      setErrors({});

      if (cardToEdit && clearEditMode) clearEditMode();
      if (onEntityCreated) onEntityCreated();

    } catch (error) {
      console.error("Error al crear/editar la entidad", error);
      if (cardToEdit && onEditResult) onEditResult(false, entityType === "item" ? "Ítem" : "Mob");

      if (error.status === 400 && error.details) {
        setErrors(mapBackendErrors(error.details));
      } else {
        setSubmitError(error.message || "Ocurrió un error inesperado al conectar con el servidor");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBorderClass = (fieldName) => {
    if (errors[fieldName]) return "border-red-500";
    if (formData[fieldName]) return "border-green-500";
    return "border-black";
  };

  return (
    <div className="max-w-3xl mx-auto w-full mb-8 mt-8">
      <div className="text-center mb-14">
        <h2 className="text-6xl md:text-7xl font-extrabold text-white uppercase tracking-wider drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] mb-6">
          INVENTARIO
        </h2>
        <p className="text-gray-300 text-xl font-bold leading-relaxed">
          Agrega, elimina o edita los mobs o items que quieras de la Base de
          Datos. Recuerda que los cambios son permanentes y visibles para todos
          los usuarios.
        </p>
      </div>

      <div className="bg-[#1f2937] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-center items-center gap-10 mb-6 h-16">
          <button
            type="button"
            disabled={!!cardToEdit}
            onClick={() => {
              setEntityType("item");
              setErrors({});
              setSubmitError("");
            }}
            className={`font-bold uppercase transition-all duration-200 ${entityType === "item" ? "px-8 py-3 text-lg bg-sky-900 border-4 border-cyan-950 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "px-5 py-2 text-sm bg-gray-600 text-white border-0 hover:bg-gray-500 hover:scale-105"} ${!!cardToEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            ⛏️{" "}
            {cardToEdit && entityType === "item"
              ? "Editando Ítem"
              : "Crear Ítem"}
          </button>

          <button
            type="button"
            disabled={!!cardToEdit}
            onClick={() => {
              setEntityType("mob");
              setErrors({});
              setSubmitError("");
            }}
            className={`font-bold uppercase transition-all duration-200 ${entityType === "mob" ? "px-8 py-3 text-lg bg-green-900 border-4 border-green-950 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "px-5 py-2 text-sm bg-gray-600 text-white border-0 hover:bg-gray-500 hover:scale-105"} ${!!cardToEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            🧟{" "}
            {cardToEdit && entityType === "mob" ? "Editando Mob" : "Crear Mob"}
          </button>
        </div>

        {cardToEdit && (
          <div className="text-center mb-8 p-3 bg-yellow-600/20 border-4 border-yellow-500 text-yellow-400 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ⚠️ Modo Edición: Modificando{" "}
            {entityType === "item" ? "Ítem" : "Mob"}
          </div>
        )}

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
                name="behavior"
                value={formData.behavior}
                onChange={handleChange}
                error={errors.behavior}
                borderClass={getBorderClass("behavior")}
                options={["Hostil", "Neutral", "Pacífico", "Mascota"]}
              />
            </div>
          )}

          <div className="flex gap-4 mt-6">
            {cardToEdit && (
              <button
                type="button"
                onClick={clearEditMode}
                className="w-full border-4 border-black text-white font-extrabold text-xl uppercase py-4 bg-gray-600 hover:bg-gray-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
              >
                Cancelar Edición
              </button>
            )}
            <button
              type="submit"
              className={`w-full border-4 border-black text-white font-extrabold text-xl uppercase py-4 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] ${entityType === "item" ? "bg-sky-900 hover:bg-sky-800" : "bg-green-900 hover:bg-green-800"}`}
            >
              {isSubmitting
                ? "Guardando..."
                : cardToEdit
                  ? `Actualizar ${entityType === "item" ? "Ítem" : "Mob"}`
                  : `Guardar ${entityType === "item" ? "Ítem" : "Mob"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;