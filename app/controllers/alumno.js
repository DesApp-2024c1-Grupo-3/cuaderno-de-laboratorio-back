const bcrypt = require('bcrypt');
const model = require("../models/alumno");

// Obtener todos los alumnos
exports.getData = async (req, res) => {
  try {
    const arrayAlumno = await model.find();
    console.log(arrayAlumno);
    res.send({ arrayAlumno });
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
    res.status(500).json({ error: "Error al obtener los alumnos" });
  }
};

// Insertar un nuevo alumno, con manejo opcional de contraseña cifrada
exports.insertData = async (req, res) => {
  try {
    const data = req.body;

    // Si existe una contraseña en el body, cifrarla antes de guardarla
    if (data.password) {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }

    console.log(data);
    const response = await model.create(data);
    res.status(201).json(response);
  } catch (error) {
    console.log("Ocurrió un error al insertar un elemento en la tabla Alumno: ", error);
    res.status(422).json({ error: "Error al insertar el alumno" });
  }
};

// Obtener cursos por ID de alumno
exports.getCursosByAlumnoId = async (req, res) => {
  const alumnoId = req.params.alumnoId;

  try {
    const alumno = await model.findById(alumnoId).populate({
      path: 'cursos',
      populate: {
        path: 'materia', // Relación con la materia en el curso
      },
    });

    const cursos = alumno ? alumno.cursos : [];
    console.log("Cursos obtenidos para el alumno:", cursos);
    res.json({ cursos });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Error al obtener los cursos del Alumno ${alumnoId}` });
  }
};

// Obtener cursos por ID de alumno utilizando agregaciones adicionales
exports.getCursosByAlumnoIdWithAgreggate = async (req, res) => {
  const alumnoId = req.params.alumnoId;
  console.log("Intentando obtener cursos para el alumno:", alumnoId);
  try {
    const cursos = await model.getCursosByAlumno(alumnoId);
    res.json({ cursos });
  } catch (error) {
    console.error('Error al obtener los cursos del alumno:', error);
    res.status(500).json({ error: 'Error al obtener los cursos del alumno' });
  }
};

// Obtener un alumno por su ID
exports.getAlumnoById = async (req, res) => {
  const alumnoId = req.params.alumnoId;
  try {
    const alumno = await model.findById(alumnoId);

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    const { nombre, apellido, dni } = alumno;
    console.log("Alumno obtenido:", alumno);
    res.json({ nombre, apellido, dni });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el Alumno" });
  }
};

// Añadir TP y curso a un alumno
exports.addTpAndCurso = async (req, res) => {
  const { alumnoId } = req.params;
  const { tpId, cursoId } = req.body;

  try {
    const alumno = await model.findById(alumnoId);
    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    alumno.tps.push(tpId);
    alumno.cursos.push(cursoId);
    await alumno.save();

    res.status(200).json({ message: "TP y curso añadidos correctamente" });
  } catch (error) {
    console.error("Error al añadir TP y curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los alumnos en formato JSON
exports.getDataJson = async (req, res) => {
  try {
    const arrayAlumnos = await model.find();
    res.json(arrayAlumnos);
  } catch (error) {
    console.log(`Ocurrió un error: ${error}`);
    res.status(500).json({ error: "Error al obtener los alumnos" });
  }
};
