const express = require("express");
const router = express.Router();
const Picture = require("../models/Picture");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, genericController.createItem(Picture));
router.get("/", authMiddleware, genericController.getItems(Picture));
router.put("/:id", authMiddleware, genericController.updateItem(Picture));
router.delete("/:id", authMiddleware, genericController.deleteItem(Picture));

module.exports = router;
