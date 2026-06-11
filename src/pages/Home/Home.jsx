import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Searcher from "../../components/Searcher/Searcher";
import { Card } from "../../components/Card/Card";
import { getAll } from "../../services/api";
import AddCardForm from "../../components/AddCardForm/AddCardForm";

const Home = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [subBehavior, setSubBehavior] = useState("");
  const [subSize, setSubSize] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");

    if (filter === "items") {
      setCategoriaSeleccionada("ITEM");
    } else if (filter === "mobs") {
      setCategoriaSeleccionada("MOB");
    } else {
      setCategoriaSeleccionada("Todos");
    }

    setPage(1);
  }, [location.search]);

  useEffect(() => {
    let ignore = false; 

    const loadItems = async () => {
      setIsLoading(true);
      try {
        let datosCrudos = [];

        if (categoriaSeleccionada === "ITEM") {
          datosCrudos = await getAll("items");
        } else if (categoriaSeleccionada === "MOB") {
          datosCrudos = await getAll("mobs");
        } else {
          const itemsRes = await getAll("items");
          const mobsRes = await getAll("mobs");
          datosCrudos = [...itemsRes, ...mobsRes];
        }

        if (searchTerm.trim() !== "") {
          datosCrudos = datosCrudos.filter((elemento) =>
            elemento.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (!ignore) {
          setItems(datosCrudos);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error al cargar los elementos:", error);
          setError("Hubo un problema al cargar los datos");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadItems();

    return () => {
      ignore = true;
    };
  }, [page, searchTerm, categoriaSeleccionada, subBehavior, subSize]);

  const handleScroll = () => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight;
    if (isBottom && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="bg-gradient-to-r from-[#064E3B] via-[#0F766E] to-[#083344] min-h-screen w-full">
      <Hero />
      <AddCardForm />
      <Searcher
        alBuscar={(texto) => {
          setSearchTerm(texto);
          setPage(1);
        }}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={(categoria) => {
          if (categoria === "ITEM") {
            navigate("/?filter=items");
          } else if (categoria === "MOB") {
            navigate("/?filter=mobs");
          } else {
            navigate("/");
            navigate("/");
          }

          setSubBehavior("");
          setSubSize("");
        }}
        alFiltrarSecundario={(propiedad, valor) => {
          if (propiedad === "behavior") {
            setSubBehavior(valor);
          }
          if (propiedad === "size") {
            setSubSize(valor);
          }
          setPage(1);
        }}
      />

      <div className="px-1 pt-2 p-8 max-w-7xl mx-auto">
        {error && (
          <div className="text-center mt-8 font-black text-xl text-red-500 font-mono uppercase bg-black border-4 border-red-500 p-6 shadow-[8px_8px_0px_0px_rgba(255,0,0,1)]">
            ⚠️ {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center mt-8 font-bold text-xl animate-pulse text-white font-mono">
            Generando terreno... (Cargando base de datos 📦)
          </div>
        )}
        {!isLoading && !error && items.length === 0 && (
          <div className="text-center mt-8 font-black text-xl text-[#000000] font-mono uppercase bg-[#ffffff] border-4 border-[#000000] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            [ No hay items registrados en la base de datos ]
          </div>
        )}

        {!error && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((elemento) => (
              <Card key={elemento.id} item={elemento} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
