const model = require("../models/curso");

exports.getData = async (req, res) => {
  try {
    const arrayCursos = await model.find();
    console.log(arrayCursos);
    res.send({ arrayCursos });
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
      "Ocurrio un error al insertar un elemento en la tabla Curso: ",
      error
    );
    res.send({ error: "Error" }, 422);
  }
};

// Obtener cursos de un profesor por su ID
exports.getAlumnosByCursoId = async (req, res) => {
  const cursoId = req.params.cursoId;

  try {
    // Busca al profesor por su ID
    const curso = await model.findById(cursoId).populate('alumnos');

    // Si se encontró al profesor, obtén la lista de cursos
    const alumnos = curso.alumnos;

    res.json({ alumnos });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Error al obtener los alumnos para un curso ${cursoId}` });
  }
};

