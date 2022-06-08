import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { postLogin } from "../../Slices/user/requests/postLogin";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localErrorMessage, setLocalErrorMessage] = useState("");

  const theme = useSelector((state) => state.app.theme);
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  const errorMessage = useSelector((state) => state.user.errorMessage);

  const dispatch = useDispatch();

  return userIsLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">¡Bienvenido a SwapIt!</h1>
        </div>
        <div className="mb-4">
          <input
            placeholder="Email"
            className={`placeholder:text-black pl-4 h-[48px] w-full rounded-md ${theme.inputBg} ${theme.inputText}`}
            value={username}
            onChange={(evt) => {
              setUsername(evt.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="Contraseña"
            className={`placeholder:text-black pl-4 h-[48px] w-full rounded-md ${theme.inputBg} ${theme.inputText}`}
            type="password"
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
        </div>
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        {localErrorMessage && <span className="text-red-500">{localErrorMessage}</span>}
        <button
          className="h-[48px] w-full rounded-md bg-sky-500 text-white"
          onClick={() => {
            if (username && password) {
              if (password.length < 8) {
                setLocalErrorMessage("La contraseña debe contener al menos 8 dígitos.");                
              }
              else {
                setLocalErrorMessage("");
                dispatch(
                  postLogin({
                    username,
                    password,
                  })
                );
              }
            }
            else {
              setLocalErrorMessage("Debe completar todos los campos");
            }
          }}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
