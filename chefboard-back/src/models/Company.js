const mongoose = require('mongoose');

function normalizeCategory(value) {
    if (!value) return value;
    const normalized = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

const companySchema = new mongoose.Schema({
    name: String,
    email: String,
    adress: String,
    SIREN: String,
    schedules: String,
    score: {
        type: Number,
        default: null,
    },
    logo: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture' },
    presentation_picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture' },
    id_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categories: {
        type: String,
        set: normalizeCategory
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        }
    }
});

companySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Company', companySchema);
