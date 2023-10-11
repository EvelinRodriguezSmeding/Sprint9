const express = require("express");

const {
  taskAll,
  taskAdd,
  taskChange,
  taskFilter,
} = require("../controllers/taskController");

const router = express.Router();

//Trae las tareas existentes de la bd
router.get("/tasks", taskAll);
//Agrega una tarea en la bd
router.post("/tasks", taskAdd);
//Actualiza una tarea en la bd por id
router.put("/tasks/:id", taskChange);
//Filtra tareas por id
router.get("/tasks/:id", taskFilter);

module.exports = router;
