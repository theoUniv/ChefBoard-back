const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/create", authMiddleware, genericController.createItem(Answer));
router.get("/", authMiddleware, genericController.getItems(Answer));
router.put("/:id", authMiddleware, genericController.updateItem(Answer));
router.delete("/:id", authMiddleware, genericController.deleteItem(Answer));

module.exports = router;
