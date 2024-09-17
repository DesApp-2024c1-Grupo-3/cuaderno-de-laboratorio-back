const express = require("express");
const router = express.Router();
const controller = require("../controllers/materia");
/**
 * @swagger
 * tags:
 *   name: Materias
 *   description: Operaciones relacionadas con materias.
*/

/**
 * @swagger
 * /materias:
 *   get:
 *     summary: Obtiene todas las materias con información de cursos
 *     tags: [Materias]
 *     responses:
 *       200:
 *         description: Lista de materias con cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Materia'
 */
router.get('/materias', controller.getMaterias);

/**
 * @swagger
 * /materia:
 *   post:
 *     summary: Crea una nueva materia
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Materia'
 *     responses:
 *       201:
 *         description: Materia creada
 *       422:
 *         description: Error de validación
 */
router.post('/materia', controller.createMateria);

/**
 * @swagger
 * /materia/{materiaId}/cursos:
 *   get:
 *     summary: Obtiene los cursos asociados a una materia por su ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: materiaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la materia
 *     responses:
 *       200:
 *         description: Lista de cursos asociados a la materia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Materia no encontrada
 */
router.get('/materia/:materiaId/cursos', controller.getCursosByMateriaId);

module.exports = router;