const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  reason: String,
  télephone: String,
  idanimal:String,
  iduser:String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);