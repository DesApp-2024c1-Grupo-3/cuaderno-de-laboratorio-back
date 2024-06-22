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
