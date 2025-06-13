const Review = require('../models/Review');

exports.getReviewsByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const reviews = await Review.find({ id_user: userId })
            .populate({
                path: 'answers',
                populate: { path: 'id_user' }
            })
            .sort({ created_at: -1 });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "Aucune review trouvée pour cet utilisateur." });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error("Erreur getReviewsByUser:", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};
