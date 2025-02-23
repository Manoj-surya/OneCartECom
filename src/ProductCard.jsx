import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner ";

const ProductCard = ({ product, onAddToCart, onProductClick}) => {
    const loadImage = (src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
        });
      };
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
      loadImage(product.thumbnail).then(() => setIsImageLoaded(true));
    }, [product.thumbnail]);
  
    return (
      <div className="product-card" onClick={() => onProductClick(product.id)}>
        <div className="product-image-container">
          {!isImageLoaded && <LoadingSpinner />}
          <img 
            src={product.thumbnail} 
            alt={product.title}
            className={`product-image ${isImageLoaded ? 'loaded' : 'loading'}`}
          />
        </div>
        <div className="product-details">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-footer">
            <span className="product-price">${product.price}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;