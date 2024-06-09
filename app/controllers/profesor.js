const model = require("../models/profesor");
const CursoModel = require("../models/curso");
const TrabajoPracticoModel = require("../models/trabajopractico");

exports.getData = async (req, res) => {
  try {
    const arrayProfesores = await model.find();
    console.log(arrayProfesores);
    res.send({ arrayProfesores });
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
  }
};

exports.insertData = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const response = await model.create(data);
    res.status(201).json(response);
  } catch (error) {
    console.log(
      "Ocurrio un error al insertar un elemento en la tabla Profesor: ",
      error
    );
    res.send({ error: "Error" }, 422);
  }
};

// Obtener cursos de un profesor por su ID
exports.getCursosByProfesorId = async (req, res) => {
  const profesorId = req.params.profesorId;

  try {
    // Busca al profesor por su ID
    const profesor = await model.findById(profesorId).populate({
      path: 'cursos',
      populate: {
        path: 'materia', // Nombre del campo en el modelo Curso
      },
    });

    // Si se encontró al profesor, obtén la lista de cursos
    const cursos = profesor.cursos;

    res.json({ cursos });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Error al obtener los cursos del profesor ${profesorId}` });
  }
};

// Agregar un nuevo Trabajo Práctico asociado a un profesor mediante un curso
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

