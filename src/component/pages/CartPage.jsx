import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { isAuthenticated } from "../../service/AuthService";
import { createOrder } from "../../service/OrderService";
import "../../style/cartPage.css";

const CartPage = () => {

    const {cart, dispatch} = useCart();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const incrementQuantity = (product) => {
        dispatch({type: 'INCREMENT_QUANTITY', payload: product});
    }

    const decrementQuantity = (product) => {
        const cartItem = cart.find(item => item.id === product.id);

        if (cartItem && cartItem.quantity > 1) {
            dispatch({type: 'DECREMENT_QUANTITY', payload: product});
        } else {
            dispatch({type: 'REMOVE_FROM_CART', payload: product});
        }

        dispatch({type: 'DECREMENT_QUANTITY', payload: product});
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (!isAuthenticated()) {
            setMessage('Please login to proceed to checkout');
            setTimeout(() => {
                setMessage('');
                navigate('/login');
            }, 3000);
            return;
        }

        const orderItems = cart.map(item => {
            return {
                productId: item.id,
                quantity: item.quantity
            }
        });

        const orderRequest = {
            items: orderItems,
            totalPrice
        }

        try {
            const response = await createOrder(orderRequest);
            setMessage(response.message);

            if (response.status === 200) {
                dispatch({type: 'CLEAR_CART'});
                setTimeout(() => {
                    setMessage('');
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Failed to place an order');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    return (
        <div className="cart-page">
            <h1>Cart</h1>
            {message && <p className="response-message">{message}</p>}

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ): (
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="item-details">
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                </div>
                                <div className="item-info">
                                    <div className="quantity-control">
                                        <button onClick={() => decrementQuantity(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => incrementQuantity(item)}>+</button>
                                    </div>
                                    <span className="price">${(item.price*item.quantity).toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
