const nombreSistema = "SuperLogin"

const usuario = {
    nombre: "Daniel",
    usuario: "A71278",
    password: "secreta"
}

window.onload = () => {
    document.getElementById("title").innerText = `Bienvenido a ${nombreSistema}`;
}

const validarUsuario = () => {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("contrasenia").value;
    if (user !== usuario.usuario || pass !== usuario.password) {
        document.getElementById("alerta").classList.remove("hide");
    }
    else {
        document.getElementById("title").innerText = `Bienvenido ${usuario.nombre}`;
        document.getElementById("alerta").classList.add("hide");
        document.getElementById("form").classList.add("hide");
    }
}