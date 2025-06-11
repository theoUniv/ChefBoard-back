const mongoose = require('mongoose');

const Picture = new mongoose.Schema({
    path: String,
    description: String
});

module.exports = mongoose.model('Picture', Picture);
