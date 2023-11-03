const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: String,
  email: String,
  password: String,
  publicaciones: [{ type: Schema.Types.ObjectId, ref: "Publicacion" }],
  comentarios: [{ type: Schema.Types.ObjectId, ref: "Comentario" }],
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
