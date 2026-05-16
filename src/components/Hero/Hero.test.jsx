import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Hero from "./Hero";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

window.scrollBy = vi.fn();

describe("Componente Hero", () => {
  it("debería mostrar el título principal de la aplicación", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
    );

    const tituloPrincipal = screen.getByText(/MINECRAFT/i);
    expect(tituloPrincipal).toBeInTheDocument();
  });
});
