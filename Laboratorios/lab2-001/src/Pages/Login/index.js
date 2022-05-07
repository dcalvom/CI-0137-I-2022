import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { postLogin } from "../../Slices/user/requests/postLogin";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const theme = useSelector((state) => state.app.theme);
  const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
  const errorMessage = useSelector((state) => state.user.errorMessage);

  const dispatch = useDispatch();

  return userIsLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div>
      <div className="mb-4">
        <input
          className={`${theme.inputBg} ${theme.inputText}`}
          value={username}
          onChange={(evt) => {
            setUsername(evt.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <input
          className={`${theme.inputBg} ${theme.inputText}`}
          type="password"
          value={password}
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
      </div>
      {
        errorMessage && (
          <span className="text-red-500" >{errorMessage}</span>
        )
      }
      <button
        onClick={() => {
          dispatch(
            postLogin({
              username,
              password,
            })
          );
        }}
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
