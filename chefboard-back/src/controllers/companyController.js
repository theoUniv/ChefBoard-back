const Company = require('../models/Company');

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
