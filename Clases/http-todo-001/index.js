const express = require("express");

const app = express();

app.use(express.json());

app.get("/listas", (req, res) => {
  /* AQUI VA LA LOGICA PARA TRAER LOS DATOS */
  const datos = [
    {
      id: 1,
      nombre: "Universidad",
    },
    {
      id: 2,
      nombre: "Casa",
    },
  ];
  res.json(datos);
});

app.get("/listas/:id/tareas", (req, res) => {
  const idLista = req.params.id;
  /* AQUI VA LA LOGICA PARA TRAER LOS DATOS 
        SELECT *
        FROM TAREAS
        WHERE IDLISTA = idLIsta
    */
  const tareas = [
    {
      id: 1,
      idLista: 1,
      nombre: "Ir a clases",
      estado: "Pendiente",
    },
    {
      id: 2,
      idLista: 1,
      nombre: "Hacer tarea",
      estado: "Pendiente",
    },
    {
      id: 3,
      idLista: 1,
      nombre: "Entregar proyecto",
      estado: "Pendiente",
    },
  ];
  res.json(tareas);
});

app.post("/listas/:id/tareas", (req, res) => {
  const idLista = req.params.id;
  const body = req.body;
  /* AQUI VA LA LOGICA PARA TRAER LOS DATOS 
        INSERT INTO TAREAS (idLista, nombre, estado) VALUES (idLista, body.nombre, body.estado);
      */
  const nuevaTarea = {
    id: 4,
    idLista,
    nombre: body.nombre,
    estado: body.estado,
  };
  res.json(nuevaTarea);
});

app.patch("/listas/:id/tareas/:idTarea", (req, res) => {
  const idLista = req.params.id;
  const idTarea = req.params.idTarea;
  const body = req.body;
  /* AQUI VA LA LOGICA PARA TRAER LOS DATOS 
    UPDATE Tareas SET nombre = req.body.nombre, estado = req.body.estado;      
  */
  const tareaVieja = {
    id: 1,
    idLista: 1,
    nombre: "Ir a clases",
    estado: "Pendiente",
  };
  Object.keys(body).forEach((atributo) => {
    tareaVieja[atributo] = body[atributo];
  });
  res.json(tareaVieja);
});

app.delete("/listas/:id/tareas/:idTarea", (req, res) => {
  const idLista = req.params.id;
  const idTarea = req.params.idTarea;
  /* AQUI VA LA LOGICA PARA TRAER LOS DATOS 
      DELETE FROM Tareas WHERE idLista = idLista and idTarea = idTarea;
    */
  res.send();
});

app.listen(3000);

console.log("El servidor está escuchando en http://localhost:3000");
