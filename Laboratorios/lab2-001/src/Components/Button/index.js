import { useContext } from "react";
import { ThemeContext } from "../../Pages/App";

export default function Button() {

    const theme = useContext(ThemeContext);

    return (
        <button style={{ border: "1px solid red", backgroundColor: theme.background, color: theme.text }} >
            Soy un boton que cambia
        </button>
    )
}