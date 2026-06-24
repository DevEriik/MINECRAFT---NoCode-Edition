import { createContext, useContext, useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const autoLogin = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Error en auto-login:", error);
      } finally {
        setIsLoading(false);
      }
      };
      autoLogin();
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      setToken(data.token);
      setUser(data.user);
      setIsLoading(false);
      return data.user;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          response.status === 409
            ? "409"
            : data.message || "Error al registrarse.",
        );
      }

      setIsLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setToken(null);
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
