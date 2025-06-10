const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const genericController = require('../controllers/genericController');

router.post('/', genericController.createItem(Answer));
router.get('/', genericController.getItems(Answer));
router.put('/:id', genericController.updateItem(Answer));
router.delete('/:id', genericController.deleteItem(Answer));

module.exports = router;
