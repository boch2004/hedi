// post.js pour ajouter des histoires 

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  title: String,
  content: String,
  Crea: Date,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
