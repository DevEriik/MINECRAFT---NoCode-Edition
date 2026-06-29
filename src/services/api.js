const API_URL = import.meta.env.VITE_API_URL;

const fetchWithAuth = async (urlSuffix, options = {}) => {
  let token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response = await fetch(`${API_URL}/${urlSuffix}`, {
    ...options,
    headers,
  });

  if (
    (response.status === 401 || response.status === 403) &&
    !urlSuffix.includes("auth/refresh") &&
    !urlSuffix.includes("auth/login")
  ) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();

          localStorage.setItem("token", data.token);

          headers["Authorization"] = `Bearer ${data.token}`;
          response = await fetch(`${API_URL}/${urlSuffix}`, {
            ...options,
            headers,
          });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Error intentando refrescar token:", err);
      }
    }
  }

  return response;
};

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
  const response = await fetchWithAuth(entidad);
  if (!response.ok) throw new Error(`Error al obtener los datos de ${entidad}`);
  const list = await response.json();
  return list.map((item) => mapEntity(entidad, item));
};

export const getById = async (entidad, id) => {
  const response = await fetchWithAuth(`${entidad}/${id}`);
  if (!response.ok)
    throw new Error(`Error al obtener el registro de ${entidad}`);
  const data = await response.json();
  return mapEntity(entidad, data);
};

export const create = async (entidad, data) => {
  const response = await fetchWithAuth(entidad, {
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
  const response = await fetchWithAuth(`${entidad}/${id}`, {
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
  const response = await fetchWithAuth(`${entidad}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error(`Error al eliminar en ${entidad}`);
  return response.json();
};

let getFavoritesPromise = null;

export const getFavorites = () => {
  if (getFavoritesPromise) {
    return getFavoritesPromise;
  }

  getFavoritesPromise = fetchWithAuth('favorites')
    .then(async (response) => {
      if (!response.ok) {
        getFavoritesPromise = null;
        throw new Error('Error al obtener la lista de favoritos');
      }
      const data = await response.json();
      getFavoritesPromise = null;
      return data;
    })
    .catch((err) => {
      getFavoritesPromise = null;
      throw err;
    });

  return getFavoritesPromise;
};

export const addFavorite = async (id, entityType) => {
  const response = await fetchWithAuth(`favorites/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ entityType }),
  });
  if (!response.ok) throw new Error('Error al agregar el favorito');
  return response.json();
};

export const removeFavorite = async (id, entityType) => {
  const response = await fetchWithAuth(`favorites/${id}?entityType=${entityType}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el favorito');
  return response.json();
};
