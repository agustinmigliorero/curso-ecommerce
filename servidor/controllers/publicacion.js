const Publicacion = require("../models/publicacion");
const Categoria = require("../models/categoria");
const { diferencia } = require("../utils/diferencia");
const Usuario = require("../models/usuario");

const verPublicaciones = async (req, res) => {
  const publicaciones = await Publicacion.find();
  res.json(publicaciones);
};

const crearPublicacion = async (req, res) => {
  const { titulo, texto, autor, categorias } = req.body;
  const publicacion = new Publicacion({ titulo, texto, autor, categorias });
  await publicacion.save();
  res.json({ publicacion, message: "Publicacion creada" });
};

const verPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findById(id)
    .populate("autor")
    .populate({
      path: "comentarios",
      populate: { path: "autor" },
    });
  res.json(publicacion);
};

const editarPublicacion = async (req, res) => {
  const { id } = req.params;
  const { titulo, texto, autor, categorias } = req.body;

  const publicacionAnterior = await Publicacion.findById(id);

  const categoriasABorrar = diferencia(
    publicacionAnterior.categorias,
    categorias
  );

  const categoriasNuevas = diferencia(
    categorias,
    publicacionAnterior.categorias
  );

  await Categoria.updateMany(
    { "._id": categoriasABorrar },
    { $pull: { publicaciones: id } }
  );

  await Categoria.updateMany(
    { "._id": categoriasNuevas },
    { $addToSet: { publicaciones: id } }
  );

  const publicacion = await Publicacion.findByIdAndUpdate(id, {
    titulo,
    texto,
    autor,
    categorias,
  });

  res.json(publicacion);
};

const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findByIdAndDelete(id);

  for (let i = 0; i < publicacion.categorias.length; i++) {
    await Categoria.findByIdAndUpdate(publicacion.categorias[i], {
      $pull: { publicaciones: publicacion._id },
    });
  }

  await Usuario.findByIdAndUpdate(publicacion.autor, {
    $pull: { publicaciones: publicacion._id },
  });

  res.json(publicacion);
};

module.exports = {
  verPublicaciones,
  crearPublicacion,
  verPublicacion,
  editarPublicacion,
  eliminarPublicacion,
};
