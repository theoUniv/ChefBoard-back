const Company = require('../models/Company');
const Review = require('../models/Review');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Review = require('../models/Review');
const Company = require('../models/Company');

exports.getCompanyDetails = async (req, res) => {
    const companyId = req.params.id;

    try {
        const company = await Company.findById(companyId)
            .populate('logo')
            .populate('presentation_picture');

        if (!company) {
            return res.status(404).json({ message: 'Entreprise non trouvée' });
        }

        const posts = await Post.find({ id_company: companyId }).populate('id_picture');
        const reviews = await Review.find({ id_company: companyId })
            .populate('id_user')
            .populate('answers');

        res.status(200).json({
            company,
            posts,
            reviews
        });
    } catch (err) {
        console.error("Erreur dans getCompanyDetails:", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

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
                        radiusInMeters / 6378137 // rayon terrestre en radians
                    ]
                }
            }
        })
            .populate('logo')
            .populate('presentation_picture');

        res.json(companies);
    } catch (err) {
        console.error('Erreur dans getCompaniesNearby:', err);
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

exports.getAllCompaniesWithoutEmail = async (req, res) => {
    try {
        const companies = await Company.find({}, { email: 0 }); 
        res.status(200).json(companies);
    } catch (err) {
        console.error('Erreur en récupérant les companies:', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};
