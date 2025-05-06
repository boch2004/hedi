const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  reason: String,
  telephone: String,
  idanimal:String,
  proprietaire:String,
  iduser:String,
  myid:String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);