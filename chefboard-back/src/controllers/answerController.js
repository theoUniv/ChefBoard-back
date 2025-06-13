const Answer = require('../models/Answer');
const Review = require('../models/Review');

exports.createAnswer = async (req, res) => {
    try {
        const { id_review, id_user, content } = req.body;

        const answer = new Answer({ id_review, id_user, content });
        await answer.save();

        await Review.findByIdAndUpdate(id_review, {
            $push: { answers: answer._id }
        });

        res.status(201).json(answer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
