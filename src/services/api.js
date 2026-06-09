const API_URL = import.meta.env.VITE_API_URL;

export const getAll = async (entidad) => {
  const response = await fetch(`${API_URL}/${entidad}`);
  if (!response.ok) throw new Error(`Error al obtener los datos de ${entidad}`);
  return response.json();
};

export const getById = async (entidad, id) => {
  const response = await fetch(`${API_URL}/${entidad}/${id}`);
  if (!response.ok)
    throw new Error(`Error al obtener el registro de ${entidad}`);
  return response.json();
};

export const create = async (entidad, data) => {
  const response = await fetch(`${API_URL}/${entidad}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Error al crear en ${entidad}`);
  return response.json();
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
  return response.json();
};

export const remove = async (entidad, id) => {
  const response = await fetch(`${API_URL}/${entidad}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Error al eliminar en ${entidad}`);
  return response.json();
};
