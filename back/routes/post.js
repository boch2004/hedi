const express = require("express");
const Post = require("../models/Post");
const postRouter = express.Router();
// Router specifique pour le post qui un modele composée par le titre , contenu ...

// Route POST / add pour ajouter un post 
postRouter.post("/add", async (req, res) => {
  //Pour ajouter un post
  try {
    let newPost = new Post(req.body);
    let result = await newPost.save();
  
    res.send({ posts: result, msg: "Post is added" });
  } catch (error) {
    console.log(error);
  }
});

// Route Get  pour faire un appel à un post qui au BD
postRouter.get("/", async (req, res) => {
  try {
    let result = await Post.find();
    res.send({ posts: result, });
  } catch (error) {
    console.log(error);
  }
});

//Get/: id > Get d'une post ( une seule poste)
postRouter.get("/:id", async (req, res) => {
  try {
    let result = await Post.findById(req.params.id);
    res.send({ posts: result, msg: "One post" });
  } catch (error) {
    console.log(error);
  }
});

//Delete /: id > Route pour supprimer une poste ( ppst + ID vont etre supprimer )
postRouter.delete("/:id", async (req, res) => {
  try {
    let result = await Post.findByIdAndDelete(req.params.id);
    res.send({ msg: "Post is deleted" });
  } catch (error) {
    console.log(error);
  }
});

//Put /: id > Pour modifier le post 
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
