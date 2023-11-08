const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trabajoPracticoSchema = new Schema(
  {
    nombre: String,
    calificacion: Number,
    fechaInicio: Date,
    fechaFin: Date,
    grupal: Boolean,
    grupos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Grupo",
      },
    ],
    // secciones
    // cursos
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Crear el modelo
const TrabajoPractico = mongoose.model("trabajopractico", trabajoPracticoSchema);

module.exports = TrabajoPractico;
