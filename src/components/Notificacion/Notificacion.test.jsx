import { render, screen } from "@testing-library/react";
import { Notificacion } from "./Notificacion";

describe("Componente Notificacion - Pruebas Genéricas", () => {
    it("no debe renderizar absolutamente nada en el DOM si el mensaje viene vacío", () => {
    const { container } = render(<Notificacion mensaje="" tipo="agregar" />);

    expect(container.firstChild).toBeNull();
    });

    it("debe mostrar el fondo verde, el icono del corazón y el texto que reciba por prop", () => {
    const mensajeMock = "Cualquier texto dinámico de éxito de Minecraft";
    const { container } = render(
        <Notificacion mensaje={mensajeMock} tipo="agregar" />,
    );

    expect(screen.getByText(mensajeMock)).toBeInTheDocument();
    expect(screen.getByAltText("Corazón")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("bg-[#0c381e]");
    });

    it("debe mostrar el fondo rojo, el emoji del tacho y el texto que reciba por prop", () => {
    const mensajeMock = "Cualquier elemento eliminado de la base de datos";
    const { container } = render(
        <Notificacion mensaje={mensajeMock} tipo="eliminar" />,
    );

    expect(screen.getByText(mensajeMock)).toBeInTheDocument();
    expect(screen.getByText("🗑️")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("bg-[#7F1D1D]");
    });
});
