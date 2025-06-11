const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const genericController = require("../controllers/genericController");
const authMiddleware = require("../middleware/authmiddleware"); 

router.post("/create", authMiddleware, genericController.createItem(Review));
router.get("/", authMiddleware, genericController.getItems(Review));
router.put("/:id", authMiddleware, genericController.updateItem(Review));
router.delete("/:id", authMiddleware, genericController.deleteItem(Review));

module.exports = router;
