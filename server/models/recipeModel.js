const mongoose = require("mongoose");
const formatted_date = require("../utils/formatDate");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    required: true,
  },
  preparation: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    require: true,
  },
  postedBy: {
    type: String,
    trim: true,
    default: "anonymous",
  },
  postedAt: {
    type: String,
    required: true,
    default: formatted_date(),
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
