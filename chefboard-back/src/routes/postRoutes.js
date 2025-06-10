const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const genericController = require('../controllers/genericController');

router.post('/', genericController.createItem(Post));
router.get('/', genericController.getItems(Post));
router.put('/:id', genericController.updateItem(Post));
router.delete('/:id', genericController.deleteItem(Post));

module.exports = router;
