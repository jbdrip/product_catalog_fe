import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ProductGrid from "./ProductGrid";
import { Product, ProductsListProps } from "../../types";
import { AlertCircle, Wifi } from "lucide-react";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      photo
      category
      description
    }
  }
`;

const ProductsList: React.FC<ProductsListProps> = ({ searchTerm, selectedCategory }) => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data?.products) {
      const mapped: Product[] = data.products.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.photo || 'https://via.placeholder.com/300x300?text=No+Image',
        category: p.category ?? "Otros",
        description: p.description ?? "Descripción no disponible",
      }));
      setProducts(mapped);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner-large"></div>
          <h3>Cargando productos...</h3>
          <p>Estamos preparando los mejores productos para ti</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">
            <AlertCircle size={48} />
          </div>
          <h3>Error al cargar productos</h3>
          <p className="error-message">{error.message}</p>
          <div className="error-actions">
            <button 
              className="retry-btn"
              onClick={() => refetch()}
            >
              <Wifi size={16} />
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  return <ProductGrid products={filteredProducts} />;
};

export default ProductsList;