const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const connectDB = require("./db/config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRET
        );
        return {
          user,
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server started at Port: ${url}`);
});
