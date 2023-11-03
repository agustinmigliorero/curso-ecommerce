const routerCategorias = require("express").Router();
const {
  verCategorias,
  verCategoria,
  crearCategoria,
  editarCategoria,
  eliminarCategoria,
} = require("../controllers/categoria");

routerCategorias.route("/").get(verCategorias).post(crearCategoria);

routerCategorias
  .route("/:id")
  .get(verCategoria)
  .put(editarCategoria)
  .delete(eliminarCategoria);

module.exports = routerCategorias;
