const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - first_name
 *         - last_name
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, chef]
 *           default: user
 *         birthdate:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Erreur de validation
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie avec token
 *       401:
 *         description: Email ou mot de passe invalide
 */
router.post('/login', authController.login);

module.exports = router;
