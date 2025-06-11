const Company = require('../models/Company');
const Review = require('../models/Review');
const mongoose = require('mongoose');

exports.getCompaniesNearby = async (req, res) => {
    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ message: 'latitude, longitude et radius sont requis' });
    }

    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);
    const radiusInMeters = parseFloat(radius) * 1000;

    if (isNaN(latNum) || isNaN(lonNum) || isNaN(radiusInMeters)) {
        return res.status(400).json({ message: 'latitude, longitude et radius doivent être des nombres valides' });
    }

    try {
        const companies = await Company.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [lonNum, latNum],
                        radiusInMeters / 6378137 // rayon en radians (6378137 = rayon terre en m)
                    ]
                }
            }
        });

        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

exports.updateCompanyScore = async function (companyId) {
    if (!companyId) return;
    console.log(typeof Review.aggregate); // Ça doit afficher "function"

    const result = await Review.aggregate([
        { $match: { id_company: new mongoose.Types.ObjectId(companyId) } },
        {
            $group: {
                _id: '$id_company',
                averageScore: { $avg: '$client_score' }
            }
        }
    ]);

    const average = result[0]?.averageScore || 0;

    await Company.findByIdAndUpdate(companyId, { score: average });
};
