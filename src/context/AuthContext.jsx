import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const role = token.includes("admin") ? "ADMIN" : "CLIENT";
        setUser({
          id: "mock-user-123",
          name: role === "ADMIN" ? "Admin Erick" : "Cliente Erick",
          email: role === "ADMIN" ? "admin@admin.com" : "cliente@cliente.com",
          role,
        });
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          setError("Por favor, completa todos los campos.");
          setIsLoading(false);
          reject(new Error("Campos incompletos"));
          return;
        }

        const role =
          email.toLowerCase() === "admin@admin.com" ? "ADMIN" : "CLIENT";
        const mockToken =
          role === "ADMIN" ? "mock-jwt-token-admin" : "mock-jwt-token-client";
        const mockUser = {
          id: "mock-user-123",
          name: role === "ADMIN" ? "Admin Erick" : "Cliente Erick",
          email: email.toLowerCase(),
          role,
        };

        localStorage.setItem("token", mockToken);
        setToken(mockToken);
        setUser(mockUser);
        setIsLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          setError("Todos los campos son obligatorios.");
          setIsLoading(false);
          reject(new Error("Campos incompletos"));
          return;
        }

        setIsLoading(false);
        resolve({ message: "Registro mock exitoso" });
      }, 1000);
    });
  };

  const logout = async () => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsLoading(false);
        resolve();
      }, 500);
    });
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
