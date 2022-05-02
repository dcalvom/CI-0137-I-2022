import { useEffect, useState } from "react";
import { BiCart, BiSearch } from "react-icons/bi";
import Logo from "../Logo";
import Modal from "../Modal";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [promo, setPromo] = useState(null);

  //DE ALGUNA MANERA NECESITAMOS TRAER EL DATO DEL BACKEND
  useEffect(() => {
    const fetchPromo = async () => {
      const promoFetch = await fetch("https://api.ticolitas.com/alertas");
      const promoBody = await promoFetch.json();
      setPromo(promoBody[0].alerta);
    }

    fetchPromo();
  }, []);

  return (
    <>
      {showSearch && (
        <Modal
          onClose={() => {
            setShowSearch(false);
          }}
          title="Ingrese su búsqueda"
        >
          {/*todo lo que venga aqui es el children*/}
          <div className="w-full text-center">
            <input
              className="placeholder:text-white pl-4 w-full h-12 border-none bg-red-200 mb-4"
              placeholder="Buscar..."
            />
            <button className="bg-white border-4 border-yellow-500 px-8 py-2">
              Buscar
            </button>
          </div>
        </Modal>
      )}
      <div className="flex items-center justify-center bg-purple-600 text-white h-16 w-full">
        <p>{promo || "¡Tienda Amigurumis!"}</p>
      </div>
      <div className="flex px-4 md:px-8 lg:px-20 py-4">
        <div className="w-1/2">
          <Logo width="w-20" height="h-20" />
        </div>
        <div className="w-1/2 flex gap-3 items-center justify-end">
          <p>¡Bienvenido!</p>
          <BiSearch
            onClick={() => {
              setShowSearch(true);
            }}
            className="cursor-pointer text-2xl"
          />
          <BiCart className="cursor-pointer text-2xl" />
        </div>
      </div>
    </>
  );
}

export default Header;
