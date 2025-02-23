import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner ";

const ProductPage = ({ productId, onClose, onAddToCart }) => {
    const loadImage = (src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
        });
      };
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const controller = new AbortController(); // ✅ Cancel fetch if component unmounts
        const signal = controller.signal;
      
        fetch(`https://dummyjson.com/products/${productId}`, { signal })
          .then(res => res.json())
          .then(data => {
            console.log("Fetched product:", data);
            setProduct(data);
          })
          .catch(error => {
            if (error.name !== "AbortError") {
              console.error("Error fetching product:", error);
            }
          });
      
        return () => controller.abort(); // ✅ Cleanup on unmount
      }, [productId]);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
  
    useEffect(() => {
        if (product?.thumbnail) {  // ✅ Only run when product is loaded
          loadImage(product.thumbnail).then(() => setIsImageLoaded(true));
        }
      }, [product]);
  
    if (!product) return null;
  
    return (
      <div className="product-page-overlay">
        <div className="product-page">
          <button className="close-button" onClick={onClose}>×</button>
          <div className="product-page-content">
            <div className="product-page-image">
              {!isImageLoaded && <LoadingSpinner />}
              <img 
                src={product.thumbnail} 
                alt={product.title}
                className={isImageLoaded ? 'loaded' : 'loading'}
              />
            </div>
            <div className="product-page-details">
              <h1 className="product-page-title">{product.title}</h1>
              <p className="product-page-price">${product.price}</p>
              <p className="product-page-description">{product.description}</p>
              
              <div className="product-specs">
                <h2>Specifications</h2>
                <ul>
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Weight:</strong> {product.weight}g</li>
                <li><strong>Stock:</strong> {product.stock} available</li>
                <li><strong>SKU:</strong> {product.sku}</li>
                <li><strong>Availability:</strong> {product.availabilityStatus}</li>
                </ul>
              </div>
  
              <button 
                className="add-to-cart-btn large"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductPage;