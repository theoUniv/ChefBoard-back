const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// # Générer un token JWT #
exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role, first_name: user.first_name, last_name: user.last_name, favorite_categories: user.favorite_categories, created_at: user.created_at }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};

// # Inscription #
exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "Utilisateur créé", token: generateToken(user) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// # Connexion #
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }
        res.status(200).json({ message: "Connexion réussie", token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// # Vérification du token #
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: "Accès refusé" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token invalide" });
        req.user = decoded;
        next();
    });
};
