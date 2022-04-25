const edad = 32;
const nombre = "Daniel";
const carnet = "A71278";

const profesor = {
  "Nombre Completo": "Daniel Calvo Marín",
  id: 5,
  edad,
  nombre,
  carnet,
  hijos: [
    {
      id: 6,
      nombre: "Luciano",
    },
    {
      id: 9,
      nombre: "Benjamin",
    },
  ],
  dosisCOVID19: 3,
  password: "secreta",
};

window.onload = () => {
  document.getElementById(
    "title"
  ).innerText = `Bienvenido ${profesor["Nombre Completo"]}`;
};

const validUsuario = () => {
  const usuario = document.getElementById("usuario").value;
  const contrasenia = document.getElementById("contrasenia").value;
  if (usuario === profesor.carnet && contrasenia === profesor.password) {
    return true;
  }
  document.getElementById("alerta").classList.remove("hide");
  return false;
};
