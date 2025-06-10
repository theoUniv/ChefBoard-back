const express = require('express');
const router = express.Router();
const User = require('../models/User');
const genericController = require('../controllers/genericController');

router.post('/', genericController.createItem(User));
router.get('/', genericController.getItems(User));
router.put('/:id', genericController.updateItem(User));
router.delete('/:id', genericController.deleteItem(User));

module.exports = router;
