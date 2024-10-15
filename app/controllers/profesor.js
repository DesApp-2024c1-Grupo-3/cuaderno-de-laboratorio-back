const bcrypt = require('bcrypt');
const model = require("../models/profesor");
const CursoModel = require("../models/curso");
const TrabajoPracticoModel = require("../models/trabajopractico");

// Obtener todos los profesores
exports.getData = async (req, res) => {
  try {
    const arrayProfesores = await model.find();
    console.log(arrayProfesores);
    res.json({ arrayProfesores });
  } catch (error) {
    console.log(`Ocurrió un error: ${error}`);
    res.status(500).json({ error: "Error al obtener los profesores" });
  }
};

// Insertar un nuevo profesor con manejo opcional de contraseña cifrada
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
    console.log("Ocurrió un error al insertar un elemento en la tabla Profesor: ", error);
    res.status(422).json({ error: "Error al insertar el profesor" });
  }
};

// Obtener un profesor por su ID
exports.getProfesorPorId = async (req, res) => {
  const profesorId = req.params.profesorId;

  try {
    const profesor = await model.findById(profesorId);

    if (!profesor) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    const { nombre, apellido } = profesor;
    console.log("Profesor obtenido:", profesor);
    res.json({ nombre, apellido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener el profesor ${profesorId}` });
  }
};

// Obtener cursos de un profesor por su ID
exports.getCursosByProfesorId = async (req, res) => {
  const profesorId = req.params.profesorId;

  try {
    const profesor = await model.findById(profesorId).populate({
      path: 'cursos',
      populate: {
        path: 'materia', // Relación con la materia en el curso
      },
    });

    if (!profesor) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    const cursos = profesor.cursos;
    console.log("Cursos obtenidos para el profesor:", cursos);
    res.json({ cursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener los cursos del profesor ${profesorId}` });
  }
};

// Agregar un nuevo Trabajo Práctico a un curso asociado a un profesor
exports.addTpToCursoByProfesorId = async (req, res) => {
  const profesorId = req.params.profesorId;
  const cursoId = req.params.cursoId;
  const data = req.body;

  try {
    // Verificar si el profesor existe
    const profesor = await model.findById(profesorId);
    if (!profesor) {
      return res.status(404).json({ error: `Profesor no encontrado con ID: ${profesorId}` });
    }

    // Verificar si el curso pertenece al profesor
    if (!profesor.cursos.includes(cursoId)) {
      return res.status(403).json({ error: `El profesor no tiene acceso al curso con ID: ${cursoId}` });
    }

    // Crear el Trabajo Práctico asociado al curso y grupos
    const nuevoTp = await TrabajoPracticoModel.create({
      ...data,
      grupos: data.grupo || [], // Asignar los grupos proporcionados o una matriz vacía si no se proporciona ninguno
    });

    // Agregar el Trabajo Práctico al curso
    await CursoModel.findByIdAndUpdate(
      cursoId,
      { $push: { tps: nuevoTp._id } },
      { new: true }
    );

    res.status(201).json({ nuevoTp });
  } catch (error) {
    console.error("Error al agregar TP al curso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los profesores en formato JSON
exports.getDataJson = async (req, res) => {
  try {
    const arrayProfesoresJson = await model.find();
    res.json(arrayProfesoresJson);
  } catch (error) {
    console.log(`Ocurrió un error: ${error}`);
    res.status(500).json({ error: "Error al obtener los profesores" });
  }
};