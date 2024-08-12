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
        $lookup: {
          from: 'grupos', // Nombre de la colección de grupos
          localField: 'grupoId',
          foreignField: '_id',
          as: 'grupo'
        }
      },    
      {
        $unwind: {
          path: '$grupo',
          preserveNullAndEmptyArrays: true // En caso de que no haya grupo relacionado
        }
      },
      {
        $project: {
          _id: 1,
          tpId: 1,
          calificacion: 1,
          grupoId: 1,
          alumnoId: 1,
          "grupo.alumnos": 1 // Incluir los alumnos del grupo
        }
      },
      {
        $match: {
           alumnoId: new mongoose.Types.ObjectId(alumnoId),  
            // Calificaciones individuales
          
          
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
