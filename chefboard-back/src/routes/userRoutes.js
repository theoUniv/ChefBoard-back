const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authmiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           description: ID unique MongoDB
 *         first_name:
 *           type: string
 *           example: Jean
 *         last_name:
 *           type: string
 *           example: Dupont
 *         email:
 *           type: string
 *           format: email
 *           example: jean.dupont@example.com
 *         password:
 *           type: string
 *           description: Mot de passe hashé (jamais exposé dans la vraie vie)
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *             - chef
 *           example: user
 *         birthdate:
 *           type: string
 *           format: date
 *           example: 1980-01-01
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2023-06-01T12:00:00Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: 2023-06-01T12:00:00Z
 */

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       401:
 *         description: Non autorisé
 */
router.post("/create", authMiddleware, genericController.createItem(User));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé
 */
router.get("/", authMiddleware, genericController.getItems(User));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à modifier
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put("/:id", authMiddleware, genericController.updateItem(User));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete("/:id", authMiddleware, genericController.deleteItem(User));

module.exports = router;
