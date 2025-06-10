const express = require("express");
const router = express.Router();
const User = require("../models/User");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, genericController.createItem(User));
router.get("/", authMiddleware, genericController.getItems(User));
router.put("/:id", authMiddleware, genericController.updateItem(User));
router.delete("/:id", authMiddleware, genericController.deleteItem(User));

module.exports = router;
