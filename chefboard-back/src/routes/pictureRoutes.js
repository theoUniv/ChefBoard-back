const express = require("express");
const router = express.Router();
const Picture = require("../models/Picture");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authmiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Picture:
 *       type: object
 *       properties:
 *         path:
 *           type: string
 *           description: Chemin de l'image
 *         description:
 *           type: string
 *           description: Description de l'image
 */

/**
 * @swagger
 * /pictures/create:
 *   post:
 *     summary: Créer une image
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Pictures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Picture'
 *     responses:
 *       201:
 *         description: Image créée
 *       401:
 *         description: Non autorisé
 */
router.post("/create", authMiddleware, genericController.createItem(Picture));

/**
 * @swagger
 * /pictures:
 *   get:
 *     summary: Récupérer toutes les images
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Pictures
 *     responses:
 *       200:
 *         description: Liste des images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Picture'
 *       401:
 *         description: Non autorisé
 */
router.get("/", authMiddleware, genericController.getItems(Picture));

/**
 * @swagger
 * /pictures/{id}:
 *   put:
 *     summary: Modifier une image par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Pictures
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'image à modifier
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Picture'
 *     responses:
 *       200:
 *         description: Image modifiée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Image non trouvée
 */
router.put("/:id", authMiddleware, genericController.updateItem(Picture));

/**
 * @swagger
 * /pictures/{id}:
 *   delete:
 *     summary: Supprimer une image par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Pictures
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'image à supprimer
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       204:
 *         description: Image supprimée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Image non trouvée
 */
router.delete("/:id", authMiddleware, genericController.deleteItem(Picture));

module.exports = router;
