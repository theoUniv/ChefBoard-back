const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

// Règles de permissions :
// - admin -> toutes les actions
// - chef -> créer et voir
// - user -> voir seulement

// routes/companies.js
router.post("/create", authMiddleware, roleMiddleware(["admin", "chef"]), genericController.createItem(Company));
router.get("/", authMiddleware, roleMiddleware(["admin", "chef", "user"]), genericController.getItems(Company));
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), genericController.updateItem(Company));
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), genericController.deleteItem(Company));

module.exports = router;
