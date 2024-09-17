const express = require("express");
const router = express.Router();
const calificacionController = require("../controllers/calificacion");
const multer = require('multer');
const path = require('path');

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  }
});

const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Calificaciones
 *   description: Operaciones relacionadas con calificaciones.
*/

/**
 * @swagger
 * /calificacion:
 *   post:
 *     summary: Inserta una nueva calificación
 *     tags: [Calificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Calificacion'
 *     responses:
 *       201:
 *         description: Calificación creada
 *       422:
 *         description: Error de validación
 */
router.post('/calificacion', upload.array('file'), calificacionController.insertData);

/**
 * @swagger
 * /calificacion/{grupoId}/{tpId}:
 *   get:
 *     summary: Obtiene el comentario de un alumno por ID de grupo y ID de TP
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: grupoId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: tpId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario de la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comentario:
 *                   type: string
 *       404:
 *         description: Calificación no encontrada
 */
router.get('/calificacion/:grupoId/:tpId', calificacionController.getComAlumnByCalifId);

/**
 * @swagger
 * /calificacionIndivdual/{idEntregaAlumno}/{tpId}:
 *   get:
 *     summary: Obtiene el comentario individual de un alumno por ID de alumno y ID de TP
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: idEntregaAlumno
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: tpId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario de la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comentario:
 *                   type: string
 *       404:
 *         description: Calificación no encontrada
 */
router.get('/calificacionIndivdual/:idEntregaAlumno/:tpId', calificacionController.getComAlumnIndByCalifId);

/**
 * @swagger
 * /calificacionesTp/{tpId}:
 *   get:
 *     summary: Obtiene las calificaciones de un trabajo práctico por su ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: tpId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de calificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   calificacion:
 *                     type: number
 *                   alumnoId:
 *                     type: string
 *                   grupoId:
 *                     type: string
 *       404:
 *         description: Calificaciones no encontradas
 */
router.get('/calificacionesTp/:tpId', calificacionController.getCalificacionesByTpId);

/**
 * @swagger
 * /calificaciones/{alumnoId}:
 *   get:
 *     summary: Obtiene todas las calificaciones de un alumno por su ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: alumnoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de calificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   calificacion:
 *                     type: number
 *                   tpId:
 *                     type: string
 *                   grupoId:
 *                     type: string
 *       404:
 *         description: Calificaciones no encontradas
 */
router.get('/calificaciones/:alumnoId', calificacionController.getCalificaciones);

/**
 * @swagger
 * /calificacion/{id}:
 *   put:
 *     summary: Actualiza una calificación por su ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               devolucionProf:
 *                 type: string
 *               calificacion:
 *                 type: number
 *     responses:
 *       200:
 *         description: Calificación actualizada
 *       404:
 *         description: Calificación no encontrada
 */
router.put('/calificacion/:id', calificacionController.updateCalificacion);

/**
 * @swagger
 * /calificacion/{calificacionId}:
 *   delete:
 *     summary: Elimina una calificación por su ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: calificacionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Calificación eliminada
 *       404:
 *         description: Calificación no encontrada
 */
router.delete('/calificacion/:calificacionId', calificacionController.deleteCalificacion);

module.exports = router;