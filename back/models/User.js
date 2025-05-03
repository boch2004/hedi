const { default: _default } = require("concurrently");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "user",
  },
  phone: {
    type: String, 
  },
  location: {
    type: String, 
  },
  postalCode: {
    type: String, 
  },
  img: {
    type: String,
    default: ''
  }
  });

module.exports = mongoose.model("user", UserSchema);
