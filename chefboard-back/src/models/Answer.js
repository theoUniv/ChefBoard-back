const mongoose = require('mongoose');

const Answer = new mongoose.Schema({
    id_review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    content: String
});

module.exports = mongoose.model('Answer', Answer);
