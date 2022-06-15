import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdNightlightRound, MdPermIdentity } from "react-icons/md";
import { switchTheme } from "../../Slices/app/appSlice";
import Mixpanel from "../../services/mixpanel";

export default function Header({ welcomeText }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const theme = useSelector((state) => state.app.theme);
  const currentTheme = useSelector((state) => state.app.currentTheme);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div
      className={`flex h-16 w-full ${theme.header} sm:px-4 md:px-8 lg:px-16`}
    >
      <div className="w-6/12">
        <img
          className="h-16 w-16"
          src="https://rb.gy/3ueukh"
          alt="Logo Swap it"
        />
      </div>
      <div className="flex gap-2 items-center justify-end w-6/12">
        <p>{welcomeText}</p>
        <MdPermIdentity
          onClick={() => {
            Mixpanel.track(Mixpanel.TYPES.OPEN_USER_MENU);
            setShowUserMenu(true);
          }}
          className="h-8 w-8 cursor-pointer"
        />
        <MdNightlightRound
          onClick={() => {
            Mixpanel.track(Mixpanel.TYPES.TOGGLE_THEME, {
              currentTheme,
              newTheme: currentTheme === "light" ? "dark" : "light",
            });
            dispatch(switchTheme());
          }}
          className="h-8 w-8 cursor-pointer"
        />
        {showUserMenu && (
          <>
            <div
              onClick={() => {
                setShowUserMenu(false);
              }}
              className="fixed top-0 left-0 h-full w-full"
            ></div>
            <div className="bg-slate-700 pb-2 fixed right-24 top-16 h-auto w-[200px]">
              {userState.userIsLoggedIn ? (
                <>
                  <div className="pt-2 pl-4">
                    <p className="text-white cursor-pointer">
                      Hola, {userState.user.name}
                    </p>
                  </div>
                  <div className="pt-2 pl-4">
                    <p className="text-white cursor-pointer">
                      <Link
                        onClick={() => {
                          Mixpanel.track(Mixpanel.TYPES.GO_TO_ADMIN);
                        }}
                        to="/admin"
                      >
                        Administración
                      </Link>
                    </p>
                  </div>
                  <div className="pt-2 pl-4">
                    <p className="text-white cursor-pointer">
                      <Link
                        onClick={() => {
                          Mixpanel.track(Mixpanel.TYPES.CLOSE_SESSION);
                        }}
                        to="/logout"
                      >
                        Cerrar Sesión
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="pt-2 pl-4">
                    <p className="text-white cursor-pointer">
                      <Link
                        onClick={() => {
                          Mixpanel.track(Mixpanel.TYPES.GO_TO_LOGIN);
                        }}
                        to="/login"
                      >
                        Iniciar sesión
                      </Link>
                    </p>
                  </div>
                  <div className="pt-2 pl-4">
                    <p className="text-white cursor-pointer">
                      <Link
                        onClick={() => {
                          Mixpanel.track(Mixpanel.TYPES.GO_TO_CREATE_ACCOUNT);
                        }}
                        to="/register"
                      >
                        Crear cuenta
                      </Link>
                    </p>
                  </div>
                  <div className="pt-2 pl-4">
                    <p className="text-white cursor-pointer">
                      <Link
                        onClick={() => {
                          Mixpanel.track(Mixpanel.TYPES.GO_TO_ADMIN);
                        }}
                        to="/admin"
                      >
                        Administración
                      </Link>
                    </p>
                  </div>
                </>
              )}
              <div className="pt-2 pl-4">
                <p className="text-white cursor-pointer">
                  <Link
                    onClick={() => {
                      Mixpanel.track(Mixpanel.TYPES.GO_TO_HELP);
                    }}
                    to="/help"
                  >
                    Ayuda
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
