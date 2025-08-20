import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql", // URL de la función Lambda
  cache: new InMemoryCache(),
});

export default client;
