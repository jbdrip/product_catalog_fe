import { Handler } from "@netlify/functions";
import { graphql, buildSchema } from 'graphql';
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import logger from "../src/logger";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || ["*"];
const API_SECRET_KEY = process.env.API_SECRET_KEY || "";

// Conexión a Supabase
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

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
  products: async () => {
    logger.info("Fetching all products from Supabase");
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      logger.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }

    return data || [];
  },

  product: async ({ id }: { id: string }) => {
    logger.info(`Fetching product with id: ${id}`);
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error(`Error fetching product with id=${id}:`, error);
      throw new Error("Product not found");
    }

    return data;
  },

  addProduct: async ({ 
    name, 
    price, 
    photo, 
    category, 
    description 
  }: { 
    name: string; 
    price: number; 
    photo: string; 
    category: string; 
    description: string 
  }) => {
    logger.info(`Adding new product: ${name}`);
    
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name,
        price,
        photo,
        category,
        description
      }])
      .select()
      .single();

    if (error) {
      logger.error("Error adding product:", error);
      throw new Error("Failed to add product");
    }

    logger.info(`Successfully added product: ${name}`);
    return data;
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

    // Validación API Key (excepto preflight)
    if (event.httpMethod !== "OPTIONS") {
      const clientKey = event.headers["x-api-key"];
      if (!clientKey || clientKey !== API_SECRET_KEY) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ error: "Unauthorized" }),
        };
      }
    }

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