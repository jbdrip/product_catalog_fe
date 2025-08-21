import React from "react";
import ProductCard from "./ProductCard";
import { ProductGridProps } from "../../types";
import "../../styles/ProductGrid.css";

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar los filtros o el término de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
