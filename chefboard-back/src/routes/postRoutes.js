const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authmiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id_company:
 *           type: string
 *           format: ObjectId
 *           description: ID de la société
 *         id_picture:
 *           type: string
 *           format: ObjectId
 *           description: ID de l'image associée
 *         title:
 *           type: string
 *         content:
 *           type: string
 */

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Créer un post
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post créé
 *       401:
 *         description: Non autorisé
 */
router.post("/create", authMiddleware, genericController.createItem(Post));

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupérer tous les posts
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Liste des posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         description: Non autorisé
 */
router.get("/", authMiddleware, genericController.getItems(Post));

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Modifier un post par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post à modifier
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post modifié
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Post non trouvé
 */
router.put("/:id", authMiddleware, genericController.updateItem(Post));

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Supprimer un post par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du post à supprimer
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       204:
 *         description: Post supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Post non trouvé
 */
router.delete("/:id", authMiddleware, genericController.deleteItem(Post));

module.exports = router;
