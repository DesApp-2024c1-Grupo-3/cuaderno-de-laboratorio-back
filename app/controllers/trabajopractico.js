const model = require("../models/trabajopractico");
const mongoose = require('mongoose');
const Grupo = require('../models/grupo');
const CursoModel = require("../models/curso");
const modelProfesor = require("../models/profesor");

exports.getData = async (req, res) => {
  try {
    const arrayTps = await model.find();
    console.log(arrayTps);
    res.send({ arrayTps });
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
      "Ocurrio un error al insertar un elemento en la tabla TrabajoPractico: ",
      error
    );
    res.send({ error: "Error" }, 422);
  }
};
exports.insertDataBynari = async (req, res) => {
  const profesorId = req.params.profesorId;
  const cursoId = req.params.cursoId;
  const data = req.body;
  try {
    // Verificar si el profesor existe
    const profesor = await modelProfesor.findById(profesorId);
    if (!profesor) {
      return res.status(404).json({ error: `Profesor no encontrado con ID: ${profesorId}` });
    }
    // Verificar si el curso pertenece al profesor
    if (!profesor.cursos.includes(cursoId)) {
      return res.status(403).json({ error: `El profesor no tiene acceso al curso con ID: ${cursoId}` });
    }
    const { data } = req.body;
    
    // Mapea los archivos para guardarlos en formato binario
    const archivos = req.files.map(file => ({
      file: file.buffer,          // Datos binarios del archivo
      fileType: file.mimetype,    // Tipo MIME del archivo
      fileName: file.originalname // Nombre original del archivo
    }));
    const tpData = {
      //file: archivos,
      file: archivos.map(archivo => archivo.file),  // Lista de archivos en formato binario
      fileType: archivos.map(archivo => archivo.fileType), // Tipo de archivo (MIME)
      fileName: archivos.map(archivo => archivo.fileName), // Nombre de los archivos
      comentarioAlum,
      devolucionProf,
      calificacion: calificacion ? Number(calificacion) : null,
      tpId,
      alumnoId,
      grupoId
    };

    const response = await Calificacion.create(tpData);
    await Tp.findByIdAndUpdate(
      tpId, 
      { $push: { calificacion: response._id } },
      { new: true }
    );

    res.status(201).json(response);
  } catch (error) {
    console.log("Ocurrió un error al insertar un elemento en la tabla Calificación: ", error);
    res.status(422).json({ error: "Error" });
  }
};

