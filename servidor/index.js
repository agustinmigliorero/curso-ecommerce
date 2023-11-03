const express = require("express");
const app = express();
const mongoose = require("mongoose");
const puerto = 3000;
const bodyParser = require("body-parser");
const routerUsuarios = require("./routes/usuario");
const routerComentarios = require("./routes/comentario");
const routerCategorias = require("./routes/categoria");
const routerPublicaciones = require("./routes/publicacion");

app.use(bodyParser.json());

//db
mongoose.connect("mongodb://localhost:27017/curso-blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Base de datos conectada");
});
//db

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  next();
});
//cors

//Rutas
app.use("/usuarios", routerUsuarios);
app.use("/comentarios", routerComentarios);
app.use("/publicaciones", routerPublicaciones);
app.use("/categorias", routerCategorias);

app.all("*", (req, res, next) => {
  next(new ExpressError("Ruta no encontrada", 404));
});
//Rutas

//ERROR HANDLER
app.use((err, req, res, next) => {
  const { status = 500, message = "Error desconocido" } = err;
  res.status(status).json(`ERROR ${status}, ${message}`);
});
//ERROR HANDLER

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
