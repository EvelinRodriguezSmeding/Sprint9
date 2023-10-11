const express = require("express");
const bodyParser = require("body-parser");
const holaMundo = require("./routes/holaMundo");
const tareaRoutes = require("./routes/tareas");
const tasksRoutes = require("./routes/taskRoutes");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api", holaMundo);
app.use("/api", tareaRoutes);
app.use("/api", tasksRoutes);

app.get("/api/*", (req, res) => {
  res.status(404).json({
    error:
      "El recurso que quire consumir no existe, revise los datos de la url",
  });
});

app.listen(8000, () => {
  console.log("Servidor levantado y escuchando en el puerto 8000");
});
