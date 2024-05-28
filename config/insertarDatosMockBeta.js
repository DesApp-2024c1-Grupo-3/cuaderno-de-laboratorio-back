const mongoose = require("mongoose");
const TrabajoPractico = require("../app/models/trabajopractico");
const Profesor = require("../app/models/profesor");
const Curso = require("../app/models/curso");
const Alumno = require("../app/models/alumno");
const Grupo = require("../app/models/grupo");
const Materia = require("../app/models/materia");

const scope = "local";
const uri = `mongodb://localhost:27017/${scope}`;

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
    ];

    // Limpiar todas las colecciones
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    console.log("Se eliminaron los registros anteriores correctamente.");
    // Crear 10 Alumnos
    const alumnos = [];
    const nombres = [
      "María",
      "Ana",  
      "Pedro",
      "Luisa",,
      "Jorge",
      "Marta",
      "Ricardo",
      "Elena",
      "Andrés",
      "Sofía",
      "Pablo", 
      "Julia",
      "Tomás", 
      "Gabriela",
      "Luis",
      "Clara",
      "Isabel",        
      "Juan",
      "María",
      "Carlos",
      "Laura",
      "José",
      "Ana",
      "David",
      "Claudia",
      "Pedro",
      "Sofía",
    ];
    
    const apellidos = [
      "Ruiz",
      "García",
      "Rodríguez",
      "Pérez",
      "Fernández",
      "López",
      "Martínez",
      "González",
      "Sánchez",
      "Ramírez",
      "Torres",
      "Hernández",
      "Flores",
      "Morales",
      "Medina",
      "Rojas",
      "Gómez",
      "Díaz",
      "Mendoza"
    ];
    for (let i = 1; i <= 30; i++) {
      const nombreAleatorio =
        nombres[Math.floor(Math.random() * nombres.length)];
      const apellidoAleatorio =
        apellidos[Math.floor(Math.random() * apellidos.length)];

      const email = `${nombreAleatorio.toLowerCase()}${apellidoAleatorio.toLowerCase()}@example.com`;

      const alumno = new Alumno({
        nombre: nombreAleatorio,
        apellido: apellidoAleatorio,
        dni: 10000000 + i,
        email: email,
      });
      await alumno.save();
      alumnos.push(alumno);
    }

    // Crear Curso con los 10 Alumnos
    const curso = new Curso({
      comision: "Curso 1 - prueba",
      horario: "Lunes y Miércoles, 8:00 AM - 10:00 AM",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      alumnos: alumnos,
    });
    await curso.save();

    // Crear Curso con los 10 Alumnos
    const curso2 = new Curso({
      comision: "Curso 2 - prueba ",
      horario: "Martes y Jueves, 8:00 AM - 10:00 AM",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      alumnos: alumnos.slice(0, 5),
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

    // Crear Grupos con 5 Alumnos cada uno
    const grupo1 = new Grupo({
      nombre: "Grupo 1",
      alumnos: alumnos.slice(0, 5),
    });
    await grupo1.save();

    const grupo2 = new Grupo({
      nombre: "Grupo 2",
      alumnos: alumnos.slice(5, 10),
    });
    await grupo2.save();
    const grupo3 = new Grupo({
      nombre: "Grupo 3",
      alumnos: alumnos.slice(5, 10),
    });
    await grupo3.save();

    // Crear Trabajo Práctico con los 2 Profesores
    const trabajoPractico = new TrabajoPractico({
      nombre: "Trabajo Práctico 1",
      calificacion: 0, // Calificación inicial
      fechaInicio: new Date(),
      fechaFin: new Date(),
      grupal: true,
      grupos: [grupo1, grupo2],
    });
    await trabajoPractico.save();

    // Crear Trabajo Práctico con los 2 Profesores
    const trabajoPractico2 = new TrabajoPractico({
      nombre: "Trabajo Práctico 2",
      calificacion: 10, // Calificación inicial
      fechaInicio: new Date(),
      fechaFin: new Date(),
      grupal: true,
      grupos: [grupo1],
    });
    await trabajoPractico2.save();

    // Crear Materia
    const materia = new Materia({
      nombre: "Matemáticas",
      cursos: [curso, curso2],
    });
    await materia.save();

    // Crear Materia
    const materia2 = new Materia({
      nombre: "Biologia",
      cursos: [curso, curso2],
    });
    await materia2.save();

    // Asignar los Trabajos Prácticos al Curso
    curso.materia = materia;
    curso2.materia = materia2;
    await curso.save();
    await curso2.save();

    // Asignar los Trabajos Prácticos al Curso
    curso.tps = [trabajoPractico, trabajoPractico2];
    curso2.tps = [trabajoPractico, trabajoPractico2,trabajoPractico, trabajoPractico2];
    await curso.save();
    await curso2.save();

    grupo1.curso = curso;
    grupo2.curso = curso2;
    grupo3.curso = curso2;
    await grupo1.save();
    await grupo2.save();
    await grupo3.save();
    
    console.log("Datos nuevos insertados correctamente.");
  } catch (error) {
    console.error("Ocurrió un error al insertar los datos:", error);
  } finally {
    // Cierra la conexión de manera segura
    mongoose.connection.close();
    console.log("Conexión a la base de datos cerrada.");
  }
}

