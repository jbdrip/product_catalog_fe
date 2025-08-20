import { Handler } from "@netlify/functions";
import { ApolloServer, gql } from "apollo-server-lambda";
//import { createClient, SupabaseClient } from "@supabase/supabase-js";
import logger from "../src/logger";

// Conexión a Supabase
// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_KEY!;
// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || ["*"];

// Array de productos de prueba
const mockProducts = [
  { id: "1", name: "Producto A", price: 10.99, photo: "https://via.placeholder.com/150" },
  { id: "2", name: "Producto B", price: 15.49, photo: "https://via.placeholder.com/150" },
  { id: "3", name: "Producto C", price: 7.99, photo: "https://via.placeholder.com/150" },
];

// Definición del schema GraphQL
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    photo: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, photo: String!): Product!
  }
`;

// Resolvers
/*const resolvers = {
  Query: {
    products: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        logger.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
      }
      return data;
    },
    product: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) {
        logger.error(`Error fetching product id=${id}:`, error);
        throw new Error("Product not found");
      }
      return data;
    },
  },
  Mutation: {
    addProduct: async (_: any, { name, price, photo }: { name: string; price: number; photo: string }) => {
      const { data, error } = await supabase
        .from("products")
        .insert([{ name, price, photo }])
        .select()
        .single();
      if (error) {
        logger.error("Error inserting product:", error);
        throw new Error("Failed to add product");
      }
      return data;
    },
  },
};*/

// Resolvers usando el array de prueba
const resolvers = {
  Query: {
    products: async () => {
      logger.info("Fetching all products (mock)");
      return mockProducts;
    },
    product: async (_: any, { id }: { id: string }) => {
      const product = mockProducts.find((p) => p.id === id);
      if (!product) {
        logger.error(`Product not found with id=${id}`);
        throw new Error("Product not found");
      }
      return product;
    },
  },
  Mutation: {
    addProduct: async (_: any, { name, price, photo }: { name: string; price: number; photo: string }) => {
      const newProduct = {
        id: (mockProducts.length + 1).toString(),
        name,
        price,
        photo,
      };
      mockProducts.push(newProduct);
      logger.info(`Added new product: ${name}`);
      return newProduct;
    },
  },
};

// Crear Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  formatError: (err) => {
    logger.error("GraphQL Error:", err);
    return err;
  },
});

// Handler compatible con TypeScript y Netlify Functions
export const handler: Handler = (event, context, callback) => {
  if (!callback) return; // Seguridad para TS

  const origin = event.headers.origin ?? "";
  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Credentials": "true",
  };

  // Responder OPTIONS para preflight CORS
  if (event.httpMethod === "OPTIONS") {
    return callback(null, {
      statusCode: 200,
      headers: corsHeaders,
      body: "OK",
    });
  }

  // Llamar a Apollo Lambda handler
  const apolloHandler = server.createHandler();

  apolloHandler(event, context as any, (error, result) => {
    if (result && result.headers) {
      result.headers = { ...result.headers, ...corsHeaders };
    }
    callback(error, result);
  });
};
