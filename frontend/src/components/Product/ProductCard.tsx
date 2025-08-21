import React from "react";
import { ProductCardProps } from "../../types";
import "../../styles/ProductCard.css";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="product-add-btn">Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
