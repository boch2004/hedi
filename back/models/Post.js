

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  title: String,
  content: String,
  userid:String,
  Crea:{
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
