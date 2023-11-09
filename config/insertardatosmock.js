const mongoose = require("mongoose");
const TrabajoPractico = require("../app/models/trabajopractico");
const Profesor = require("../app/models/profesor");
const Curso = require("../app/models/curso");
const Alumno = require("../app/models/alumno");
const Grupo = require("../app/models/grupo");

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
    const collections = [Alumno, Profesor, Curso, Grupo, TrabajoPractico];

    // Limpiar todas las colecciones
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    console.log("Se eliminaron los registros anteriores correctamente.");
    // Crear 10 Alumnos
    const alumnos = [];
    const nombres = [
      "Juan",
      "María",
      "Carlos",
      "Laura",
      "José",
      "Ana",
      "David",
      "Claudia",
      "Pedro",
      "Sofía"
    ];

    const apellidos = [
      "García",
      "Rodríguez",
      "Pérez",
      "Fernández",
      "López",
      "Martínez",
      "González",
      "Sánchez",
      "Ramírez",
      "Torres"
    ];
    for (let i = 1; i <= 10; i++) {
      const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
      const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];

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
      comision: "A1",
      horario: "Lunes y Miércoles, 8:00 AM - 10:00 AM",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      alumnos: alumnos,
    });
    await curso.save();

    // Crear Profesores
    const profesorConCurso = new Profesor({
      nombre: "Pablo",
      apellido: "Castillo",
      dni: 12345678,
      email: "pablocastillo@example.com",
      cursos: [curso]
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

    // Crear Trabajo Práctico con los 2 Profesores
    const trabajoPractico = new TrabajoPractico({
      nombre: "Trabajo Práctico 1",
      calificacion: 0, // Calificación inicial
      fechaInicio: new Date(),
      fechaFin: new Date(),
      grupal: false,
      profesores: [profesorConCurso, profesorSinCurso],
    });
    await trabajoPractico.save();
    console.log("Datos nuevos insertados correctamente.");
  } catch (error) {
    console.error("Ocurrió un error al insertar los datos:", error);
  } finally {
    // Cierra la conexión de manera segura
    mongoose.connection.close();
    console.log("Conexión a la base de datos cerrada.");
  }
}
