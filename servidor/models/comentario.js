const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
  texto: String,
  autor: { type: Schema.Types.ObjectId, ref: "Usuario" },
  publicacion: { type: Schema.Types.ObjectId, ref: "Publicacion" },
});

const Comentario = mongoose.model("Comentario", comentarioSchema);

module.exports = Comentario;
