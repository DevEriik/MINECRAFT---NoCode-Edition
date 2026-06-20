import { createContext, useContext, useState, useEffect } from "react";

// 1. Crear el contexto de autenticación
const AuthContext = createContext();

// 2. Crear el proveedor del contexto (Provider)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auto-login simulado: si al cargar la app ya existe un token en localStorage,
  // restauramos un usuario simulado según el tipo de token.
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
      }, 500); // Pequeña demora para simular la velocidad de la API
      return () => clearTimeout(timer);
    }
  }, [token]);

  // Función de inicio de sesión simulada
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

        // Simulación: Si el email es admin@admin.com, inicia como administrador.
        const role = email.toLowerCase() === "admin@admin.com" ? "ADMIN" : "CLIENT";
        const mockToken = role === "ADMIN" ? "mock-jwt-token-admin" : "mock-jwt-token-client";
        const mockUser = {
          id: "mock-user-123",
          name: role === "ADMIN" ? "Admin Erick" : "Cliente Erick",
          email: email.toLowerCase(),
          role,
        };

        // Guardamos el token en localStorage para la persistencia
        localStorage.setItem("token", mockToken);
        setToken(mockToken);
        setUser(mockUser);
        setIsLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  // Función de registro simulada
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

  // Función de cierre de sesión simulada
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

  // Retornamos el proveedor con el estado y las funciones disponibles
  return (
    <AuthContext.Provider value={{ user, token, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
