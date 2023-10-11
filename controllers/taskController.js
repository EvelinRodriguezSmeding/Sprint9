const knex = require("../config/knexfile");

const taskAll = async (req, res) => {
  try {
    const task = await knex("lista_de_tareas");
    res.status(200).json({
      success: true,
      message: "Lista de tareas",
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
      message: "La lista de tareas no se encontró",
    });
  }
};

const taskAdd = async (req, res) => {
  const { titulo, prioridad_id, usuario_id, completado } = req.body;
  try {
    const tareaExiste = await knex("lista_de_tareas")
      .select("titulo")
      .where("titulo", titulo);
    if (tareaExiste.length) {
      res
        .status(400)
        .json({ error: "Ya existe una tarea con el mismo título" });
      return;
    }
    await knex("lista_de_tareas").insert({
      titulo: titulo,
      prioridad_id: prioridad_id,
      usuario_id: usuario_id,
      completado: completado,
    });
    res.status(200).json({ mensaje: "Se inserto la tarea correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const taskChange = async (req, res) => {
  const idRequest = +req.params.id;
  const { titulo, prioridad_id, usuario_id, completado} = req.body;
  try {
      const validarTask = await knex("lista_de_tareas")
      .select("id")
      .where("id", idRequest)
      .first();
      if(!validarTask){
          res.status(404).json({
              error: "No se ha encontrado un registro con ese id",
            });
            return;
      }
      await knex("lista_de_tareas")
      .where("id", idRequest )
      .update({
          titulo: titulo,
          prioridad_id: prioridad_id,
          usuario_id: usuario_id,
          completado: completado,
      });
      res.status(200).json({mensaje: "Se actualizo la tarea correctamente"});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const taskFilter = async (req, res) => {
  const idRequest = +req.params.id;
  try {
    const result = await knex("lista_de_tareas")
      .select("*")
      .where("id", idRequest);
    if (result.length) {
      res.json(result);
    } else {
      res.status(404).json({
        error: "No se ha encontrado un registro con ese id",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { taskAll, taskAdd, taskChange, taskFilter };
