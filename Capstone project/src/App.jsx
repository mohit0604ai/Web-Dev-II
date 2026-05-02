import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import './App.css';

// 1. Data Structure based on your source file
const PRODUCTS = [
    { id: 1, name: "Wireless Headphones", price: 89.99, original: 129.99, rating: 4.5, reviews: 328, emoji: "🎧", discount: 30, category: "Electronics" },
    { id: 2, name: "Smart Watch Pro", price: 199.99, original: 299.99, rating: 4.7, reviews: 512, emoji: "⌚", discount: 33, category: "Electronics" },
    { id: 3, name: "Portable Charger", price: 34.99, original: 49.99, rating: 4.3, reviews: 891, emoji: "🔋", discount: 30, category: "Electronics" },
    { id: 4, name: "Premium Denim Jacket", price: 59.99, original: 89.99, rating: 4.6, reviews: 210, emoji: "🧥", discount: 33, category: "Fashion" },
    { id: 5, name: "Minimalist Desk Lamp", price: 44.99, original: 69.99, rating: 4.8, reviews: 156, emoji: "💡", discount: 35, category: "Home & Garden" },
    { id: 6, name: "Ergonomic Mouse", price: 29.99, original: 45.99, rating: 4.4, reviews: 890, emoji: "🖱️", discount: 35, category: "Electronics" },
    { id: 7, name: "Running Sneakers", price: 75.00, original: 110.00, rating: 4.5, reviews: 432, emoji: "👟", discount: 31, category: "Sports" },
    { id: 8, name: "Mechanical Keyboard", price: 129.99, original: 199.99, rating: 4.8, reviews: 745, emoji: "⌨️", discount: 35, category: "Electronics" }
];

const CATEGORIES = ["All Products", "Electronics", "Fashion", "Home & Garden", "Sports"];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  
  // 2. Persistent Cart (Local Storage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shophub_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shophub_cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Logic for Toast Notifications
  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  // 4. Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All Products" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    triggerToast(`✓ ${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app-shell">
      {/* Header Section[cite: 1] */}
      <header className="main-header">
        <div className="header-container">
          <h1 className="logo">ShopHub</h1>
          
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="header-actions">
            <div className="cart-trigger" onClick={() => setIsCartOpen(true)}>
              <span className="cart-emoji">🛒</span>
              <span className="cart-badge">{cart.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Section[cite: 1] */}
      <div className="hero-banner">
        <h2>Summer Collection 2024</h2>
        <p>Discover amazing products with up to 50% off</p>
      </div>

      <main className="main-content">
        {/* Category Navigation[cite: 1] */}
        <nav className="category-nav">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Product Grid Section[cite: 1] */}
        <section className="products-section">
          <div className="grid-header">
            <h3>{activeCategory} ({filteredProducts.length})</h3>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={() => addToCart(product)} 
              />
            ))}
          </div>
        </section>
      </main>

      {/* Cart Drawer Component[cite: 1] */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onRemove={removeFromCart}
      />

      {/* Toast Notification[cite: 1] */}
      {toast.show && <div className="toast-notification">{toast.message}</div>}

      <footer className="main-footer">
        <p>&copy; 2026 ShopHub. Built with React for Capstone Project.</p>
      </footer>
    </div>
  );
}

export default App;