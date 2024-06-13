const Calificacion = require("../models/calificacion");

exports.createCalificacion = async (req, res) => {
  const { archivosSubidos, comentarioAlumno, devolucionProf, calificacion, tpId, alumnoId, grupoId } = req.body;

  try {
    const nuevaCalificacion = new Calificacion({
      archivosSubidos,
      comentarioAlumno,
      devolucionProf,
      calificacion,
      tpId,
      alumnoId,
      grupoId
    });

    await nuevaCalificacion.save();
    res.status(201).json(nuevaCalificacion);
  } catch (error) {
    console.error("Error al crear la calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
