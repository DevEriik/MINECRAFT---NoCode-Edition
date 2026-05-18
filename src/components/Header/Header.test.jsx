import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: "es", 
      changeLanguage: vi.fn(), 
    },
  }),
}));

describe("Componente Header", () => {
  it("debería renderizarse correctamente", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });
});
