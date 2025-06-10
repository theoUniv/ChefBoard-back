const mongoose = require('mongoose');

const Review = new mongoose.Schema({
    id_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    content: String,
    algo_score: Number,
    client_score: Number
});

module.exports = mongoose.model('Review', Review);
