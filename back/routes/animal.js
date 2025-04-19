const express = require("express");
const Animal = require("../models/Animal");
const animalRouter = express.Router();
const multer = require("multer");
const path = require("path");

// إعداد مكان تخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // تأكد أن هذا المجلد موجود
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// ✅ إضافة حيوان جديد
animalRouter.post("/add", upload.single("img"), async (req, res) => {
  try {
    const animalData = {
      ...req.body,
      img: req.file?.filename, // اسم الصورة فقط
    };

    const newAnimal = new Animal(animalData);
    const result = await newAnimal.save();
    res.status(201).send({ animal: result, msg: "Animal is added" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error adding animal" });
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
