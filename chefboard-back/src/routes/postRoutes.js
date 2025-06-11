const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, genericController.createItem(Post));
router.get("/", authMiddleware, genericController.getItems(Post));
router.put("/:id", authMiddleware, genericController.updateItem(Post));
router.delete("/:id", authMiddleware, genericController.deleteItem(Post));

module.exports = router;
