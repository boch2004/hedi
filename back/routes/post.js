const express = require("express");
const Post = require("../models/Post");
const postRouter = express.Router();

postRouter.post("/add", async (req, res) => {

  try {
    let newPost = new Post(req.body);
    let result = await newPost.save();
  
    res.send({ posts: result, msg: "Post is added" });
  } catch (error) {
    console.log(error);
  }
});


postRouter.get("/", async (req, res) => {
  try {
    let result = await Post.find();
    res.send({ posts: result, });
  } catch (error) {
    console.log(error);
  }
});


postRouter.get("/:id", async (req, res) => {
  try {
    let result = await Post.findById(req.params.id);
    res.send({ posts: result, msg: "One post" });
  } catch (error) {
    console.log(error);
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    let result = await Post.findByIdAndDelete(req.params.id);
    res.send({ msg: "Post is deleted" });
  } catch (error) {
    console.log(error);
  }
});


postRouter.put("/:id", async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.send({ msg: "Post is updated" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = postRouter;
