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

exports.getComAlumnByCalifId = async (req, res) => {
  const { grupoId, tpId } = req.params;
  
  try {
    // Busca una Calificacion por su ID
    const calif = await Calificacion.findOne({grupoId, tpId});
    const coment = calif.comentarioAlum
    

    if (!coment) {
      return res.status(404).json({ error: "Calificacion no encontrada" });
    }

    res.json({ coment });
  } catch (error) {
    console.error("Error al buscar la calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};