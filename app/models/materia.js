const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materiaSchema = new Schema(
  {
    nombre: String,
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
const Materia = mongoose.model("Materia", materiaSchema);

module.exports = Materia;
