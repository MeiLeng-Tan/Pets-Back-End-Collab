// controllers/pets.js
const Pet = require("../models/pet.js");
const express = require("express");
const router = express.Router();

const index = (req, res) => {
  res.status(201).json({ msg: "all" });
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

const remove = async (req, res) => {
  const { petId } = req.params;
  try {
    await Pet.findByIdAndDelete(petId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ err });
  }
};

router.get("/", index);
router.post("/", create);
router.delete("/:petId", remove);

module.exports = router;
