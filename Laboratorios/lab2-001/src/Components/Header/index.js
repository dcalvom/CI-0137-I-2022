import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdPermIdentity } from "react-icons/md";
import { ThemeContext } from "../../Pages/App";

export default function Header() {

    const [showUserMenu, setShowUserMenu] = useState(false);
    const theme = useContext(ThemeContext);

    return (
        <div className={`flex h-16 w-full bg-${theme.header} sm:px-4 md:px-8 lg:px-16`}>
            <div className="w-6/12">
                <img className="h-16 w-16" src="https://rb.gy/3ueukh" alt="Logo Swap it" />
            </div>
            <div className="flex gap-2 items-center justify-end w-6/12">
                <p>¡Bienvenido!</p>
                <MdPermIdentity onClick={() => { setShowUserMenu(true); }} className="h-8 w-8 cursor-pointer" />
                {
                    showUserMenu && (
                        <div>
                            <div onClick={() => { setShowUserMenu(false); }} className="fixed top-0 left-0 h-full w-full"></div>
                            <div className="bg-slate-700 pb-2 fixed right-8 top-16 h-auto w-[200px]">
                                <div className="pt-2 pl-4">
                                    <p className="text-white cursor-pointer">
                                        <Link to="/login">Iniciar sesión</Link>
                                    </p>
                                </div>
                                <div className="pt-2 pl-4">
                                    <p className="text-white cursor-pointer">
                                        <Link to="/register">Crear cuenta</Link>
                                    </p>
                                </div>
                                <div className="pt-2 pl-4">
                                    <p className="text-white cursor-pointer">
                                        <Link to="/help">Ayuda</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}