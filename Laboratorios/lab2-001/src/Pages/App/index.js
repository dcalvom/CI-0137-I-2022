import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import themes from "../../utils/themes";
import Home from "../Home";
import Login from "../Login";
import Register from "../Register";

export const ThemeContext = createContext(themes.light);
export const UserContext = createContext(null);
export const LanguageContext = createContext("es");

export default function App() {
  return (
    <ThemeContext.Provider value={themes.light}>
      <UserContext.Provider value={null}>
        <LanguageContext.Provider value={"es"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </LanguageContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}