const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "Inconnu";


const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Accès interdit : token requis" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;
