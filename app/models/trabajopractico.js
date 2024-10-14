const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trabajoPracticoSchema = new Schema(
  {
    nombre: String,
    calificacion: [
      {
        type: Schema.Types.ObjectId,
        ref: "Calificacion",
      },
    ],
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

trabajoPracticoSchema.pre('save', function (next) {
  const now = new Date();

  if (this.fechaFin && now > this.fechaFin) {
    this.estado = 'En evaluacion';
  } else if (this.fechaInicio && now >= this.fechaInicio) {
    this.estado = 'En marcha';
  } else {
    this.estado = 'Futuro';
  }
  next();
});

// Método estático para obtener el nombre y la consigna de otro trabajo práctico de la misma materia
trabajoPracticoSchema.statics.obtenerNombreYConsignaDeOtroTP = async function (idMateria) {
  const otroTP = await this.findOne({ materia: idMateria }).select('nombre consigna');
  return otroTP;
};

// Crear el modelo
const TrabajoPractico = mongoose.model("trabajopractico", trabajoPracticoSchema);

module.exports = TrabajoPractico;
