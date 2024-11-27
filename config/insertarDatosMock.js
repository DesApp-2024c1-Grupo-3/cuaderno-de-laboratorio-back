const mongoose = require("mongoose");
const TrabajoPractico = require("../app/models/trabajopractico");
const Profesor = require("../app/models/profesor");
const Curso = require("../app/models/curso");
const Alumno = require("../app/models/alumno");
const Grupo = require("../app/models/grupo");
const Materia = require("../app/models/materia");
const Calificacion = require("../app/models/calificacion");
const uri = require('./db');


// Conecta a la base de datos
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión a la base de datos exitosa.");
    createData();
  })
  .catch((e) => {
    console.log("Error de conexión a MongoDB", e.message);
    process.exit(1); // Sale de la aplicación si no se puede conectar
  });

// Crea los profesores y cursos
async function createData() {
  try {
    // Colecciones a limpiar
    const collections = [
      Alumno,
      Profesor,
      Curso,
      Grupo,
      TrabajoPractico,
      Materia,
      Calificacion,
    ];

    // Limpiar todas las colecciones
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    console.log("Se eliminaron los registros anteriores correctamente.");
    
    // Crear Alumnos
    const alumnos = [];
    const nombres = [
      "María", "Ana", "Pedro", "Luisa", "Jorge", "Marta", "Ricardo", 
      "Elena", "Andrés", "Sofía", "Pablo", "Julia", "Tomás", "Gabriela", 
      "Luis", "Clara", "Isabel", "Juan", "Carlos", "Laura", "José", "David", 
      "Claudia"
    ];
    const apellidos = [
      "Ruiz", "García", "Rodríguez", "Pérez", "Fernández", "López", 
      "Martínez", "González", "Sánchez", "Ramírez", "Torres", "Hernández", 
      "Flores", "Morales", "Medina", "Rojas", "Gómez", "Díaz", "Mendoza"
    ];
    
    for (let i = 0; i < 30; i++) {
      const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
      const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
      const email = `${nombreAleatorio.toLowerCase()}${apellidoAleatorio.toLowerCase()}@example.com`;
      const alumno = new Alumno({ nombre: nombreAleatorio, apellido: apellidoAleatorio, dni: 10000000 + i, email });
      await alumno.save();
      alumnos.push(alumno);
    }

    // Crear Cursos
    const curso = new Curso({
      comision: "1610 - Mañana",
      horario: "Lunes y Miércoles, 8:00 AM - 10:00 AM",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      alumnos: alumnos,
    });
    await curso.save();

    const alumnosSeleccionados = alumnos.slice(5, 15);

    const curso2 = new Curso({
      comision: "1609 - Tarde",
      horario: "Martes y Jueves, 13:00 PM - 17:00 PM",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      alumnos: alumnosSeleccionados, // seleccionamos 10 de la lista de  alumnos
    });
    await curso2.save();

    // Crear Profesores
    const profesorConCurso = new Profesor({
      nombre: "Pablo",
      apellido: "Castillo",
      dni: 12345678,
      email: "pablocastillo@example.com",
      cursos: [curso, curso2],
    });
    await profesorConCurso.save();

    const profesorSinCurso = new Profesor({
      nombre: "Sebastian",
      apellido: "Gomez",
      dni: 87654321,
      email: "sebastianGomez@example.com",
    });
    await profesorSinCurso.save();

    // Crear Grupos
    const grupo1 = new Grupo({ nombre: "Grupo 1", alumnos: alumnos.slice(0, 5), curso });
    await grupo1.save();

    const grupo2 = new Grupo({ nombre: "Grupo 2", alumnos: alumnos.slice(5, 10), curso: curso2 });
    await grupo2.save();
  
    // Crear Trabajos Prácticos
    const trabajoPractico1 = new TrabajoPractico({
      nombre: "Trabajo Práctico 1",
      calificacion: 0,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      grupal: true,
      grupos: [grupo1],
    });
    await trabajoPractico1.save();

    const trabajoPractico2 = new TrabajoPractico({
      nombre: "Trabajo Práctico 2",
      calificacion: 10,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      grupal: true,
      grupos: [grupo2],
    });
    await trabajoPractico2.save(); 

    // Crear Materias
    const materia1 = new Materia({ nombre: "Matemáticas", cursos: [ curso] });
    await materia1.save();

    const materia2 = new Materia({ nombre: "Biología", cursos: [curso2] });
    await materia2.save();

    // Asignar Materias a los Cursos
    curso.materia = materia1;
    //curso.tps = [trabajoPractico1];
    await curso.save();

    curso2.materia = materia2;
    //curso2.tps = [ trabajoPractico2];
    await curso2.save();

     // Actualizar Alumnos con Cursos y TPs
    for (const alumno of alumnos) {
      alumno.cursos = [curso._id]; // Agrega los cursos a cada alumno
      alumno.tps = [trabajoPractico1._id, trabajoPractico2._id]; // Agrega los TPs a cada alumno
      await alumno.save();
    } 
    for (const alumno of alumnosSeleccionados) {
      alumno.cursos = [curso2._id]; // Agrega los cursos a cada alumno
      //alumno.tps = [trabajoPractico1._id, trabajoPractico2._id]; // Agrega los TPs a cada alumno
      await alumno.save();
    } 

    console.log("Datos nuevos insertados correctamente.");
  } catch (error) {
    console.error("Ocurrió un error al insertar los datos:", error);
  } finally {
    // Cierra la conexión de manera segura
    mongoose.connection.close();
    console.log("Conexión a la base de datos cerrada.");
  }
}