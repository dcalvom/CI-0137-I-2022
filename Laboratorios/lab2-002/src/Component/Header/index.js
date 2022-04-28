import { BiCart, BiSearch } from "react-icons/bi";
import Logo from "../Logo";

function Header() {
  return (
    <>
      <div className="flex items-center justify-center bg-purple-600 text-white h-16 w-full">
        <p>¡Solo por hoy 10% en todos los amigurumis rosados!</p>
      </div>
      <div className="flex px-4 md:px-8 lg:px-20 py-4">
        <div className="w-1/2">
          <Logo width={20} height={20} />
        </div>
        <div className="w-1/2 flex gap-3 items-center justify-end">
          <p>¡Bienvenido!</p>
          <BiSearch className="cursor-pointer" />
          <BiCart className="cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default Header;
