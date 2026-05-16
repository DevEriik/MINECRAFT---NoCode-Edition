import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Construction from "./Construction";

//! Simulo las traducciones
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("Componente Construction", () => {
  it("debería renderizar la imagen ilustrativa correctamente", () => {
    render(<Construction />);

    //! Busco imagen por el 'alt'
    const imagen = screen.getByAltText(/Sección en Construcción/i);
    expect(imagen).toBeInTheDocument();
  });

  it("debería renderizar los textos traducidos", () => {
    render(<Construction />);

    //! Mockeo las traducciones
    expect(screen.getByText(/thisPage/i)).toBeInTheDocument();
    expect(screen.getByText(/underCons/i)).toBeInTheDocument();
    expect(screen.getByText(/disculpOne/i)).toBeInTheDocument();
    expect(screen.getByText(/disculpTwo/i)).toBeInTheDocument();
  });
});
