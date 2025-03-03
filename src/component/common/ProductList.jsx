import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import "../../style/productList.css";

const ProductList = ({products}) => {
    const {cart, dispatch} = useCart();

    const addToCart = (product) => {
        dispatch({type: 'ADD_TO_CART', payload: product});
    }

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

    return (
        <div className="product-list">
            {products.map((product, index) => {
                const cartItem = cart.find(item => item.id === product.id);
                return (
                    <div className="product-item" key={index}>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <span>${product.price.toFixed(2)}</span>
                        </Link>
                        {cartItem ? (
                            <div className="quantity-control">
                                <button onClick={() => decrementQuantity(product)}>-</button>
                                <span>{cartItem.quantity}</span>
                                <button onClick={() => incrementQuantity(product)}>+</button>
                            </div>
                        ): (
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default ProductList;
