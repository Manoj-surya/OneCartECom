import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import FilterSection from './FilterSection';
import ProductCard from './ProductCard';
import CartPage from './CartPage';
import ProductPage from './ProductPage_temp';

const ProductSkeleton = () => (
  <div className="product-card skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  </div>
);

const loadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
  });
};

function App() {
  const [products, setProducts] = useState([]); //store fetched products
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        console.log(data.products);
        setProducts(data.products);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Simulate initial loading
    const loadProducts = async () => {
      await Promise.all(products.map(product => loadImage(product.image)));
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

    const getTotalCartQuantity = () => {
      return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase its quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      // If item doesn't exist, add it with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    console.log("Selected Product ID:", selectedProduct);
  }, [selectedProduct]);

  return (
    <div className="app">
      <Navbar cartCount={getTotalCartQuantity()} onCartClick={() => setIsCartOpen(true)}/>
      
      <main className="main-content">
      <h1 className="page-title">Welcome to OneCraft</h1>
        
        <FilterSection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="products-grid" id='prods'>
        {isLoading ? (
            Array(6).fill(0).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={setSelectedProduct}
              />
            ))
          )}
        </div>
      </main>
      
      {isCartOpen && (
        <CartPage
          cartItems={cartItems}
          setCartItems={setCartItems}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {selectedProduct && (
        <ProductPage 
        productId={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        />
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-title" id='About'>About Us</h3>
              <p className="footer-text">
                FurniCraft offers premium furniture for your home with a focus on quality and style.
              </p>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">Contact Us</h3>
              <p className="footer-text">
                Email: info@furnicraft.com<br />
                Phone: (555) 123-4567<br />
                Address: 123 Furniture Lane
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
