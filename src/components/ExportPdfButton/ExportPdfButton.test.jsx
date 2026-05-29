import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ExportPdfButton from "./ExportPdfButton";

//! mockeo html2canvas
vi.mock("html2canvas-pro", () => {
  return {
    default: vi.fn().mockResolvedValue({
      height: 100,
      width: 100,
      toDataURL: () => "data:image/png;base64,mockfalso",
    }),
  };
});

//! mockeo jspdf
const mockAddImage = vi.fn();
const mockSave = vi.fn();

vi.mock("jspdf", () => {
  return {
    default: class MockJsPDF {
      addImage(...args) {
        mockAddImage(...args);
      }
      save(...args) {
        mockSave(...args);
      }
    },
  };
});

describe("Componente ExportPdfButton", () => {
  const mockRef = { current: document.createElement("div") };
  const mockFilename = "mi_skin_pdf";

  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
    console.log = vi.fn();
  });

  it("debería renderizar el estado inicial del botón", () => {
    render(<ExportPdfButton elementRef={mockRef} filename={mockFilename} />);

    expect(screen.getByText(/\[ PDF \]/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Descargar PDF/i)).toBeInTheDocument();
  });

  it("debería llamar a las funciones de guardar PDF al hacer click", async () => {
    render(<ExportPdfButton elementRef={mockRef} filename={mockFilename} />);

    const boton = screen.getByRole("button");
    fireEvent.click(boton);

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith("mi_skin_pdf.pdf");
    });
  });
});
