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


exports.createReview = async (req, res) => {
    try {
        const reviewData = { ...req.body, id_user: req.user.id }; // injecte l'id du user depuis le token
        const review = new Review(reviewData);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  };