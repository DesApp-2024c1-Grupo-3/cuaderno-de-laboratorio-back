const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cursoSchema = new Schema(
  {
    comision: String,
    horario: String,
    fechaInicio: Date,
    fechaFin: Date,
    //materia
    //alumnos
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Crear el modelo
const Curso = mongoose.model("Curso", cursoSchema);

module.exports = Curso;
