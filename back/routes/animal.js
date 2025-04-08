const express = require("express");
const Animal = require("../models/Animal");
const animalRouter = express.Router();

// ✅ إضافة حيوان جديد
animalRouter.post("/add", async (req, res) => {
  try {
    let newAnimal = new Animal(req.body);
    let result = await newAnimal.save();
    return res.status(201).send({ animal: result, msg: "Animal is added" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error adding animal" });
  }
});

// ✅ جلب كل الحيوانات
animalRouter.get("/", async (req, res) => {
  try {
    let result = await Animal.find();
    return res.status(200).send({ animals: result, msg: "All animals" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error fetching animals" });
  }
});

// ✅ جلب حيوان واحد عبر الـ ID
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

// ✅ حذف حيوان
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

// ✅ تعديل حيوان
animalRouter.put("/:id", async (req, res) => {
  try {
    let result = await Animal.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true } // ✅ يجعل Mongoose يعيد العنصر المحدث مباشرة
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
