const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    id_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    id_picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture' },
    title: String,
    content: String
});

module.exports = mongoose.model('Post', Post);
