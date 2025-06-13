const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
    id_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    state: Number,
    content: String,
    client_score: Number,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

ReviewSchema.post('save', async function () {
    const { updateCompanyScore } = require('../controllers/companyController');
    await updateCompanyScore(this.id_company);
});

ReviewSchema.post('remove', async function () {
    const { updateCompanyScore } = require('../controllers/companyController');
    await updateCompanyScore(this.id_company);
});

module.exports = mongoose.model('Review', ReviewSchema);
