const mongoose = require('mongoose');

const Company = new mongoose.Schema({
    name: String,
    email: String
});

module.exports = mongoose.model('Company', Company);
