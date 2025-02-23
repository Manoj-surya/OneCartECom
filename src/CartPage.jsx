import './CartPage.css'
import { Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const CartPage = ({ cartItems, setCartItems, onClose }) => {
    const updateQuantity = (productId, change) => {
        setCartItems(prevItems => {
            if (change === 'remove') {
                return prevItems.filter(item => item.id !== productId);
              }

              return prevItems.map(item => {
                if (item.id === productId) {
                  const newQuantity = (item.quantity || 1) + change;
                  // Don't allow quantity below 1
                  if (newQuantity < 1) return item;
                  return { ...item, quantity: newQuantity };
                }
                return item;
              });
          });
    };
  
    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
      }, 0);
    };
  
    const getUniqueCartItems = (items) => {
      const itemMap = new Map();
      items.forEach(item => {
        if (itemMap.has(item.id)) {
          const existing = itemMap.get(item.id);
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          itemMap.set(item.id, { ...item, quantity: 1 });
        }
      });
      return Array.from(itemMap.values());
    };
  
    const [uniqueItems, setUniqueItems] = useState([]);
    useEffect(() => {
        setUniqueItems(getUniqueCartItems(cartItems));
    }, [cartItems]);
  
    if (cartItems.length === 0) {
      return (
        <div className="cart-page-overlay">
          <div className="cart-page">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="cart-page-overlay">
        <div className="cart-page">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">${item.price}</p>
                </div>
  
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
  
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
  
                <button 
                  className="remove-item"
                  onClick={() => updateQuantity(item.id, 'remove')}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
  
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CartPage;