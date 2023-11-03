const routerPublicaciones = require("express").Router();
const {
  verPublicaciones,
  verPublicacion,
  crearPublicacion,
  editarPublicacion,
  eliminarPublicacion,
} = require("../controllers/publicacion");

routerPublicaciones.route("/").get(verPublicaciones).post(crearPublicacion);

routerPublicaciones
  .route("/:id")
  .get(verPublicacion)
  .put(editarPublicacion)
  .delete(eliminarPublicacion);

module.exports = routerPublicaciones;
