
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alumnoSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    dni: Number,
    email: String,
    // Referencias a la colección 'tps'
    tps: [
      {
        type: Schema.Types.ObjectId,
        ref: "trabajopractico",
      },
    ],
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
const Alumno = mongoose.model("Alumno", alumnoSchema);


module.exports = Alumno;
