const BASE_URL = "https://69e95bd255d62f34797a8088.mockapi.io";

export const API_ENDPOINTS = {
  // ENDPOINT principal para el listado y la busqueda de los elementos.
  ITEM: `${BASE_URL}/items`,
  // ENDPOINT dinamico para obtener detalle de un elemento en especifico por su ID
  ITEM_DETAIL: (id) => `${BASE_URL}/items/${id}`,
};
