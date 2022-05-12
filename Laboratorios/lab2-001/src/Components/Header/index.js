import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdNightlightRound, MdPermIdentity } from "react-icons/md";
import { switchTheme } from "../../Slices/app/appSlice";

export default function Header({
    welcomeText,
}) {

    const [showUserMenu, setShowUserMenu] = useState(true);
    const theme = useSelector(
        (state) => state.app.theme
    );
    const userState = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    return (
        <div className={`flex h-16 w-full ${theme.header} sm:px-4 md:px-8 lg:px-16`}>
            <div className="w-6/12">
                <img className="h-16 w-16" src="https://rb.gy/3ueukh" alt="Logo Swap it" />
            </div>
            <div className="flex gap-2 items-center justify-end w-6/12">
                <p>{welcomeText}</p>
                <MdPermIdentity onClick={() => { setShowUserMenu(true); }} className="h-8 w-8 cursor-pointer" />
                <MdNightlightRound onClick={() => { dispatch(switchTheme()); }} className="h-8 w-8 cursor-pointer" />
                {
                    showUserMenu && (
                        <>
                            <div onClick={() => { setShowUserMenu(false); }} className="fixed top-0 left-0 h-full w-full"></div>
                            <div className="bg-slate-700 pb-2 fixed right-24 top-16 h-auto w-[200px]">
                                {
                                    userState.userIsLoggedIn ? (
                                        <>
                                            <div className="pt-2 pl-4">
                                                <p className="text-white cursor-pointer">
                                                    <Link to="/login">Hola, {userState.user.nombre}</Link>
                                                </p>
                                            </div>
                                            <div className="pt-2 pl-4">
                                                <p className="text-white cursor-pointer">
                                                    <Link to="/admin">Administración</Link>
                                                </p>
                                            </div>
                                            <div className="pt-2 pl-4">
                                                <p className="text-white cursor-pointer">
                                                    <Link to="/logout">Cerrar Sesión</Link>
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
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
                                                    <Link to="/admin">Administración</Link>
                                                </p>
                                            </div>
                                        </>
                                    )
                                }
                                <div className="pt-2 pl-4">
                                    <p className="text-white cursor-pointer">
                                        <Link to="/help">Ayuda</Link>
                                    </p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}