// src/services/getItemById.js
const API_URL = "https://69ea4c0415c7e2d51269a283.mockapi.io/api/v1/Minecraft";

export const getItemById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("No pudimos encontrar este bloque en el inventario.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
