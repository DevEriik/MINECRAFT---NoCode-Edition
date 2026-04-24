import {useState, useEffect} from "react";
import { Card } from "../../components/Card/Card";
import { getAllItems } from "../../services/getAllItems";

const Home = () => {
    const [items, setItems]= useState([])
    const [page, setPage]= useState(1)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const loadItems = async () => {
        setLoading(true)
        const newItems = await getAllItems(page, 10, searchTerm)
        if (page === 1){
            setItems(newItems)
        } else {
            setItems((prevItems)=>[...prevItems, ...newItems])
        }
        setLoading(false)
    }

    useEffect(()=>{
        loadItems();
    }, [page, searchTerm])

    const handleScroll =  () => {
        const isBottom = window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight;
        if (isBottom && !loading){
            setPage((prevPage)=>prevPage+1);
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll)
        return()=> window.removeEventListener('scroll', handleScroll)
    }, [loading]);

    return (
    <div className="bg-gray-300 min-h-screen w-full">
    <div className="p-8 max-w-7xl mx-auto">
      
      <div className="mb-8 text-black border-4 border-black p-2 flex bg-white">
        <span className="font-bold text-gray-500 mr-2"></span>
        <input
          type="text"
          placeholder="Buscar"
          className="w-full outline-none font-bold uppercase"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); 
            setPage(1); 
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((elemento) => (
          <Card key={elemento.id} item={elemento} /> 
        ))}
      </div>

      {loading && (
        <div className="text-center mt-8 font-bold text-xl animate-pulse">
          Cargando base de datos...
        </div>
      )}
      
    </div>
    </div>
  );

}
export default Home;