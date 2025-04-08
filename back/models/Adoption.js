// pour gérer les demandes d'adoption des animaux. Il contient des informations sur l'utilisateur qui souhaite adopter un animal et sur l'animal lui-même

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adoptionSchema = new schema({
  status: String,
  adoptionDate: Date,
});

// Exemple d'adoption
const Adoption = mongoose.model("Adoption", adoptionSchema);
module.exports = Adoption;
