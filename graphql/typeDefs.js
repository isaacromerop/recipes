const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    userName: String!
    email: String!
    created: String
  }
  type Recipe {
    id: ID!
    title: String!
    image: String!
    created: String!
    summary: String
    analyzedInstructions: [Instruction]
    spoonacularSourceUrl: String
    user: String
    extendedIngredients: [Ingredient]
    readyInMinutes: Int
    servings: Int
  }
  type Instruction {
    steps: [Step]
  }
  type Ingredient {
    id: ID
    originalString: String
  }
  type Step {
    number: Int
    step: String
  }
  type Token {
    token: String!
  }
  input UserInput {
    userName: String!
    email: String!
    password: String!
  }
  input AuthInput {
    email: String!
    password: String!
  }
  input RecipeInput {
    title: String!
    id: ID!
    image: String!
  }
  type Query {
    ## Recipes Queries
    getRecipes(recipe: String!): [Recipe]
    getRecipe(id: ID!): Recipe
    getRecipeByCuisine(cuisine: String!): [Recipe]
    getRecipesByUser: [Recipe]
  }
  type Mutation {
    ## Users Mutations
    newUser(input: UserInput): User
    userAuth(input: AuthInput): Token
    ## Recipes Mutations
    saveRecipe(input: RecipeInput): Recipe
    removeRecipe(id: ID!): String
  }
`;

module.exports = typeDefs;
