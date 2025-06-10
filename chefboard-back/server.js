require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const postRoutes = require('./routes/postRoutes');
const answerRoutes = require('./routes/answerRoutes');
const companyRoutes = require('./routes/companyRoutes');
const pictureRoutes = require('./routes/pictureRoutes');
const authController = require('./controllers/authController');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.error("Erreur MongoDB :", err));

app.use('/api/auth', authRoutes);
app.use('/api/users', authController.verifyToken, userRoutes);
app.use('/api/reviews', authController.verifyToken, reviewRoutes);
app.use('/api/posts', authController.verifyToken, postRoutes);
app.use('/api/answers', authController.verifyToken, answerRoutes);
app.use('/api/companies', authController.verifyToken, companyRoutes);
app.use('/api/pictures', authController.verifyToken, pictureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
