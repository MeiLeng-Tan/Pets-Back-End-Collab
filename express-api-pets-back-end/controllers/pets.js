// controllers/pets.js
const Pet = require("../models/pet.js");
const express = require("express");
const router = express.Router();

const index = async (req, res) => {
  try {
    const foundPets = await Pet.find();
    res.status(200).json(foundPets);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const create = async (req, res) => {
  try {
    if (req.body.name === "") {
      return res.status(400).json({ err: "no name" });
    }

    const pet = await Pet.create(req.body);
    res.status(201).json({ pet });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const update = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {returnDocument: "after"});
    // Add a check for a not found pet
    if (!updatedPet) {
      res.status(404);
      throw new Error('Pet not found.');
    }
    // Add a JSON response with the updated pet
    res.status(200).json(updatedPet);
  } catch (err) {
    // Add code for errors
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
};

router.get("/", index);
router.post("/", create);
router.put("/:petId", update);

module.exports = router;
