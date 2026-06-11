const API_URL = import.meta.env.VITE_API_URL;

const mapEntity = (entidad, data) => {
  if (!data) return null;

  if (entidad === "items") {
    return {
      ...data,
      type: "ITEM",
      image: data.imageUrl,
      size: data.rarity,
      behavior: "",
    };
  } else if (entidad === "mobs") {
    let size = "Mediano";
    if (data.health <= 10) size = "Pequeño";
    else if (data.health <= 20) size = "Mediano";
    else if (data.health <= 50) size = "Grande";
    else size = "Jefe";

    return {
      ...data,
      type: "MOB",
      image: data.imageUrl,
      behavior: data.type,
      size: size,
    };
  }

  return data;
};

export const getAll = async (entidad) => {
  const response = await fetch(`${API_URL}/${entidad}`);
  if (!response.ok) throw new Error(`Error al obtener los datos de ${entidad}`);
  const list = await response.json();
  return list.map((item) => mapEntity(entidad, item));
};

export const getById = async (entidad, id) => {
  const response = await fetch(`${API_URL}/${entidad}/${id}`);
  if (!response.ok)
    throw new Error(`Error al obtener el registro de ${entidad}`);
  const data = await response.json();
  return mapEntity(entidad, data);
};

export const create = async (entidad, data) => {
  const response = await fetch(`${API_URL}/${entidad}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(errorBody.error || `Error al crear en ${entidad}`);
    error.status = response.status;
    error.details = errorBody.details;
    throw error;
  }

  const result = await response.json();
  return mapEntity(entidad, result);
};

export const update = async (entidad, id, data) => {
  const response = await fetch(`${API_URL}/${entidad}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error al actualizar en ${entidad}`);
  const result = await response.json();
  return mapEntity(entidad, result);
};

export const remove = async (entidad, id) => {
  const response = await fetch(`${API_URL}/${entidad}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error(`Error al eliminar en ${entidad}`);
  return response.json();
};
