const model = require("../models/alumno");

const CursoModel = require("../models/curso");
exports.getData = async (req, res) => {
  try {
    const arrayAlumno = await model.find();
    console.log(arrayAlumno);
    res.send({ arrayAlumno });
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
      "Ocurrio un error al insertar un elemento en la tabla Alumno: ",
      error
    );
    res.send({ error: "Error" }, 422);
  }
};

exports.getCursosByAlumnoId = async (req, res) => {
  const alumnoId = req.params.alumnoId;

  try {
    // Busca al Alumno por su ID
    const alumno = await model.findById(alumnoId).populate({
      path: 'cursos',
      populate: {
        path: 'materia', // Nombre del campo en el modelo Curso
      },
    });

    // Si se encontró al alumno, obtén la lista de cursos
    const cursos = alumno ? alumno.cursos : [];

    console.log("Cursos obtenidos para el alumno:", cursos);  // Mensaje de consola para verificar
    res.json({ cursos });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Error al obtener los cursos del Alumno ${alumnoId}` });
  }
};
exports.getAlumnoById = async (req, res) => {
  const alumnoId = req.params.alumnoId;
  try {
    const alumno = await model.findById(alumnoId);

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    console.log("Alumno obtenido:", alumno);
    res.json({ alumno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el Alumno" });
  }
};

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