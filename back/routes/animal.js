const express = require("express");
const Animal = require("../models/Animal");
const animalRouter = express.Router();
const multer = require("multer");
const path = require("path");

// إStockage des photos des animaux lors de l'ajout 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// L'ajout d'un animal
animalRouter.post("/add", upload.single("img"), async (req, res) => {
  try {
    const animalData = {
      ...req.body,
      img: req.file?.filename, 
    };

    const newAnimal = new Animal(animalData);
    const result = await newAnimal.save();
    res.status(201).send({ animal: result, msg: "Animal is added" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error adding animal" });
  }
});


// Appel au animaux 
animalRouter.get("/", async (req, res) => {
  try {
    let result = await Animal.find();
    return res.status(200).send({ animals: result, msg: "All animals" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error fetching animals" });
  }
});

// appel un seul animal par ID 
animalRouter.get("/:id", async (req, res) => {
  try {
    let result = await Animal.findById(req.params.id);
    if (!result) {
      return res.status(404).send({ error: "Animal not found" });
    }
    return res.status(200).send({ animal: result, msg: "One animal" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error fetching animal" });
  }
});

// Supprimer un animal 
animalRouter.delete("/:id", async (req, res) => {
  try {
    let result = await Animal.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ error: "Animal not found" });
    }
    return res.status(200).send({ animal: result, msg: "Animal is deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error deleting animal" });
  }
});

// modifier un animal
animalRouter.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.img = req.file.filename;
    }

    const result = await Animal.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ error: "Animal not found" });
    }

    return res.status(200).send({ animal: result, msg: "Animal is updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error updating animal" });
  }
});


module.exports = animalRouter;