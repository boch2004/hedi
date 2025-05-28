const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  reason: String,
  telephone: String,
  idanimal: String,
  proprietaire: String,
  iduser: String,
  myid: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "refused"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);
