const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const calificacionSchema = new Schema(
  {
    file: [""],  //Lista de extensiones que se pueden carga .doc, .pdf, .xls
    comentarioAlum: String,
    devolucionProf: String,
    calificacion: Number, 
    tpId: {
      type: Schema.Types.ObjectId,
      ref: "trabajopractico",
    },  
    alumnoId: {
      type: Schema.Types.ObjectId,
      ref: "alumno",
    }, 
    grupoId:{
      type: Schema.Types.ObjectId,
      ref: "grupo",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);



// Crear el modelo
const Calificacion = mongoose.model("Calificacion", calificacionSchema);

module.exports = Calificacion;
