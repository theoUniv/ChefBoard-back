const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Accès interdit : token requis" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), "votre_secret");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;
