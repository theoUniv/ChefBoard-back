const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: String,
    email: String,
    adress: String,
    SIREN: String,
    schedules: String,
    id_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, enum: ["burger", "sushi", "bistro", "brasserie"], default: "brasserie" },
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
