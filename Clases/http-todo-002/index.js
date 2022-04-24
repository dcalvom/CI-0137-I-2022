const express = require('express')
const app = express();

app.use(express.json());

app.get('/listas', function (req, res) {
    const listas = [
        {
            id: 1,
            nombre: "Universidad"
        },
        {
            id: 2,
            nombre: "Casa"
        },
    ];
    res.json(listas);
});


app.get('/listas/:id/tareas', function (req, res) {
    const idLista = req.params.id;
    console.log("Este es el parametro que ingreso: ", idLista)
    /* aqui se hace la logica para preguntar por las tareas de la lista idLista */
    const tareas = [
        {
            id: 1,
            idLista: 1,
            nombre: "Ir a clases",
            estado: "Pendiente"
        },
        {
            id: 2,
            idLista: 1,
            nombre: "Hacer tarea",
            estado: "Pendiente"
        },
        {
            id: 3,
            idLista: 1,
            nombre: "Entregar proyecto",
            estado: "Pendiente"
        },
    ];
    res.json(tareas);
});

app.post('/listas/:id/tareas', function (req, res) {
    const tarea = req.body;
    const idLista = parseInt(req.params.id);
    /* Logica para crear recurso en el repositorio de datos */
    const nuevaTarea = {
        id: 4,
        idLista,
        ...tarea
    };
    res.json(nuevaTarea);
});

app.patch('/listas/:id/tareas/:idTarea', function (req, res) {
    const datosNuevos = req.body;
    const idLista = parseInt(req.params.id);
    const idTarea = parseInt(req.params.idTarea);
    /* Logica para actualizar el dato */
    const tareaVieja = {
        id: 1,
        idLista: 1,
        nombre: "Ir a clases",
        estado: "Pendiente"
    };
    Object.keys(datosNuevos).forEach((a) => {
        tareaVieja[a] = datosNuevos[a];
    });
    res.json(tareaVieja);
});

app.delete('/listas/:id/tareas/:idTarea', function (req, res) {
    /*logica para borrar */
    res.send('Ok');
});

app.listen(3000)