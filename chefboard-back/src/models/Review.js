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

// Après ajout (save, create, etc.)
ReviewSchema.post('save', async function () {
    const { updateCompanyScore } = require('../controllers/companyController');
    await updateCompanyScore(this.id_company);
});

// Après suppression via doc.remove()
ReviewSchema.post('remove', async function () {
    const { updateCompanyScore } = require('../controllers/companyController');
    await updateCompanyScore(this.id_company);
});

// Après update via findOneAndUpdate
ReviewSchema.post('findOneAndUpdate', async function (doc) {
    if (doc) {
        const { updateCompanyScore } = require('../controllers/companyController');
        await updateCompanyScore(doc.id_company);
    }
});

// ✅ Après suppression via findOneAndDelete
ReviewSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        const { updateCompanyScore } = require('../controllers/companyController');
        await updateCompanyScore(doc.id_company);
    }
});

// ✅ Après suppression via findByIdAndDelete
ReviewSchema.post('findByIdAndDelete', async function (doc) {
    if (doc) {
        const { updateCompanyScore } = require('../controllers/companyController');
        await updateCompanyScore(doc.id_company);
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
