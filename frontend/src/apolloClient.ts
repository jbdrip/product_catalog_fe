import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql", // URL de la función Lambda
  headers: {
    "x-api-key": process.env.GATSBY_API_SECRET_KEY || "", // Enviado en cada request
  },
  cache: new InMemoryCache(),
});

export default client;
