const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  id: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
