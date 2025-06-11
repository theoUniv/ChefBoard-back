const mongoose = require('mongoose');

const Company = new mongoose.Schema({
    name: String,
    email: String,
    adress: String,
    SIREN: String,
    schedules: String,
    category: { type: String, enum: ["burger", "sushi", "bistro", "brasserie"], default: "brasserie" },  
    
});

module.exports = mongoose.model('Company', Company);
