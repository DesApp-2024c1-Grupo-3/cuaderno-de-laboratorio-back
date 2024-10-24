const express = require('express');
const router = express.Router();
const controller = require("../controllers/trabajopractico");
const upload = require("../../config/multerConfig");

router.post('/tpNuevo/profesor/:profesorId/curso/:cursoId/', upload.array('file', 10), controller.insertDataBynari);

/**
 * @swagger
 * tags:
 *   name: Trabajos Prácticos
 *   description: Operaciones relacionadas con trabajos prácticos.
 */

/**
 * @swagger
 * /tps:
 *   get:
 *     summary: Obtiene todos los trabajos prácticos
 *     tags: [Trabajos Prácticos]
 *     responses:
 *       '200':
 *         description: Lista de trabajos prácticos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 arrayTps:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TrabajoPractico'
 */
router.get('/tps', controller.getData);

/**
 * @swagger
 * /tp:
 *   post:
 *     summary: Inserta un nuevo trabajo práctico
 *     tags: [Trabajos Prácticos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrabajoPractico'
 *     responses:
 *       '201':
 *         description: Trabajo práctico creado exitosamente
 *       '422':
 *         description: Error de validación
 */
router.post('/tp', controller.insertData);

/**
 * @swagger
 * /tp/{tpId}/grupos:
 *   get:
 *     summary: Obtiene los grupos de un trabajo práctico por su ID
 *     tags: [Trabajos Prácticos]
 *     parameters:
 *       - in: path
 *         name: tpId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del trabajo práctico
 *     responses:
 *       '200':
 *         description: Lista de grupos del trabajo práctico
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grupos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Grupo'
 *       '404':
 *         description: Trabajo práctico no encontrado
 */
router.get('/tp/:tpId/grupos', controller.getGruposByTpId);

/**
 * @swagger
 * /tp/{tpId}/grupos/{grupoId}:
 *   put:
 *     summary: Actualiza los alumnos en un grupo de un trabajo práctico
 *     tags: [Trabajos Prácticos]
 *     parameters:
 *       - in: path
 *         name: tpId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del trabajo práctico
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
 *     responses:
 *       '200':
 *         description: Lista de alumnos actualizada exitosamente
 *       '400':
 *         description: IDs inválidos
 *       '404':
 *         description: Grupo no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/tp/:tpId/grupos/:grupoId', controller.updateAlumnosEnGrupo);

/**
 * @swagger
 * /tp/{tpId}:
 *   delete:
 *     summary: Elimina un trabajo práctico por su ID
 *     tags: [Trabajos Prácticos]
 *     parameters:
 *       - in: path
 *         name: tpId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del trabajo práctico
 *     responses:
 *       '200':
 *         description: Trabajo práctico eliminado exitosamente
 *       '404':
 *         description: Trabajo práctico no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/tp/:tpId', controller.deleteTp);

/**
 * @swagger
 * /tps/{tpId}:
 *   get:
 *     summary: Obtiene un trabajo práctico por su ID
 *     tags: [Trabajos Prácticos]
 *     parameters:
 *       - in: path
 *         name: tpId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del trabajo práctico
 *     responses:
 *       '200':
 *         description: Trabajo práctico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tp:
 *                   $ref: '#/components/schemas/TrabajoPractico'
 *       '404':
 *         description: Trabajo práctico no encontrado
 */
router.get('/tps/:tpId', controller.getTpId);

/**
 * @swagger
 * /tp/{tpId}:
 *   put:
 *     summary: Actualiza un trabajo práctico por su ID
 *     tags: [Trabajos Prácticos]
 *     parameters:
 *       - in: path
 *         name: tpId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del trabajo práctico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrabajoPractico'
 *     responses:
 *       '200':
 *         description: Trabajo práctico actualizado exitosamente
 *       '400':
 *         description: ID inválido
 *       '404':
 *         description: Trabajo práctico no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/tp/:tpId', controller.updateTp);

module.exports = router;