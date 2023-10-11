const express = require("express");

const {
  tareasAll,
  tareaAdd,
  tareaChange,
  tareaFilter,
} = require("../controllers/tareas");

const router = express.Router();

//Retorna el objeto task.js adjunto
router.get("/tareas", tareasAll);
//Agrega una tarea
router.post("/tareas", tareaAdd);
//Actualiza una tarea por id
router.put("/tareas/:id", tareaChange);
//Filtra tareas por id
router.get("/tareas/:id", tareaFilter);

module.exports = router;