// Obtener grupos de un trabajo practico por su ID
exports.getGruposByTpId = async (req, res) => {
  const tpId = req.params.tpId;

  try {
    // Busca al tp por su ID
    const trabajoPractico = await model.findById(tpId).populate('grupos');

    // Si se encontró al tp, obtén la lista de grupos
    const grupos = trabajoPractico.grupos;

    res.json({ grupos });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Error al obtener los grupos para un tp ${tpId}` });
  }
};

// ========================================
// ACTUALIZAR GRUPO DENTRO DE UN TRABAJO PRÁCTICO POR ID
// ========================================
exports.updateAlumnosEnGrupo = async (req, res) => {
  const tpId = req.params.tpId;
  const grupoId = req.params.grupoId;
  const { alumnos } = req.body;

  try {
    // Verificar si los IDs de los alumnos y del grupo están en el formato correcto
    if (!mongoose.Types.ObjectId.isValid(tpId) || !mongoose.Types.ObjectId.isValid(grupoId)) {
      return res.status(400).json({ mensaje: 'IDs inválidos' });
    }

    // Crear una lista de objetos ObjectId a partir de los IDs de alumnos
    const alumnosObjectId = alumnos.map(alumnoId => {
      if (!mongoose.Types.ObjectId.isValid(alumnoId)) {
        return res.status(400).json({ mensaje: 'ID de alumno inválido' });
      }
      return new mongoose.Types.ObjectId(alumnoId); // Usa new aquí para crear un nuevo objeto ObjectId
    });

    // Buscar y actualizar el grupo dentro del Trabajo Práctico
    const grupoActualizado = await Grupo.findByIdAndUpdate(
      grupoId,
      { $set: { alumnos: alumnosObjectId } }, // Asegúrate de que la propiedad que deseas actualizar sea 'alumnos'
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
exports.deleteTp = async (req, res) => {
  const tpId  = req.params.tpId;
  try {
    const deletedTp = await model.findByIdAndDelete(tpId);

    if (!deletedTp) {
      return res.status(404).json({ error: "Tp no encontrado" });
    }

    res.status(200).json({ message: "Tp eliminado exitosamente", deletedTp });
  } catch (error) {
    console.error('Error al eliminar el Tp:', error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener grupos de un trabajo práctico por su ID
exports.getGruposByTpId = async (req, res) => {
  const tpId = req.params.tpId;

  try {
    // Busca al tp por su ID y popula la lista de grupos con los datos completos de los alumnos
    const trabajoPractico = await model.findById(tpId).populate({
      path: 'grupos',
      populate: {
        path: 'alumnos',
        model: 'Alumno',
      },
    });

    if (!trabajoPractico) {
      return res.status(404).json({ error: `No se encontró el trabajo práctico con ID ${tpId}` });
    }

    // Si se encontró al tp, obtén la lista de grupos sino una lista vacia
    const grupos = trabajoPractico.grupos || [];

    res.json({ grupos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener los grupos para el trabajo práctico con ID ${tpId}` });
  }
};
exports.getTpId = async (req, res) => {
  const tpId = req.params.tpId;
  
  try {
    // Busca un TP por su ID
    const tp = await model.findOne({ _id: tpId });

    if (!tp) {
      return res.status(404).json({ error: "Tp no encontrado" });
    }

    res.json({ tp });
  } catch (error) {
    console.error("Error al buscar el TP:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
exports.updateTp = async (req, res) => {
  const { tpId } = req.params;
  const updatedData = req.body;
  console.log('Datos recibidos para la actualización:', updatedData);  // Verifica el contenido de los datos
 
  if (!mongoose.Types.ObjectId.isValid(tpId)) {
    return res.status(400).send('ID de trabajo práctico no válido');
  }

  try {
    const tp = await model.findByIdAndUpdate(tpId, 
      {
        $set: {
          nombre: updatedData.nombre,
          fechaInicio: updatedData.fechaInicio,
          fechaFin: updatedData.fechaFin,
          grupal: updatedData.grupal,
          grupos: updatedData.grupo, 
          consigna: updatedData.consigna,
          cuatrimestre: updatedData.cuatrimestre,
          estado: updatedData.estado,
        }
      }, { new: true });
    if (!tp) {
      return res.status(404).send('Trabajo práctico no encontrado');
    }
    res.status(200).json({ message: "Tp modificado exitosamente", tpId });
  } catch (error) {
    console.error('Error al actualizar el trabajo práctico:', error);
    res.status(500).send(`Error al actualizar el trabajo práctico: ${error.message}`);
  }
};
// Nueva función que contiene la lógica de actualización de los TPs sin req ni res
const actualizarEstados = async () => {
  const now = new Date().toISOString().slice(0, 10); // Solo la fecha actual en formato YYYY-MM-DD
  console.log("ahora:", now)
  // Obtener todos los trabajos prácticos
  const tps = await model.find();
  
  // Inicializar un array para guardar las promesas de actualización
  const updatePromises = [];

  tps.forEach(tp => {
    if (tp.estado === "Cerrado") {
      // Si el estado es "Cerrado", no se hace nada
      return;
    }
    
    const fechaInicio = tp.fechaInicio.toISOString().slice(0, 10); // Solo la fecha en formato YYYY-MM-DD
    const fechaFin = tp.fechaFin.toISOString().slice(0, 10); // Solo la fecha en formato YYYY-MM-DD
    console.log("fechaInicio:", fechaInicio)  
    console.log("fechaFin:", fechaFin)  

    if (fechaInicio === now && tp.estado === "Futuro") {
      // Cambiar el estado a "En marcha" si la fecha de inicio es hoy y el estado es "Futuro"
      updatePromises.push(model.findByIdAndUpdate(tp._id, { estado: 'En marcha' }));
    }

    if (fechaFin === now && tp.estado === "En marcha") {
      // Cambiar el estado a "En evaluación" si la fecha de fin es hoy y el estado es "En marcha"
      updatePromises.push(model.findByIdAndUpdate(tp._id, { estado: 'En evaluacion' }));
    }
  });

  // Esperar que todas las promesas de actualización se completen
  await Promise.all(updatePromises);
};

// Función para manejar la actualización desde el cron (sin req y res)
exports.updateEstadoTpsCron = async () => {
  try {
    await actualizarEstados();
    console.log("Estados de trabajos prácticos actualizados (desde cron).");
  } catch (error) {
    console.error('Error actualizando los estados desde el cron:', error);
  }
};

// Función para manejar la actualización desde un endpoint HTTP
exports.updateEstadoTps = async (req, res) => {
  try {
    await actualizarEstados();
    res.status(200).json({ message: "Estados de trabajos prácticos actualizados." });
  } catch (error) {
    console.error('Error actualizando los estados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
