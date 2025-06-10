const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const genericController = require('../controllers/genericController');

router.post('/', genericController.createItem(Company));
router.get('/', genericController.getItems(Company));
router.put('/:id', genericController.updateItem(Company));
router.delete('/:id', genericController.deleteItem(Company));

module.exports = router;
