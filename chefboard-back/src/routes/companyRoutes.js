const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const genericController = require("../controllers/genericController");
const companyController = require('../controllers/companyController');
const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         adress:
 *           type: string
 *         SIREN:
 *           type: string
 *         schedules:
 *           type: string
 *         category:
 *           type: string
 *           enum: [burger, sushi, bistro, brasserie]
 *           default: brasserie
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: [longitude, latitude]
 */

/**
 * @swagger
 * /companies/nearby:
 *   get:
 *     summary: Récupérer les entreprises dans un rayon donné autour d'une position
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude du point central
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude du point central
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         required: true
 *         description: Rayon en kilomètres
 *     responses:
 *       200:
 *         description: Liste des entreprises dans le rayon spécifié
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: Paramètres invalides ou manquants
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get('/nearby', companyController.getCompaniesNearby);

/**
 * @swagger
 * /companies/create:
 *   post:
 *     summary: Créer une entreprise
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Companies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Entreprise créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.post("/create", authMiddleware, companyController.createCompany);

/**
 * @swagger
 * /companies/with-picture:
 *   get:
 *     summary: Récupérer toutes les entreprises avec leur logo peuplé (sans email)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Companies
 *     responses:
 *       200:
 *         description: Liste des entreprises avec logo (sans email)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get("/", async (req, res) => {
    try {
        // Récupérer toutes les entreprises et peupler l'objet logo, sans l'email
        const companies = await Company.find().select("-email").populate("logo").populate("presentation_picture");
        res.json(companies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

/**
 * @swagger
 * /companies/{id}/details:
 *   get:
 *     summary: Récupérer les détails complets d'une entreprise
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'entreprise
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       200:
 *         description: Détails de l'entreprise récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Entreprise non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/details', companyController.getCompanyDetails);


/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Modifier une entreprise par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'entreprise à modifier
 *         schema:
 *           type: string
 *           format: ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Entreprise modifiée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Entreprise non trouvée
 */
router.put("/:id", authMiddleware, roleMiddleware(["admin", "chef"]), genericController.updateItem(Company));

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Supprimer une entreprise par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'entreprise à supprimer
 *         schema:
 *           type: string
 *           format: ObjectId
 *     responses:
 *       204:
 *         description: Entreprise supprimée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Entreprise non trouvée
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin", "chef"]), genericController.deleteItem(Company));

/**
 * @swagger
 * /companies/{id}/with-picture:
 *   get:
 *     summary: Récupérer une entreprise avec l'objet Picture (logo) peuplé
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'entreprise
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entreprise avec logo peuplé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Entreprise non trouvée
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id/with-picture", authMiddleware, async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate("logo").populate("presentation_picture");
        if (!company) {
            return res.status(404).json({ error: "Entreprise non trouvée" });
        }
        res.json(company);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

/**
 * @swagger
 * /companies/mine:
 *   get:
 *     summary: Récupérer les entreprises de l'utilisateur connecté (ou toutes si admin)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Companies
 *     responses:
 *       200:
 *         description: Liste des entreprises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get("/mine", authMiddleware, async (req, res) => {
    try {
        const user = req.user;

        let companies;
        if (user.role === "admin") {
            // Admin = récupère toutes les entreprises
            companies = await Company.find()
                .populate("logo")
                .populate("presentation_picture");
        } else {
            // Sinon, récupère uniquement celles dont il est le owner
            companies = await Company.find({ id_owner: user.id })
                .populate("logo")
                .populate("presentation_picture");
        }

        res.status(200).json(companies);
    } catch (err) {
        console.error("Erreur récupération des companies:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


module.exports = router;