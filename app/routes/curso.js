const express = require("express");
const router = express.Router();
const controller = require("../controllers/curso");
/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Operaciones relacionadas con cursos.
 */

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Obtiene todos los cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 */
router.get('/cursos', controller.getData);

/**
 * @swagger
 * /curso:
 *   post:
 *     summary: Inserta un nuevo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso creado
 *       422:
 *         description: Error de validación
 */
router.post('/curso', controller.insertData);

/**
 * @swagger
 * /curso/{id}:
 *   get:
 *     summary: Obtiene la información de un curso por su ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Información del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 materia:
 *                   type: string
 *                 comision:
 *                   type: string
 *       404:
 *         description: Curso no encontrado
 */
router.get('/curso/:id', controller.getCursoById);

/**
 * @swagger
 * /curso/{cursoId}/alumnos:
 *   get:
 *     summary: Obtiene los alumnos de un curso por su ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de alumnos del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alumno'
 *       404:
 *         description: Curso no encontrado
 */
router.get('/curso/:cursoId/alumnos', controller.getAlumnosByCursoId);

/**
 * @swagger
 * /curso/{cursoId}/tps:
 *   get:
 *     summary: Obtiene los trabajos prácticos de un curso por su ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de trabajos prácticos del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrabajoPractico'
 *       404:
 *         description: Curso no encontrado
 */
router.get("/curso/:cursoId/tps", controller.getTpsByCursoId);

/**
 * @swagger
 * /curso/{cursoId}/grupos:
 *   get:
 *     summary: Obtiene los grupos de un curso por su ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de grupos del curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grupo'
 *       404:
 *         description: Curso no encontrado
 */
router.get("/curso/:cursoId/grupos", controller.getGruposByCursoId);

/**
 * @swagger
 * /grupos/{cursoId}:
 *   post:
 *     summary: Crea un nuevo grupo asociado a un curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               alumnos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Grupo creado exitosamente
 *       500:
 *         description: Error al crear el grupo
 */
router.post('/grupos/:cursoId', controller.createGrupoForCurso);

module.exports = router;