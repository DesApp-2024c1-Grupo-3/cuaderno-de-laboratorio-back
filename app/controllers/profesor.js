const model = require("../models/profesor");

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
    const profesor = await model.findById(profesorId).populate('cursos');

    // Si se encontró al profesor, obtén la lista de cursos
    const cursos = profesor.cursos;

    res.json({ cursos });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Error al obtener los cursos del profesor ${profesorId}` });
  }
};
