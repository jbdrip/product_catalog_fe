import React, { useEffect, useState } from "react";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "../apolloClient";

type Product = {
  id: string;
  name: string;
  price: number;
  photo: string;
};

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      photo
    }
  }
`;

const ProductsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error.message}</p>;

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            width: "150px",
            textAlign: "center",
          }}
        >
          <img src={p.photo} alt={p.name} style={{ width: "100%", borderRadius: "4px" }} />
          <h3>{p.name}</h3>
          <p>${p.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

const IndexPage: React.FC = () => (
  <ApolloProvider client={client}>
    <div style={{ padding: "20px" }}>
      <h1>Catálogo de Productos</h1>
      <ProductsList />
    </div>
  </ApolloProvider>
);

export default IndexPage;
