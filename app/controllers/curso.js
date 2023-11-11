const Materia = require('../models/materia');
const Curso = require('../models/curso');
const mongoose = require('mongoose');

exports.getData = async (req, res) => {
  try {
    const arrayCursos = await Curso.find();
    console.log(arrayCursos);
    res.send({ arrayCursos });
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
  }
};

exports.insertData = async (req, res) => {
  try {
    const data = req.body;

    // Crear el objeto Curso
    const nuevoCurso = await Curso.create(data);

    // Agregar la relación con la materia
    if (data.materia && data.materia.length > 0) {
      const materiaExistente = await Materia.findById(data.materia);
      if (materiaExistente) {
        nuevoCurso.materia = data.materia;
        await nuevoCurso.save();

        // Agregar el curso a la lista de cursos en la materia existente
        materiaExistente.cursos.push(nuevoCurso._id);
        await materiaExistente.save();

        // Devolver la materia con la lista de cursos actualizada
        res.status(201).json({
          _id: materiaExistente._id,
          nombre: materiaExistente.nombre,
          cursos: [nuevoCurso._id],  // Devolver solo el ID del nuevo curso
        });
      } else {
        console.log('La materia con la ID especificada no existe.');
        res.status(404).json({ error: 'Materia no encontrada' });
      }
    } else {
      // Si no se proporciona una materia, devolver solo el curso
      res.status(201).json(nuevoCurso);
    }
  } catch (error) {
    console.log("Ocurrió un error al insertar un elemento en la tabla Curso:", error);
    res.status(422).json({ error: "Error" });
  }
};


// Obtener cursos de un profesor por su ID
exports.getAlumnosByCursoId = async (req, res) => {
  const cursoId = req.params.cursoId;

  try {
    // Busca al profesor por su ID
    const curso = await Curso.findById(cursoId).populate('alumnos');

    // Si se encontró al profesor, obtén la lista de cursos
    const alumnos = curso.alumnos;

    res.json({ alumnos });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Error al obtener los alumnos para un curso ${cursoId}` });
  }
};

