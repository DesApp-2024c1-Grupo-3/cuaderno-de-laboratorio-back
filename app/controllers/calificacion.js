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
exports.getCalificacionDetails = async (req, res) => {
  try {
    const  tpId = req.params.tpId;

    // Validar que tpId y grupoId estén presentes
    if (!tpId) {
      return res.status(400).send({
        message: "tpId y grupoId son requeridos.",
      });
    }

    // Buscar la calificación correspondiente
    const calificacion = await Calificacion.findById(tpId);

    if (!calificacion) {
      return res.status(404).send({
        message: "No se encontraron detalles de la calificación.",
      });
    }

    res.status(200).json(calificacion);
  } catch (error) {
    console.error('Error al obtener los detalles de la calificación:', error);
    res.status(500).send({
      message: "Error al obtener los detalles de la calificación.",
    });
  }
};

// Controlador para descargar archivos
exports.downloadFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename);

  fs.exists(filePath, (exists) => {
    if (exists) {
      res.download(filePath, filename, (err) => {
        if (err) {
          res.status(500).send({
            message: "No se pudo descargar el archivo. " + err,
          });
        }
      });
    } else {
      res.status(404).send({
        message: "Archivo no encontrado.",
      });
    }
  });
};