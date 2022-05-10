const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { resolvers } = require("./resolvers");
const mongoose = require("mongoose");
const { UserDataSource } = require("./datasource/user");
const { PostDataSource } = require("./datasource/post");

mongoose.connect(
  "mongodb+srv://immortalmind:0115120323a@cluster0.24rs5.mongodb.net/ITI?retryWrites=true&w=majority"
);
mongoose.set("debug", true);

const schemaString = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);
const typeDefs = gql(schemaString);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authorization = req.headers.authorization;
    return {
      userPassword: authorization,
    };
  },
  dataSources: () => ({
    user: new UserDataSource(),
    post: new PostDataSource(),
  }),
});

server.listen(2000, () => {
  console.log("Server has been started on port 2000");
});
