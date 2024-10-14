const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trabajoPracticoSchema = new Schema(
  {
    nombre: String,
    
    estado: {
      type: String,
      enum: ['Futuro', 'En marcha', 'En evaluacion', 'Cerrado'],
      default: 'Futuro'
    },
    fechaInicio: Date,
    fechaFin: Date,
    grupal: Boolean,
    grupos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Grupo",
      },
    ],
    //se agrego la consigna al back
    consigna: String, // Nuevo campo para la consigna
    cuatrimestre: Boolean, // 
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
