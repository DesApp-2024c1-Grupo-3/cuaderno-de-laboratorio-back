const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const grupoSchema = new Schema(
  {
    nombre: String,
    alumnos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Alumno",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Crear el modelo
const Grupo = mongoose.model("Grupo", grupoSchema);

module.exports = Grupo;
