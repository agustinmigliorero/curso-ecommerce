const routerUsuarios = require("express").Router();
const {
  verUsuarios,
  verUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} = require("../controllers/usuario");

routerUsuarios.route("/").get(verUsuarios).post(crearUsuario);

routerUsuarios
  .route("/:id")
  .get(verUsuario)
  .put(editarUsuario)
  .delete(eliminarUsuario);

module.exports = routerUsuarios;
