import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart using reduce() for efficiency
  const calculateTotalAmount = () => {
    return cart.reduce((total, cartItem) => {
      const price = parseFloat(cartItem.cost.substring(1));
      return total + price * cartItem.quantity;
    }, 0);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // Handle incrementing the quantity of a cart item with basic error handling
  const handleIncrement = (cartItem) => {
    try {
      if (!cartItem || !cartItem.name) throw new Error("Invalid item");
      dispatch(
        updateQuantity({
          name: cartItem.name,
          quantity: cartItem.quantity + 1,
        })
      );
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  // Handle decrementing the quantity or removing the item if quantity reaches 0
  const handleDecrement = (cartItem) => {
    try {
      if (!cartItem || !cartItem.name) throw new Error("Invalid item");
      if (cartItem.quantity > 1) {
        dispatch(
          updateQuantity({
            name: cartItem.name,
            quantity: cartItem.quantity - 1,
          })
        );
      } else {
        dispatch(removeItem(cartItem.name));
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  const handleRemove = (cartItem) => {
    try {
      if (!cartItem || !cartItem.name) throw new Error("Invalid item");
      dispatch(removeItem(cartItem.name));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Calculate total cost based on quantity for a specific item
  const calculateTotalCost = (cartItem) => {
    const price = parseFloat(cartItem.cost.substring(1));
    return price * cartItem.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      <div>
        {cart.map(cartItem => (
          <div className="cart-item" key={cartItem.name}>
            <img className="cart-item-image" src={cartItem.image} alt={cartItem.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{cartItem.name}</div>
              <div className="cart-item-cost">{cartItem.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(cartItem)}>-</button>
                <span className="cart-item-quantity-value">{cartItem.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(cartItem)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(cartItem).toFixed(2)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(cartItem)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

// PropTypes validation for component props
CartItem.propTypes = {
  onContinueShopping: PropTypes.func,
};

export default CartItem;

