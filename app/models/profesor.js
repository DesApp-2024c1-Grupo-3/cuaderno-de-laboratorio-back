const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profesorSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    dni: Number,
    email: String,
    cursos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Curso",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Crear el modelo
const Profesor = mongoose.model("Profesor", profesorSchema);

module.exports = Profesor;
