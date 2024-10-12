const mongoose = require("mongoose");
const TrabajoPractico = require("./trabajopractico");
const Schema = mongoose.Schema;


const calificacionSchema = new Schema(
  {
    file: [Buffer],  // Almacenar archivos en formato binario
    fileType: [String], // Mime-type (ej. 'application/pdf', 'image/png') 
    fileName: [String], // Almacenar nombres de los archivos
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

calificacionSchema.statics.getCalificacionesByAlumno = async function(alumnoId) {
  try {
    const calificaciones = await this.aggregate([
      {
        $lookup: {
          from: 'trabajopractico',
          localField: 'tpId',
          foreignField: '_id',
          as: 'trabajoPractico'
        }
      },
      {
        $unwind: {
          path: '$trabajoPractico',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'grupos',
          localField: 'grupoId',
          foreignField: '_id',
          as: 'grupo'
        }
      },
      {
        $unwind: {
          path: '$grupo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          tpId: 1,
          calificacion: 1,
          grupoId: 1,
          alumnoId: 1,
          "grupo.alumnos": 1
        }
      },
      {
        $match: {
          $or: [
            { alumnoId: new mongoose.Types.ObjectId(alumnoId) },
            { "grupo.alumnos": new mongoose.Types.ObjectId(alumnoId) }
          ]
        }
      }
    ]);

    return calificaciones;
  } catch (error) {
    console.error('Error al obtener las calificaciones:', error);
    throw error;
  }
};
// Crear el modelo
const Calificacion = mongoose.model("Calificacion", calificacionSchema);
module.exports = Calificacion;
