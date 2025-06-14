const Answer = require('../models/Answer');
const Review = require('../models/Review');

exports.createAnswer = async (req, res) => {
    try {
        const answerData = {
            ...req.body,
            id_user: req.user.id 
        };

        const answer = new Answer(answerData);
        await answer.save();

        await Review.findByIdAndUpdate(answer.id_review, {
            $push: { answers: answer._id }
        });

        res.status(201).json(answer);
    } catch (error) {
        console.error('Erreur création réponse:', error);
        res.status(500).json({ message: "Erreur lors de la création de la réponse", error: error.message });
    }
};
