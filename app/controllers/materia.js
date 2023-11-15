const mongoose = require('mongoose');
const Materia = require('../models/materia');
const Curso = require('../models/curso'); 


// Controlador para obtener todas las materias con información de cursos
exports.getMaterias = async (req, res) => {
  try {
    const materiasConCursos = await Materia.find().populate('cursos', '_id');

    res.json(materiasConCursos.map(({ _id, nombre, cursos }) => ({
      _id,
      nombre,
      cursos: cursos.map(({ _id }) => ({ _id })),
    })));
  } catch (error) {
    console.error('Error al obtener materias con cursos:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.stack });
  }
};





// Controlador para crear una nueva materia
exports.createMateria = async (req, res) => {
  try {
    const nuevaMateria = new Materia(req.body); 
    const materiaGuardada = await nuevaMateria.save();
    res.status(201).json(materiaGuardada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getCursosByMateriaId = async (req, res) => {
  const { materiaId } = req.params;

  try {
    const materia = await Materia.findById(materiaId);

    if (!materia) {
      return res.status(404).json({ message: 'No se encontró la materia especificada' });
    }

    // Encuentra cursos cuya propiedad 'materia' coincida con la ID de la materia
    const cursos = await Curso.find({ materia: materiaId });

    if (!cursos || cursos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron cursos para la materia especificada' });
    }

    res.json(cursos);
  } catch (error) {
    console.error('Error al obtener cursos por materiaId:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.stack });
  }
};









