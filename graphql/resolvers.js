const User = require("../db/models/User");
const Recipe = require("../db/models/Recipe");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const createToken = (user, secret, expiresIn) => {
  const { id, userName, email } = user;
  return jwt.sign({ userName, email, id }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getRecipes: async (_, { recipe }) => {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=100&query=${recipe}`;
      try {
        const results = await axios.get(url);
        const data = results.data;
        const recipes = data.results;
        return recipes;
      } catch (error) {
        console.log(error);
      }
    },
    getRecipe: async (_, { id }) => {
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`;
      try {
        const results = await axios.get(url);
        const recipe = results.data;
        return recipe;
      } catch (error) {
        console.log(error);
      }
    },
    getRecipeByCuisine: async (_, { cuisine }) => {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&cuisine=${cuisine}&number=100`;
      try {
        const results = await axios.get(url);
        const recipe = results.data;
        return recipe.results;
      } catch (error) {
        console.log(error);
      }
    },
    getRecipesByUser: async (_, {}, ctx) => {
      try {
        const userRecipes = await Recipe.find({
          user: ctx.user.id.toString(),
        }).populate("user");
        return userRecipes;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password, userName } = input;
      // check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("User already registered.");
      }
      // check if username available
      const usernameExists = await User.findOne({ userName });
      if (usernameExists) {
        throw new Error("Username already taken.");
      }
      // hash password
      const hash = await bcrypt.genSaltSync(12);
      input.password = bcrypt.hashSync(password, hash);
      // save into db
      try {
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    userAuth: async (_, { input }) => {
      const { email, password } = input;
      // check if user exists
      const userExists = await User.findOne({ email });
      if (!userExists) {
        throw new Error("Incorrect username or password.");
      }
      // check if password is correct
      const correctPassword = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!correctPassword) {
        throw new Error("Incorrect username or password.");
      }
      return {
        token: createToken(userExists, process.env.SECRET, "24h"),
      };
    },
    saveRecipe: async (_, { input }, ctx) => {
      const { id } = input;
      // check if recipe is already saved
      const recipeExists = await Recipe.findOne({ id });
      if (recipeExists) {
        throw new Error("Recipe already saved.");
      }
      const newRecipe = new Recipe(input);
      newRecipe.user = ctx.user.id;
      try {
        const recipe = await newRecipe.save();
        return recipe;
      } catch (error) {
        console.log(error);
      }
    },
    removeRecipe: async (_, { id }, ctx) => {
      //check if recipe is saved
      if (!isValidObjectId(id)) {
        throw new Error("Recipe does not exists.");
      }
      const recipeExists = await Recipe.findById(id);
      if (!recipeExists) {
        throw new Error("Could not find recipe.");
      }
      if (recipeExists.user.toString() !== ctx.user.id.toString()) {
        throw new Error("You can not remove this recipe.");
      }
      try {
        await Recipe.findByIdAndDelete({ _id: id });
        return "Recipe removed from saved.";
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
