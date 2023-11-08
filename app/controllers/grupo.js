const model = require("../models/grupo");
const mongoose = require('mongoose');

exports.getData = async (req, res) => {
  try {
    const arrayGrupos = await model.find();
    console.log(arrayGrupos);
    res.send({ arrayGrupos });
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
      "Ocurrio un error al insertar un elemento en la tabla Grupo: ",
      error
    );
    res.send({ error: "Error" }, 422);
  }
};


//actualizar lista Alumnos De un grupo Por Id
exports.actualizarListaAlumnos = async (req, res) => {
  const grupoId = req.params.grupoId;
  const { alumnos } = req.body; // Suponiendo que req.body.alumnos es un array de IDs de alumnos

  try {
    // Verificar si el ID del grupo está en el formato correcto
    if (!mongoose.Types.ObjectId.isValid(grupoId)) {
      return res.status(400).json({ mensaje: 'ID de grupo inválido' });
    }

    // Crear una lista de objetos ObjectId a partir de los IDs de alumnos
    const alumnosObjectId = alumnos.map(alumnoId => {
      if (!mongoose.Types.ObjectId.isValid(alumnoId)) {
        return res.status(400).json({ mensaje: 'ID de alumno inválido' });
      }
      return new mongoose.Types.ObjectId(alumnoId); // Usa new aquí para crear un nuevo objeto ObjectId
    });

    // Buscar y actualizar el grupo por su ID
    const grupoActualizado = await model.findByIdAndUpdate(
      grupoId,
      { $set: { alumnos: alumnosObjectId } },
      { new: true }
    );

    // Verificar si el grupo fue encontrado y actualizado correctamente
    if (!grupoActualizado) {
      return res.status(404).json({ mensaje: 'Grupo no encontrado' });
    }

    res.status(200).json({ mensaje: 'Lista de alumnos actualizada exitosamente', grupoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};






