const express = require("express");
const Recipe = require("../models/recipeModel");

const router = express.Router();

// global methods

router.get("/", async function (req, res) {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ msg: recipes });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post("/", async function (req, res) {
  const recipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    preparation: req.body.preparation,
    image: req.body.image,
    postedBy: req.body.postedBy,
    postedAt: req.body.postedAt,
  });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json({ msg: newRecipe });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// id related methods

const findRecipe = async (req, res, next) => {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(404).json({ msg: "recipe not found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "error finding recipe" });
  }
  res.recipe = recipe;
  next();
};

// particular methods

router.get("/:id", findRecipe, async function (req, res) {
  res.status(200).json({ msg: res.recipe });
});

router.patch("/:id", findRecipe, async function (req, res) {
  if (req.body.name != null) {
    res.recipe.name = req.body.name;
  }
  if (req.body.description != null) {
    res.recipe.description = req.body.description;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  if (req.body.image != null) {
    res.recipe.image = req.body.image;
  }
  if (req.body.postedBy != null) {
    res.recipe.postedBy = req.body.postedBy;
  }

  try {
    const updatedRecipe = await res.recipe.save();
    res.status(200).json({ updatedRecipe });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

router.delete("/:id", findRecipe, async function (req, res) {
  try {
    await res.recipe.delete();
    res.status(200).json({ msg: "delete successful" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
