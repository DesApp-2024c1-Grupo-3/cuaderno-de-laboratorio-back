const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trabajoPracticoSchema = new Schema(
  {
    archivosSubido: [""],  //Lista de extensiones que se pueden carga .doc, .pdf, .xls
    comentarioAlum: String,
    devolucionPorf:String,
    calificacion: Number,
    tpId: ObjectId, 
    alumno: ObjectId,  
    grupo: ObjectId,
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
