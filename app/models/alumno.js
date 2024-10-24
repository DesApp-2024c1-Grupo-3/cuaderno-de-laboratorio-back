
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alumnoSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    dni: Number,
    email: String,
   
  },
  
  {
    versionKey: false,
    timestamps: true,
  }
);
// Método estático para obtener los cursos de un alumno
alumnoSchema.statics.getCursosByAlumno = async function (alumnoId) {
  try {
    console.log('Alumno ID:', alumnoId);  // Verifica que el alumnoId se está pasando correctamente
    const cursosAlumno = await this.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(alumnoId) }  // Filtra al alumno por ID
      },
      {
        $lookup: {
          from: 'cursos',  // Nombre de la colección de cursos
          localField: '_id',  // Campo del alumno para relacionar (ID del alumno)
          foreignField: 'alumnos',  // Campo en curso que contiene los IDs de alumnos
          as: 'cursos'  // Nombre del array en el que se almacenarán los cursos relacionados
        }
      },
      {
        $unwind: '$cursos'  // Desempaqueta el array de cursos
      },
  // Lookup para obtener la materia del curso
      {
        $lookup: {
          from: 'materias',  // Asegúrate de que el nombre de la colección de materias es correcto
          localField: 'cursos.materia',  // Campo en el curso que referencia la materia
          foreignField: '_id',  // Campo en la colección de materias que se compara con el ID de la materia
          as: 'materiaCurso'  // Nombre del array donde se almacenarán los detalles de la materia
        }
      },
      {
        $unwind: '$materiaCurso'  // Desempaqueta el array de materias
      },
      {
        $project: {
          _id: 0,  // Excluye el _id del alumno
          cursoId: '$cursos._id',  // Incluye el ID del curso
          comision: '$cursos.comision',  // Incluye la comisión del curso
          horario: '$cursos.horario',  // Incluye el horario del curso
          fechaInicio: '$cursos.fechaInicio',  // Incluye la fecha de inicio del curso
          fechaFin: '$cursos.fechaFin',  // Incluye la fecha de fin del curso
          materia: '$materiaCurso.nombre',  // Incluye el nombre de la materia
        }
      }
    ]);


    console.log("Cursos obtenidos para el alumno:", cursosAlumno);
    return cursosAlumno;  // Devuelve los cursos en los que el alumno está inscrito
  } catch (error) {
    console.error('Error al obtener los cursos del alumno:', error);
    throw error;
  }
};
// Crear el modelo
const Alumno = mongoose.model("Alumno", alumnoSchema);
module.exports = Alumno;
