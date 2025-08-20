import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql", // URL de la función Lambda
  cache: new InMemoryCache(),
});

export default client;
