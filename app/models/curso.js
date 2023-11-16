const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cursoSchema = new Schema(
  {
    comision: String,
    horario: String,
    fechaInicio: Date,
    fechaFin: Date,
    alumnos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Alumno",
      },
    ],
    materia: {
      type: Schema.Types.ObjectId,
      ref: 'Materia',
    },
    tps: [
      {
        type: Schema.Types.ObjectId,
        ref: "trabajopractico",
      },
    ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Crear el modelo
const Curso = mongoose.model("Curso", cursoSchema);

module.exports = Curso;
