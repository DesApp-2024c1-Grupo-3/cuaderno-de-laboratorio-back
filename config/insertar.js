const mongoose = require("mongoose");
const TrabajoPractico = require("../app/models/trabajopractico");
const Profesor = require("../app/models/profesor");
const Curso = require("../app/models/curso");
const Alumno = require("../app/models/alumno");
const Grupo = require("../app/models/grupo");
const Materia = require("../app/models/materia");
const Calificacion = require("../app/models/calificacion");

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

// Crea los profesores, cursos, calificaciones y demás datos
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
    const alumnosData = [
      { nombre: "Pablo", apellido: "Fernández", dni: 10000001, email: "pablofernández@example.com", password: "1234" },
      { nombre: "Isabel", apellido: "Rodríguez", dni: 10000005, email: "isabelrodríguez@example.com", password: "1234" },
      { nombre: "Gabriela", apellido: "García", dni: 10000008, email: "gabrielagarcía@example.com", password: "1234" },
      { nombre: "Andrés", apellido: "Flores", dni: 10000011, email: "andrésflores@example.com", password: "1234" },
      { nombre: "Carlos", apellido: "Rodríguez", dni: 10000014, email: "carlosrodríguez@example.com", password: "1234" },
      { nombre: "José", apellido: "Díaz", dni: 10000018, email: "josédíaz@example.com", password: "1234" },
      { nombre: "Carlos", apellido: "Gómez", dni: 10000020, email: "carlosgómez@example.com", password: "1234" },
      { nombre: "José", apellido: "Pérez", dni: 10000023, email: "josépérez@example.com", password: "1234" },
      { nombre: "Pedro", apellido: "González", dni: 10000024, email: "pedrogonzález@example.com", password: "1234" },
      { nombre: "Elena", apellido: "Sánchez", dni: 10000007, email: "elenasánchez@example.com", password: "1234" },
      { nombre: "Tomás", apellido: "Ruiz", dni: 10000009, email: "tomásruiz@example.com", password: "1234" },
      { nombre: "Gabriela", apellido: "Mendoza", dni: 10000013, email: "gabrielamendoza@example.com", password: "1234" },
      { nombre: "José", apellido: "Torres", dni: 10000019, email: "josétorres@example.com", password: "1234" },
      { nombre: "Laura", apellido: "Flores", dni: 10000028, email: "lauraflores@example.com", password: "1234" },
      { nombre: "Marta", apellido: "Gómez", dni: 10000000, email: "martagómez@example.com", password: "1234" },
      { nombre: "Ana", apellido: "Torres", dni: 10000003, email: "anatorres@example.com", password: "1234" },
      { nombre: "Pablo", apellido: "Hernández", dni: 10000004, email: "pablohernández@example.com", password: "1234" },
      { nombre: "David", apellido: "García", dni: 10000010, email: "davidgarcía@example.com", password: "1234" },
      { nombre: "Sofía", apellido: "Flores", dni: 10000015, email: "sofíaflores@example.com", password: "1234" },
      { nombre: "Carlos", apellido: "González", dni: 10000016, email: "carlosgonzález@example.com", password: "1234" },
      { nombre: "María", apellido: "Díaz", dni: 10000017, email: "maríadíaz@example.com", password: "1234" },
      { nombre: "Luisa", apellido: "Mendoza", dni: 10000021, email: "luisamendoza@example.com", password: "1234" }
    ];

    const alumnos = await Alumno.insertMany(alumnosData);

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
      alumnos: alumnosSeleccionados,
    });
    await curso2.save();

    // Crear Profesores
    const profesorConCurso = new Profesor({
      nombre: "Pablo",
      apellido: "Castillo",
      dni: 12345678,
      email: "pablocastillo@example.com",
      password:"1234",
      cursos: [curso, curso2],
    });
    await profesorConCurso.save();

    const profesorConCurso1 = new Profesor({
      nombre: "Roberto",
      apellido: "Castillo",
      dni: 22222222,
      email: "castillo@example.com",
      password:"1234",
      cursos: [curso, curso2],
    });
    await profesorConCurso1.save();

    const profesorSinCurso = new Profesor({
      nombre: "Sebastian",
      apellido: "Gomez",
      dni: 87654321,
      email: "sebastianGomez@example.com",
      password:"1234",
    });
    await profesorSinCurso.save();

    // Crear Grupos
    const grupo1 = new Grupo({ nombre: "Grupo 1", alumnos: alumnos.slice(0, 5), curso });
    await grupo1.save();

    const grupo2 = new Grupo({ nombre: "Grupo 2", alumnos: alumnos.slice(5, 10), curso: curso2 });
    await grupo2.save();

    // Crear Calificaciones (agregado)
    const calificacionesData = [
      { nota: 7, descripcion: "Buen desempeño" },
      { nota: 9, descripcion: "Muy buen desempeño" },
      { nota: 10, descripcion: "Excelente" },
      { nota: 6, descripcion: "Suficiente" },
      { nota: 4, descripcion: "Insuficiente" },
    ];

    const calificaciones = await Calificacion.insertMany(calificacionesData);
    console.log("Calificaciones creadas correctamente.");

    // Crear Trabajos Prácticos
    const trabajoPractico1 = new TrabajoPractico({
      nombre: "Trabajo Práctico 1",
      calificacion: calificaciones.map(calif => calif._id), // Inserta los ObjectIds de las calificaciones
      fechaInicio: new Date(),
      fechaFin: new Date(),
      grupal: true,
      grupos: [grupo1],
    });
    await trabajoPractico1.save();

    const trabajoPractico2 = new TrabajoPractico({
      nombre: "Trabajo Práctico 2",
      calificacion: calificaciones.map(calif => calif._id),
      fechaInicio: new Date(),
      fechaFin: new Date(),
      grupal: true,
      grupos: [grupo2],
    });
    await trabajoPractico2.save();

    // Crear Materias
    const materia1 = new Materia({ nombre: "Matemáticas", cursos: [curso] });
    await materia1.save();

    const materia2 = new Materia({ nombre: "Biología", cursos: [curso2] });
    await materia2.save();

    // Asignar Materias a los Cursos
    curso.materia = materia1;
    await curso.save();

    curso2.materia = materia2;
    await curso2.save();

    // Actualizar Alumnos con Cursos y TPs
    for (const alumno of alumnos) {
      alumno.cursos = [curso._id];
      alumno.tps = [trabajoPractico1._id, trabajoPractico2._id];
      await alumno.save();
    }

    for (const alumno of alumnosSeleccionados) {
      alumno.cursos = [curso2._id];
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
