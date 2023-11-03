const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  nombre: String,
  publicaciones: [{ type: Schema.Types.ObjectId, ref: "Publicacion" }],
});

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;
