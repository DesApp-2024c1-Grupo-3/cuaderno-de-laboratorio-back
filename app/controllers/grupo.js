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
exports.getGrupoPorId = async (req, res) => {
  const grupoId = req.params.grupoId;
  try {
    const arrayAlumnos = await model.findById(grupoId).populate('alumnos');
    const alumnos = arrayAlumnos.alumnos
    console.log(alumnos);
    res.json({ alumnos });
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

// Función para eliminar un Tp por su ID
exports.deleteGrupo = async (req, res) => {
  const grupoId  = req.params.grupoId;
  try {
    const deletedGrupo = await model.findByIdAndDelete(grupoId);

    if (!deletedGrupo) {
      return res.status(404).json({ error: "Grupo no encontrado" });
    }

    res.status(200).json({ message: "Grupo eliminado exitosamente", deletedGrupo });
  } catch (error) {
    console.error('Error al eliminar el Grupo:', error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


exports.actualizarGrupo = async (req, res) => {
  const grupoId = req.params.grupoId;
  const { nombre, alumnos } = req.body;

  try {
    // Verificar si el ID del grupo es válido
    if (!mongoose.Types.ObjectId.isValid(grupoId)) {
      return res.status(400).json({ mensaje: 'ID de grupo inválido' });
    }

    // Verificar si los IDs de los alumnos son válidos
    const alumnosObjectId = alumnos.map(alumnoId => {
      if (!mongoose.Types.ObjectId.isValid(alumnoId)) {
        return res.status(400).json({ mensaje: `ID de alumno inválido: ${alumnoId}` });
      }
      return new mongoose.Types.ObjectId(alumnoId);
    });

    // Actualizar el grupo
    const grupoActualizado = await model.findByIdAndUpdate(
      grupoId,
      { nombre, alumnos: alumnosObjectId },
      { new: true }
    );

    // Verificar si el grupo fue encontrado y actualizado
    if (!grupoActualizado) {
      return res.status(404).json({ mensaje: 'Grupo no encontrado' });
    }

    res.status(200).json({ mensaje: 'Grupo actualizado exitosamente', grupoActualizado });
  } catch (error) {
    console.error('Error al actualizar el grupo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


