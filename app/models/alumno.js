const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alumnoSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    dni: Number,
    email: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Crear el modelo
const Alumno = mongoose.model("Alumno", alumnoSchema);

module.exports = Alumno;
