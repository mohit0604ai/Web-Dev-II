import React from 'react';

const CartDrawer = ({ isOpen, onClose, cartItems, onRemove }) => {
  // Calculate total price of items in the cart
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Overlay: Darkens the background when drawer is open */}
      <div className={`cart-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
      
      {/* Side Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Your Shopping Bag</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-msg">Your cart is currently empty.</div>
          ) : (
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <span className="item-emoji">{item.emoji}</span>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(index)}>
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="total-row">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;