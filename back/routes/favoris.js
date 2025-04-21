const express = require("express");
const Favoris = require("../models/favoris");
const favorisRouter = express.Router();

// Add favoris
favorisRouter.post("/add", async (req, res) => {
    try {
        let newfavoris = new Favoris(req.body);
        let result = await newfavoris.save();
        res.status(200).send({ favoris: result, msg: "favoris is added" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});

// Get all favoris
favorisRouter.get("/", async (req, res) => {
    try {
        let result = await Favoris.find();
        res.status(200).send({ favoris: result, msg: "all favoris" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});

// Get one favoris
favorisRouter.get("/:id", async (req, res) => {
    try {
        let result = await Favoris.findById(req.params.id);
        res.status(200).send({ favoris: result, msg: "one favoris" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});

// Delete favoris
favorisRouter.delete("/:id", async (req, res) => {
    try {
        let result = await Favoris.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "favoris is deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});

// Edit favoris
favorisRouter.put("/:id", async (req, res) => {
    try {
        let result = await Favoris.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body } },
            { new: true } // ترجع النسخة الجديدة بعد التحديث
        );
        res.status(200).send({ updatedFavoris: result, msg: "favoris is updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});

module.exports = favorisRouter;
