const mongoose = require('mongoose');

const Answer = new mongoose.Schema({
    id_review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    content: String
});

module.exports = mongoose.model('Answer', Answer);
