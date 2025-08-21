import React, { useState } from "react";
import { ProductCardProps } from "../../types";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import "../../styles/ProductCard.css";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
  };

  const rating = Math.floor(Math.random() * 2) + 4; // Rating entre 4-5
  const reviews = Math.floor(Math.random() * 200) + 10; // Reviews entre 10-210

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        
        <div className="product-overlay">
          <button 
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Agregar a favoritos"
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          
          <button className="quick-view-btn" aria-label="Vista rápida">
            <Eye size={18} />
          </button>
        </div>
        
        <div className="product-badge">
          <span className="badge-new">Nuevo</span>
        </div>
      </div>
      
      <div className="product-card-info">
        <div className="product-category-wrapper">
          <span className="product-category">{product.category}</span>
        </div>
        
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < rating ? '#fbbf24' : 'none'}
                color={i < rating ? '#fbbf24' : '#d1d5db'}
              />
            ))}
          </div>
          <span className="rating-text">({reviews} reseñas)</span>
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-card-footer">
          <div className="price-section">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <span className="price-old">${(product.price * 1.2).toFixed(2)}</span>
          </div>
          
          <button 
            className={`product-add-btn ${isLoading ? 'loading' : ''}`}
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;