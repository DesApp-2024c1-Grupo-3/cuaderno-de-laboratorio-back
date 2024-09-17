const express = require("express");
const router = express.Router();
const controller = require("../controllers/profesor");

/**
 * @swagger
 * tags:
 *   name: Profesores
 *   description: Operaciones relacionadas con profesores.
*/
/**
 * @swagger
 * /profesores:
 *   get:
 *     summary: Obtiene todos los profesores
 *     tags: [Profesores]
 *     responses:
 *       200:
 *         description: Lista de profesores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profesor'
 */
router.get('/profesores', controller.getData);

/**
 * @swagger
 * /profesoresJson:
 *   get:
 *     summary: Obtiene todos los profesores en formato JSON
 *     tags: [Profesores]
 *     responses:
 *       200:
 *         description: Lista de profesores en JSON
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profesor'
 */
router.get('/profesoresJson', controller.getDataJson);

/**
 * @swagger
 * /profesor:
 *   post:
 *     summary: Inserta un nuevo profesor
 *     tags: [Profesores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profesor'
 *     responses:
 *       201:
 *         description: Profesor creado
 *       422:
 *         description: Error de validación
 */
router.post('/profesor', controller.insertData);

/**
 * @swagger
 * /profesor/{profesorId}/cursos:
 *   get:
 *     summary: Obtiene los cursos de un profesor por su ID
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: profesorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Lista de cursos del profesor
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
 *         description: Profesor no encontrado
 */
router.get('/profesor/:profesorId/cursos', controller.getCursosByProfesorId);

/**
 * @swagger
 * /profesor/{profesorId}:
 *   get:
 *     summary: Obtiene un profesor por su ID
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: profesorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Datos del profesor
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
 *                 email:
 *                   type: string
 *       404:
 *         description: Profesor no encontrado
 */
router.get('/profesor/:profesorId', controller.getProfesorPorId);

/**
 * @swagger
 * /profesor/{profesorId}/curso/{cursoId}/tp:
 *   post:
 *     summary: Añade un Trabajo Práctico a un curso de un profesor existente
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: profesorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del profesor
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
 *               tpId:
 *                 type: string
 *               grupos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Trabajo Práctico añadido
 *       403:
 *         description: El profesor no tiene acceso al curso
 *       404:
 *         description: Profesor no encontrado
 */
router.post('/profesor/:profesorId/curso/:cursoId/tp', controller.addTpToCursoByProfesorId);

module.exports = router;