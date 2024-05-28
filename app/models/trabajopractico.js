const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trabajoPracticoSchema = new Schema(
  {
    nombre: String,
    calificacion: Number,
    estado: {
      type: String,
      enum: ['Entregado', 'En proceso', 'En preparación'],
      default: 'En preparación'
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

// Middleware para actualizar el estado automáticamente antes de guardar
trabajoPracticoSchema.pre('save', function (next) {
  if (this.calificacion) {
    this.estado = 'Entregado';
  } else if (this.fechaFin && this.fechaInicio) {
    this.estado = 'En proceso';
  } else if (this.nombre && this.consigna) {
    this.estado = 'En preparación';
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
