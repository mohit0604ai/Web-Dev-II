// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="product-card">
      <div className="product-image loaded">
        {product.emoji}
        {product.discount > 0 && (
          <div className="discount-badge">-{product.discount}%</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-text">({product.reviews || 0})</span>
        </div>
        <div className="product-price">
          <span className="price-current">${product.price.toFixed(2)}</span>
          <span className="price-original">${product.original.toFixed(2)}</span>
        </div>
        <button className="add-to-cart" onClick={() => onAdd(product.name)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;