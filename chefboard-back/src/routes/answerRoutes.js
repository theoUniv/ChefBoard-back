const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const genericController = require("../controllers/genericController");
const answerController = require("../controllers/answerController");
const authMiddleware = require("../middleware/authmiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         id_review:
 *           type: string
 *           format: ObjectId
 *           description: ID de la review liée
 *         content:
 *           type: string
 *           description: Contenu de la réponse
 */

/**
 * @swagger
 * /answers/create:
 *   post:
 *     summary: Créer une réponse
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Answers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       201:
 *         description: Réponse créée
 *       401:
 *         description: Non autorisé
 */
router.post("/create", authMiddleware, answerController.createAnswer);

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Récupérer toutes les réponses
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Answers
 *     responses:
 *       200:
 *         description: Liste des réponses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 *       401:
 *         description: Non autorisé
 */
router.get("/", authMiddleware, genericController.getItems(Answer));

/**
 * @swagger
 * /answers/{id}:
 *   put:
 *     summary: Modifier une réponse par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Answers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réponse à modifier
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       200:
 *         description: Réponse modifiée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Réponse non trouvée
 */
router.put("/:id", authMiddleware, genericController.updateItem(Answer));

/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     summary: Supprimer une réponse par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Answers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réponse à supprimer
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       204:
 *         description: Réponse supprimée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Réponse non trouvée
 */
router.delete("/:id", authMiddleware, genericController.deleteItem(Answer));

module.exports = router;
