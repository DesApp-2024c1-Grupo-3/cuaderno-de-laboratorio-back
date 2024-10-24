const express = require("express");
const router = express.Router();
const controller = require("../controllers/alumno");

/**
 * @swagger
 * tags:
 *   name: Alumnos
 *   description: Operaciones relacionadas con alumnos.
 */

/**
 * @swagger
 * /alumnos:
 *   get:
 *     summary: Obtiene todos los alumnos
 *     tags: [Alumnos]
 *     responses:
 *       200:
 *         description: Lista de alumnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alumno'
 */
router.get('/alumnos', controller.getData);

/**
 * @swagger
 * /alumnosJson:
 *   get:
 *     summary: Obtiene todos los alumnos en formato JSON
 *     tags: [Alumnos]
 *     responses:
 *       200:
 *         description: Lista de alumnos en JSON
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alumno'
 */
router.get('/alumnosJson', controller.getDataJson);

/**
 * @swagger
 * /alumno/{alumnoId}:
 *   get:
 *     summary: Obtiene los cursos de un alumno por su ID
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: alumnoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del alumno
 *     responses:
 *       200:
 *         description: Lista de cursos del alumno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cursos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Alumno no encontrado
 */
router.get('/alumno/:alumnoId', controller.getCursosByAlumnoId);

/**
 * @swagger
 * /alumno/{alumnoId}/cursos:
 *   get:
 *     summary: Obtiene los cursos de un alumno con agregaciones adicionales
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: alumnoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del alumno
 *     responses:
 *       200:
 *         description: Lista de cursos del alumno con agregaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cursos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Curso'
 *                 agregados:
 *                   type: object
 *                   description: Agregaciones adicionales sobre los cursos
 *       404:
 *         description: Alumno no encontrado
 */
router.get('/alumno/:alumnoId/cursos', controller.getCursosByAlumnoIdWithAgreggate);

/**
 * @swagger
 * /alumnoSolo/{alumnoId}:
 *   get:
 *     summary: Obtiene un alumno por su ID
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: alumnoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del alumno
 *     responses:
 *       200:
 *         description: Datos del alumno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 apellido:
 *                   type: string
 *                 dni:
 *                   type: number
 *       404:
 *         description: Alumno no encontrado
 */
router.get('/alumnoSolo/:alumnoId', controller.getAlumnoById);

/**
 * @swagger
 * /alumno:
 *   post:
 *     summary: Inserta un nuevo alumno
 *     tags: [Alumnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alumno'
 *     responses:
 *       201:
 *         description: Alumno creado
 *       422:
 *         description: Error de validación
 */
router.post('/alumno', controller.insertData);

/**
 * @swagger
 * /alumno/{alumnoId}:
 *   post:
 *     summary: Añade un TP y curso a un alumno existente
 *     tags: [Alumnos]
 *     parameters:
 *       - in: path
 *         name: alumnoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del alumno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tpId:
 *                 type: string
 *               cursoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: TP y curso añadidos
 *       404:
 *         description: Alumno no encontrado
 */
router.post('/alumno/:alumnoId', controller.addTpAndCurso);

module.exports = router;