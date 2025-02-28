export const cartInitialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || []
};

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            let newCart;
            if (existingItem) {
                newCart = state.cart.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }
                    return item;
                });
            } else {
                newCart = [...state.cart, {...action.payload, quantity: 1}];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart,
            };

        case 'REMOVE_FROM_CART':
            const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return {
                ...state,
                cart: updatedCart,
            };

        case 'INCREMENT_QUANTITY':
            const incrementedCart = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(incrementedCart));
            return {
                ...state,
                cart: incrementedCart,
            };

        case 'DECREMENT_QUANTITY':
            const decrementedCart = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(decrementedCart));
            return {
                ...state,
                cart: decrementedCart,
            };

        case 'CLEAR_CART':
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: [],
            };

        default:
            return state;
    }
}