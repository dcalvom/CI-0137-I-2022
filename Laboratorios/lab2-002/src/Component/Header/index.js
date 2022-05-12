import { useState } from "react";
import { BiCart, BiSearch, BiMoon, BiUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Logo";
import Modal from "../Modal";
import { toLight, toDark } from "../../Slices/appSlice";
import { Link } from "react-router-dom";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  
  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.app.theme
  );
  const promo = useSelector(
    (state) => state.app.promo
  );
  const countOfItems = useSelector(
    (state) => state.cart.countOfItems
  );
  const user = useSelector(
    (state) => state.user.user
  );

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
      <div
        className={`flex items-center justify-center ${theme.header} text-white h-16 w-full`}
      >
        <p>{promo || "¡Tienda Amigurumis!"}</p>
      </div>
      <div className="flex px-4 md:px-8 lg:px-20 py-4">
        <div className="w-1/2">
          <Logo width="w-20" height="h-20" />
        </div>
        <div className="w-1/2 flex gap-3 items-center justify-end">
          <p>{user && user.nombre ? ` ¡Bienvenido ${user.nombre}!` : "¡Bienvenido!"}</p>
          <BiSearch
            onClick={() => {
              setShowSearch(true);
            }}
            className="cursor-pointer text-2xl"
          />
          <Link to="/admin">
            <BiUser className="cursor-pointer text-2xl" />
          </Link>
          <BiCart className="cursor-pointer text-2xl" />
          <span>{countOfItems}</span>
          <BiMoon
            onClick={() => {
              theme.name === "light" ? dispatch(toDark()) : dispatch(toLight());
            }}
            className="cursor-pointer text-2xl"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
