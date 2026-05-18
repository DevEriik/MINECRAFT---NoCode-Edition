import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Searcher from "./Searcher";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
    t: (key) => key,
    }),
}));

describe("Componente Searcher", () => {
    
    it("debe renderizar el cuadro de búsqueda y los tres botones principales de categorías", () => {
    render(
        <Searcher
        categoriaSeleccionada="Todos"
        alBuscar={vi.fn()}
        setCategoriaSeleccionada={vi.fn()}
        alFiltrarSecundario={vi.fn()}
        />,
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument(); 
    expect(screen.getByText(/items/i)).toBeInTheDocument();
    expect(screen.getByText(/mobs/i)).toBeInTheDocument();
    });

    it("debe llamar a la función alBuscar con el texto correcto cuando el usuario escribe", async () => {
    const user = userEvent.setup();
    const funcionEspiaBuscar = vi.fn();
    render(
        <Searcher categoriaSeleccionada="Todos" alBuscar={funcionEspiaBuscar} />,
    );
    const input = screen.getByRole("textbox");
    await user.type(input, "Creeper");
    expect(funcionEspiaBuscar).toHaveBeenCalledWith("Creeper");
    });

    it("debe ejecutar setCategoriaSeleccionada con 'MOB' al hacer click en el botón de Mobs", async () => {
    const user = userEvent.setup();
    const funcionEspiaCategoria = vi.fn();
    render(
        <Searcher
        categoriaSeleccionada="Todos"
        setCategoriaSeleccionada={funcionEspiaCategoria}
        />,
    );
    const botonMobs = screen.getByRole("button", { name: /mobs/i });
    await user.click(botonMobs);
    expect(funcionEspiaCategoria).toHaveBeenCalledWith("MOB");
    });

    it("no debe mostrar ningún selector de filtro secundario si la categoría activa es 'Todos'", () => {
    render(<Searcher categoriaSeleccionada="Todos" />);
    expect(screen.queryByText("utility_all")).not.toBeInTheDocument();
    expect(screen.queryByText("behavior_all")).not.toBeInTheDocument();
    });

    it("debe mostrar los selectores de items y disparar alFiltrarSecundario al cambiar una opción", async () => {
    const user = userEvent.setup();
    const funcionEspiaFiltroSecundario = vi.fn();
    render(
        <Searcher
        categoriaSeleccionada="ITEM"
        alFiltrarSecundario={funcionEspiaFiltroSecundario}
        />,
    );
    expect(screen.getByText("utility_all")).toBeInTheDocument();
    const selectores = screen.getAllByRole("combobox"); 
    await user.selectOptions(selectores[0], "Ataque");
    expect(funcionEspiaFiltroSecundario).toHaveBeenCalledWith(
        "behavior",
        "Ataque",
    );
    });
});
