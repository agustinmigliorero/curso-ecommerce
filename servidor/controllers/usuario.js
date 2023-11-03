const Publicacion = require("../models/publicacion");
const Usuario = require("../models/usuario");
const Comentario = require("../models/comentario");
const Categoria = require("../models/categoria");

const verUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

const crearUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;
  const usuario = new Usuario({ nombre, email, password });
  await usuario.save();
  res.json({ message: "Usuario creado" });
};

const verUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  res.json(usuario);
};

const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;
  const usuario = await Usuario.findByIdAndUpdate(id, {
    nombre,
    email,
    password,
  });
  res.json(usuario);
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndDelete(id);

  const publicacionesABorrar = [];
  for (let i = 0; i < usuario.publicaciones.length; i++) {
    const publicacionABorrar = await Publicacion.findByIdAndDelete(
      usuario.publicaciones[i]
    );
    publicacionesABorrar.push(publicacionABorrar._id);
  }

  for (let i = 0; i < usuario.comentarios.length; i++) {
    await Comentario.findByIdAndDelete(usuario.comentarios[i]);
  }

  for (let i = 0; i < publicacionesABorrar.length; i++) {
    const categorias = await Categoria.find({
      publicaciones: publicacionesABorrar[i],
    });
    for (let j = 0; j < categorias.length; j++) {
      await Categoria.findByIdAndUpdate(categorias[j]._id, {
        $pull: { publicaciones: publicacionesABorrar[i] },
      });
    }
  }

  res.json({ usuario, message: "Usuario eliminado" });
};

module.exports = {
  verUsuarios,
  crearUsuario,
  verUsuario,
  editarUsuario,
  eliminarUsuario,
};
