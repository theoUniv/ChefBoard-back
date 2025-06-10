const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const genericController = require('../controllers/genericController');

router.post('/', genericController.createItem(Review));
router.get('/', genericController.getItems(Review));
router.put('/:id', genericController.updateItem(Review));
router.delete('/:id', genericController.deleteItem(Review));

module.exports = router;
