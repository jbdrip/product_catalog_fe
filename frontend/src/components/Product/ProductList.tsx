import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ProductGrid from "./ProductGrid";
import { Product, ProductsListProps } from "../../types";

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

const ProductsList: React.FC<ProductsListProps> = ({ searchTerm, selectedCategory }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data?.products) {
      const mapped: Product[] = data.products.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.photo,
        category: p.category ?? "Otros",
        description: p.description ?? "",
      }));
      setProducts(mapped);
    }
  }, [data]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error.message}</p>;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  return <ProductGrid products={filteredProducts} />;
};

export default ProductsList;
