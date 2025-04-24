// pour gérer  strcture les demandes d'adoption des animaux. Il contient des informations sur l'animal lui-même si adopté wle le 

const mongoose = require("mongoose");
//Outil pour connecté à la BD 
const schema = mongoose.Schema;
//importer le shema 
const adoptionSchema = new schema({
  status: String,
  adoptionDate: Date,
});

// Exemple d'adoption : adoption ses compsants: adoption w adoptionshema 
const Adoption = mongoose.model("Adoption", adoptionSchema);
module.exports = Adoption;
// export de modele 
