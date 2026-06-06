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
  const [loading, setLoading] = useState(false);
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

  const loadItems = async () => {
    setLoading(true);
    try {
      const newItems = await getAll("items");
      setItems(newItems);
    } catch (error) {
      console.error("Error al cargar los ítems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [page, searchTerm, categoriaSeleccionada, subBehavior, subSize]);

  const handleScroll = () => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight;
    if (isBottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((elemento) => (
            <Card key={elemento.id} item={elemento} />
          ))}
        </div>

        {loading && (
          <div className="text-center mt-8 font-bold text-xl animate-pulse text-white">
            Cargando base de datos...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
