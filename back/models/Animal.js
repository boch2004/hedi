const mongoose = require("mongoose");
// Linge eli fetet heya bch nejibo nahna bibliothéque Mongoss
const schema = mongoose.Schema;
// Création d'un raccourci pour mongoose.Schema

const animalsSchema = new schema({
  titel: String,
  name: String,
  img: String,
  description: String,
  race: String,
  age: Number,
  gender: String,
  location: String,
  directions: Array,
  category: { type: String, default: "all" },
  user: String,
  Adoption: Boolean,
  inventoryStatus:String,
  idanimal:String,
  age : Number,
  remarque: String,
});

const Animals = mongoose.model("Animals", animalsSchema);
module.exports = Animals;
