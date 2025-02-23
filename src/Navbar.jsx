import { ShoppingCart } from 'lucide-react';

const Navbar = ({ cartCount, onCartClick }) => (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="logo">OneCraft</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#prods">Shop</a>
            <a href="#About">About</a>
            <div className="cart-icon" onClick={onCartClick}>
              <ShoppingCart className="cart-svg" />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  export default Navbar;