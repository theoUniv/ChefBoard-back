const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

function normalizeCategory(value) {
    if (!value) return value;
    const normalized = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

const User = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["user", "admin", "chef"], default: "user" },  
    birthdate: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    favorite_categories: {
        type: [String],
        set: function (values) {
            if (!Array.isArray(values)) return [];
            return values.map(normalizeCategory);
        },
        default: []
    }
});

User.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', User);
