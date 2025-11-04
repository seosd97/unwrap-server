import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: {},
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.log(`🚀  Server ready at: ${url}`);
