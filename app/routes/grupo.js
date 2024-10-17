const express = require("express");
const router = express.Router();
const controller = require("../controllers/grupo");
/**
 * @swagger
 * tags:
 *   name: Grupos
 *   description: Operaciones relacionadas con grupos.
 */

/**
 * @swagger
 * /grupos:
 *   get:
 *     summary: Obtiene todos los grupos
 *     tags: [Grupos]
 *     responses:
 *       200:
 *         description: Lista de grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grupo'
 */
router.get('/grupos', controller.getData);

/**
 * @swagger
 * /grupo/{grupoId}:
 *   get:
 *     summary: Obtiene un grupo por su ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: grupoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del grupo
 *     responses:
 *       200:
 *         description: Datos del grupo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grupo'
 *       404:
 *         description: Grupo no encontrado
 */
router.get('/grupo/:grupoId', controller.getGrupoPorId);

/**
 * @swagger
 * /grupo:
 *   post:
 *     summary: Inserta un nuevo grupo
 *     tags: [Grupos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grupo'
 *     responses:
 *       201:
 *         description: Grupo creado
 *       422:
 *         description: Error de validación
 */
router.post('/grupo', controller.insertData);

/**
 * @swagger
 * /grupos/{grupoId}/alumnos:
 *   put:
 *     summary: Actualiza la lista de alumnos de un grupo por su ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: grupoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alumnos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: IDs de los alumnos
 *     responses:
 *       200:
 *         description: Lista de alumnos actualizada exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Grupo no encontrado
 */
router.put('/grupos/:grupoId/alumnos', controller.actualizarListaAlumnos);

/**
 * @swagger
 * /grupo/{grupoId}:
 *   put:
 *     summary: Actualiza un grupo por su ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: grupoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grupo'
 *     responses:
 *       200:
 *         description: Grupo actualizado exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Grupo no encontrado
 */
router.put('/grupo/:grupoId', controller.actualizarGrupo);

/**
 * @swagger
 * /grupo/{grupoId}:
 *   delete:
 *     summary: Elimina un grupo por su ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: grupoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del grupo
 *     responses:
 *       200:
 *         description: Grupo eliminado exitosamente
 *       404:
 *         description: Grupo no encontrado
 */
router.delete('/grupo/:grupoId', controller.deleteGrupo); 

module.exports = router;