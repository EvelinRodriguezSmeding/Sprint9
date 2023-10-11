const tareas = require("../data/task");

exports.tareasAll = (req, res) => {
  if (tareas) {
    res.status(200).json({
      success: true,
      message: "Lista de tareas",
      data: tareas,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "La lista de tareas no se encontró",
    });
  }
};

exports.tareaAdd = (req, res) => {
  const { titulo, prioridad_id, usuario_id, completado } = req.body;
  const id = tareas.length + 1;
  const tareaExiste = tareas.find(
    (tarea) =>
      tarea.titulo === titulo
  );
  if (!tareaExiste) {
    tareas.push({ id, titulo, prioridad_id, usuario_id, completado });
    res.send({ message:"Tarea agregada exitosamente"});
  } else {
    res.status(400).json({
      error: "Ya existe una tarea con el mismo título",
    });
  }
};

exports.tareaChange = (req, res) => {
  const idRequest = +req.params.id;
  const data = tareas.find((tarea) => tarea.id === idRequest);
  const cambiarTarea = req.body;
  if (data) {
    Object.assign(data, cambiarTarea);
    res.status(200).json({
      message: "La tarea se actualizo correctamente",
      data: data
    });
  } else {
    res.status(404).json({
      error: "No se ha encontrado un registro con ese id",
    });
  }
};

exports.tareaFilter = (req, res) => {
  const idRequest = +req.params.id;
  const result = tareas.find((registro) => registro.id === idRequest);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({
      error: "No se ha encontrado un registro con ese id",
      pista: `Los id están en un rango entre 1 y ${tareas.length}`,
    });
  }
};
