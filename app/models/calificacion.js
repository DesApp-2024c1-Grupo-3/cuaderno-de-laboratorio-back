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



// Crear el modelo
const TrabajoPractico = mongoose.model("trabajopractico", trabajoPracticoSchema);

module.exports = TrabajoPractico;
