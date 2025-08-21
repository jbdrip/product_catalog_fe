import { Handler } from "@netlify/functions";
import { graphql, buildSchema } from 'graphql';
import logger from "../src/logger";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || ["*"];

// Array de productos de prueba
const mockProducts = [
  { id: "1", name: "Producto A", price: 10.99, photo: "https://via.placeholder.com/150", category: "Electrónicos", description: "Descripción del Producto A" },
  { id: "2", name: "Producto B", price: 15.49, photo: "https://via.placeholder.com/150", category: "Smartphones", description: "Descripción del Producto B" },
  { id: "3", name: "Producto C", price: 7.99, photo: "https://via.placeholder.com/150", category: "Accesorios", description: "Descripción del Producto C" },
];

// Schema GraphQL
const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    price: Float!
    photo: String!
    category: String!
    description: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, photo: String!, category: String!, description: String!): Product!
  }
`);

// Resolvers
const rootValue = {
  products: () => {
    logger.info("Fetching all products (mock)");
    return mockProducts;
  },
  product: ({ id }: { id: string }) => {
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      logger.error(`Product not found with id=${id}`);
      throw new Error("Product not found");
    }
    return product;
  },
  addProduct: ({ name, price, photo, category, description }: { name: string; price: number; photo: string; category: string; description: string }) => {
    const newProduct = {
      id: (mockProducts.length + 1).toString(),
      name,
      price,
      photo,
      category,
      description
    };
    mockProducts.push(newProduct);
    logger.info(`Added new product: ${name}`);
    return newProduct;
  },
};

export const handler: Handler = async (event, context) => {
  try {
    const origin = event.headers.origin ?? "";
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };

    // Manejar preflight OPTIONS
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: "",
      };
    }

    // Solo permitir POST para GraphQL
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    // Parse del body
    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch (error) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Invalid JSON body" }),
      };
    }

    const { query, variables = {}, operationName } = body;

    if (!query) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "No query provided" }),
      };
    }

    // Ejecutar GraphQL query
    const result = await graphql({
      schema,
      source: query,
      rootValue,
      variableValues: variables,
      operationName,
    });

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };

  } catch (error) {
    logger.error("GraphQL Handler Error:", error);
    
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGINS[0],
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        errors: [{ message: "Internal server error" }] 
      }),
    };
  }
};