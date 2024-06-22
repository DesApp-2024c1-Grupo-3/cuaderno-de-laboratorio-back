const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;  

const calificacionSchema = new Schema(
  {
    file: [""],  //Lista de extensiones que se pueden carga .doc, .pdf, .xls
    comentarioAlum: String,
    devolucionProf:String,
    calificacion: Number,
    tpId: ObjectId, 
    alumnoId: ObjectId,  
    grupoId: ObjectId,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



// Crear el modelo
const Calificacion = mongoose.model("Calificacion", calificacionSchema);

module.exports = Calificacion;
