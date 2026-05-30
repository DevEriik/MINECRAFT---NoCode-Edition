import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Card } from "./Card";
import { useTranslation } from "react-i18next";

//! Hago una "simulacion" de las traducciones.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key, //!Esto devuelve la clave de traduccion.
  }),
}));

//! Hago como un elemento de prueba estilo (Mock Data)
const mockItem = {
  id: "item-123",
  name: "Espada de Diamante",
  type: "ITEM",
  image: "espada.png",
  behavior: "Daño 7",
  size: "1x1",
  description: "Un arma muy poderosa",
};

//! Funcion auxiliar para renderizar componentes que usan <Link>
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Componente Card", () => {
  //!Limpio el LocalStorage y los mocks antes de cada test
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers(); //! Restauro los temporizadores por si los modificamos.
  });

  it("Deberia renderizar la informacion del item correctamente", () => {
    renderWithRouter(<Card item={mockItem} />);
    //!Verifico que los textos del item aparezcan en la pantalla
    expect(screen.getByText("Espada de Diamante")).toBeInTheDocument();
    expect(screen.getByText("ITEM")).toBeInTheDocument();
    expect(screen.getByText("Un arma muy poderosa")).toBeInTheDocument();
    expect(screen.getByText("Daño 7")).toBeInTheDocument();
  });

  it("Deberia agregar a favoritos al hacer click y guardar en localStorage", () => {
    renderWithRouter(<Card item={mockItem} />);

    const botonFavorito = screen.getByText(/textFavorite/i);
    //!Simulo el click
    fireEvent.click(botonFavorito);
    //!Ahora verifico que se guarde en localStorage
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"));
    expect(favoritosGuardados).toHaveLength(1);
    expect(favoritosGuardados[0].id).toBe(mockItem.id);
    //!Verifico que el boton haya cambiado a 'inFavorite'
    expect(screen.getByText(/inFavorite/i)).toBeInTheDocument();
  });

  it("Deberia eliminar de favoritos y ejecutar onEliminar despues de 2 segundos", () => {
    //!Activo los temporizadores falsos de Vitest para no esperar 2 segundos reales.
    vi.useFakeTimers();
    const mockOnEliminar = vi.fn();

    //!Precargo el localStorage para que el item ya sea favorito.
    localStorage.setItem("favoritos", JSON.stringify([mockItem]));
    renderWithRouter(<Card item={mockItem} onEliminar={mockOnEliminar} />);

    const botonFavorito = screen.getByText(/inFavorite/i);

    //!Ahora simulo el click para quitar de favoritos.
    fireEvent.click(botonFavorito);

    //!Verifico que se haya borrado del localStorage
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"));
    expect(favoritosGuardados).toHaveLength(0);

    expect(mockOnEliminar).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(mockOnEliminar).toHaveBeenCalledTimes(1);
    expect(mockOnEliminar).toHaveBeenCalledWith(mockItem.id);
  });
});
