const mongoose = require("mongoose");
const schema = mongoose.Schema;

const animalsSchema = new schema({
  name: String,
  img: String,
  description: String,
  race: String,
  Type:String,
  gender: String,
  location: String,
  category: { type: String, default: "all" },
  user: String,
  adoption: Boolean,
  inventoryStatus:String,
  idanimal:String,
  age: String,
  remarque: String,
  Couleur: String,
  Activite:String,
  proprietaire:String,
});

const Animals = mongoose.model("Animals", animalsSchema);
module.exports = Animals;
