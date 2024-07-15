const Calificacion = require("../models/calificacion");

exports.insertData = async (req, res) => {
  try {
    const { comentarioAlum, devolucionProf, calificacion, tpId, alumnoId, grupoId } = req.body;
    const archivos = req.files.map(file => file.filename);

    const calificacionData = {
      file: archivos,
      comentarioAlum,
      devolucionProf,
      calificacion: calificacion ? Number(calificacion) : null,
      tpId,
      alumnoId,
      grupoId
    };

    const response = await Calificacion.create(calificacionData);
    res.status(201).json(response);
  } catch (error) {
    console.log("Ocurrió un error al insertar un elemento en la tabla Calificación: ", error);
    res.status(422).json({ error: "Error" });
  }
};

exports.updateCalificacion = async (req, res) => {
  const { id } = req.params;
  const { devolucionProf, calificacion } = req.body;

  try {
    const calificacionActualizada = await Calificacion.findByIdAndUpdate(
      id,
      { devolucionProf, calificacion },
      { new: true }
    );

    if (!calificacionActualizada) {
      return res.status(404).json({ error: "Calificación no encontrada" });
    }

    res.json(calificacionActualizada);
  } catch (error) {
    console.error("Error al actualizar la calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.getComAlumnByCalifId = async (req, res) => {
  const { grupoId, tpId } = req.params;
  
  try {
    // Busca una Calificacion por su ID
    const calif = await Calificacion.findOne({grupoId, tpId});
    const coment = calif.comentarioAlum
    const idCalif = calif._id
    

    if (!coment) {
      return res.status(404).json({ error: "Calificacion no encontrada" });
    }

    res.json({ coment, idCalif });
  } catch (error) {
    console.error("Error al buscar la calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
exports.getComAlumnIndByCalifId = async (req, res) => {
  const { idEntregaAlumno, tpId } = req.params;
  
  try {
    // Busca una Calificacion por su ID
    const calificacion = await Calificacion.findOne({alumnoId:{$eq:idEntregaAlumno}, tpId:{$eq:tpId}});
    const comentario = calificacion
    

    if (!calificacion) {
      return res.status(404).json({ error: "Calificacion no encontrada" });
    }

    res.json({ comentario });
  } catch (error) {
    console.error("Error al buscar la calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};