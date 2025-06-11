const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authmiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id_company:
 *           type: string
 *           format: ObjectId
 *           description: ID de la société liée
 *         content:
 *           type: string
 *           description: Contenu de la review
 *         algo_score:
 *           type: number
 *           description: Score algorithme
 *         client_score:
 *           type: number
 *           description: Score client
 */

/**
 * @swagger
 * /reviews/create:
 *   post:
 *     summary: Créer une nouvelle review
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review créée avec succès
 *       401:
 *         description: Non autorisé
 */
router.post("/create", authMiddleware, genericController.createItem(Review));

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Récupérer toutes les reviews
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: Liste des reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Non autorisé
 */
router.get("/", authMiddleware, genericController.getItems(Review));

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Modifier une review par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la review à modifier
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review modifiée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Review non trouvée
 */
router.put("/:id", authMiddleware, genericController.updateItem(Review));

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Supprimer une review par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la review à supprimer
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       204:
 *         description: Review supprimée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Review non trouvée
 */
router.delete("/:id", authMiddleware, genericController.deleteItem(Review));

module.exports = router;
