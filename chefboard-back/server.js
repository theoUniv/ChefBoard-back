require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const postRoutes = require("./src/routes/postRoutes");
const answerRoutes = require("./src/routes/answerRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const pictureRoutes = require("./src/routes/pictureRoutes");
const authController = require("./src/controllers/authController");

const app = express();
app.use(express.json());
const setupSwagger = require('./swagger');


mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch((err) => console.error("❌ Erreur MongoDB :", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", authController.verifyToken, userRoutes);
app.use("/api/reviews", authController.verifyToken, reviewRoutes);
app.use("/api/posts", authController.verifyToken, postRoutes);
app.use("/api/answers", authController.verifyToken, answerRoutes);
app.use("/api/companies", authController.verifyToken, companyRoutes);
app.use("/api/pictures", authController.verifyToken, pictureRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur démarré sur http://0.0.0.0:${PORT}`);
});

