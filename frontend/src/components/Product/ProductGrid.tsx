import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { ProductGridProps } from "../../types";
import { SearchX, Package } from "lucide-react";
import "../../styles/ProductGrid.css";

const ProductGrid: React.FC<ProductGridProps> = ({ products, setSelectedCategory, setSearchTerm }) => {

  const [filteredProducts, setFilteredProducts] = useState(products);

  const showAllProducts = () => {
    setSelectedCategory("Todos");
    setSearchTerm("");
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    // Lógica para manejar el cambio de orden
    if (selectedOption === "relevance") {
      setFilteredProducts(products);
    } else {
      const sortedProducts = [...filteredProducts].sort((a, b) => selectedOption === "price-low" ? a.price - b.price : b.price - a.price);
      setFilteredProducts(sortedProducts);
    }
  };

  if (products.length === 0) {
    return (
      <div className="no-products">
        <div className="no-products-icon">
          <SearchX size={64} />
        </div>
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar los filtros o el término de búsqueda para encontrar lo que buscas</p>
        <button className="reset-filters-btn" onClick={showAllProducts}>
          <Package size={16} />
          Ver todos los productos
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="grid-header">
        <div className="results-count">
          <span>{products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="grid-controls">
          <select className="sort-select" onChange={handleSortChange} defaultValue="relevance" aria-label="Ordenar productos">
            <option value="relevance">Más relevantes</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
          </select>
          
          <div className="view-toggle">
            <button className="view-btn active" aria-label="Vista de cuadrícula">
              <div className="grid-icon"></div>
            </button>
            <button className="view-btn" aria-label="Vista de lista">
              <div className="list-icon"></div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="product-card-wrapper"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;