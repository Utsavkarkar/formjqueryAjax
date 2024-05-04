const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    coNumber: Number,
    userId: String
}); 

module.exports = mongoose.model('Contact', contactSchema);