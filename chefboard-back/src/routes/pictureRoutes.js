const express = require('express');
const router = express.Router();
const Picture = require('../models/Picture');
const genericController = require('../controllers/genericController');

router.post('/', genericController.createItem(Picture));
router.get('/', genericController.getItems(Picture));
router.put('/:id', genericController.updateItem(Picture));
router.delete('/:id', genericController.deleteItem(Picture));

module.exports = router;
