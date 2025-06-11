const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    id_company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    content: String,
    algo_score: Number,
    client_score: Number
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
