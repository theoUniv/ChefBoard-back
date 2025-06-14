const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authmiddleware");
const reviewController = require("../controllers/reviewController");

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
router.post("/create", authMiddleware, reviewController.createReview);

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

/**
 * @swagger
 * /reviews/user/{userId}:
 *   get:
 *     summary: Récupérer toutes les reviews d’un utilisateur donné
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l’utilisateur dont on veut récupérer les reviews
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       200:
 *         description: Liste des reviews de l’utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Aucune review trouvée pour cet utilisateur
 *       500:
 *         description: Erreur serveur
 */
router.get("/user/:userId", authMiddleware, reviewController.getReviewsByUser);


/**
 * @swagger
 * /reviews/mine:
 *   get:
 *     summary: Récupérer les avis de l'utilisateur connecté (ou tous si admin)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: Liste des reviews
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get("/mine", authMiddleware, async (req, res) => {
    try {
        const user = req.user;

        const reviews = user.role === "admin"
            ? await Review.find()
            : await Review.find({ id_user: user.id });

        res.status(200).json(reviews);
    } catch (err) {
        console.error("Erreur récupération des reviews:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

/**
 * @swagger
 * /reviews/my-restaurants:
 *   get:
 *     summary: Récupérer les reviews des restaurants que je possède
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: Reviews récupérées avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Aucune entreprise trouvée
 *       500:
 *         description: Erreur serveur
 */

router.get("/my-restaurants", authMiddleware, reviewController.getReviewsForMyRestaurants);



module.exports = router;
