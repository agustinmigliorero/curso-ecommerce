const Categoria = require("../models/categoria");
const Publicacion = require("../models/publicacion");

const verCategorias = async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
};

const crearCategoria = async (req, res) => {
  const { nombre } = req.body;
  const categoria = new Categoria({ nombre });
  await categoria.save();
  res.json({ categoria, message: "Categoria creada" });
};

const verCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("publicaciones");
  res.json(categoria);
};

const editarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const categoria = await Categoria.findByIdAndUpdate(id, { nombre });
  res.json(categoria);
};

const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndDelete(id);

  for (let i = 0; i < categoria.publicaciones.length; i++) {
    await Publicacion.findByIdAndUpdate(categoria.publicaciones[i], {
      $pull: { categorias: categoria._id },
    });
  }

  res.json(categoria);
};

module.exports = {
  verCategorias,
  crearCategoria,
  verCategoria,
  editarCategoria,
  eliminarCategoria,
};
