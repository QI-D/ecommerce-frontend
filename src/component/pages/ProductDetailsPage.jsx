import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { getProductById } from "../../service/ProductService";
import "../../style/productDetails.css";

const ProductDetailsPage = () => {

    const {productId} = useParams();
    const {cart, dispatch} = useCart();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await getProductById(productId);
                setProduct(response.product);
    
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to fetch product');
            }
        }
        fetchProductById();
    }, [productId]);

    const addToCart = () => {
        if (product) {
            dispatch({type: 'ADD_TO_CART', payload: product});
        }
    }

    const incrementQuantity = () => {
        if (product) {
            dispatch({type: 'INCREMENT_QUANTITY', payload: product});
        }
    }

    const decrementQuantity = () => {
        if (product) {
            const cartItem = cart.find(item => item.id === product.id);

            if (cartItem && cartItem.quantity > 1) {
                dispatch({type: 'DECREMENT_QUANTITY', payload: product});
            } else {
                dispatch({type: 'REMOVE_FROM_CART', payload: product});
            }
        }
    }

    if (!product) {
        return <div>Fetching product...</div>
    }

    const cartItem = cart.find(item => item.id === product.id);

    return(
        <div className="product-details">
            <img src={product?.imageUrl} alt={product?.name} />
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <span>${product?.price.toFixed(2)}</span>
            {cartItem ? (
                <div className="quantity-control">
                    <button onClick={decrementQuantity}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={incrementQuantity}>+</button>
                </div>
            ) : (
                <button onClick={addToCart}>Add to Cart</button>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default ProductDetailsPage;
