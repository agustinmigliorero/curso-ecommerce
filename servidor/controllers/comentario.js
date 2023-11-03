const Comentario = require("../models/comentario");
const Usuario = require("../models/usuario");
const Publicacion = require("../models/publicacion");

const crearComentario = async (req, res) => {
  const { texto, autor, publicacion } = req.body;
  const comentario = new Comentario({ texto, autor, publicacion });
  await comentario.save();

  await Publicacion.findByIdAndUpdate(publicacion, {
    $push: { comentarios: comentario._id },
  });

  await Usuario.findByIdAndUpdate(autor, {
    $push: { comentarios: comentario._id },
  });

  res.json({ comentario, message: "Comentario creado" });
};

const editarComentario = async (req, res) => {
  const { id } = req.params;
  const { texto } = req.body;
  const comentario = await Comentario.findByIdAndUpdate(id, { texto });
  res.json(comentario);
};

const eliminarComentario = async (req, res) => {
  const { id } = req.params;
  const comentario = await Comentario.findByIdAndDelete(id);

  await Publicacion.findByIdAndUpdate(comentario.publicacion, {
    $pull: { comentarios: id },
  });

  await Usuario.findByIdAndUpdate(comentario.autor, {
    $pull: { comentarios: id },
  });

  res.json(comentario);
};

module.exports = {
  crearComentario,
  editarComentario,
  eliminarComentario,
};
