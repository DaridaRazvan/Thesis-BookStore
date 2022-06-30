import CartContext from "./cart-context";
import {useReducer} from 'react';


const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state,action) => {
    if(action.type === 'ADD'){
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else{
            updatedItems = state.items.concat(action.item);
        }
        const newCart = {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
        localStorage.setItem("cart",JSON.stringify(newCart));
        return newCart;
    }
    if(action.type === "ADD_ONE"){
        const updatedTotalAmount =
            state.totalAmount + action.item.price;

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;

        const newCart =  {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
        localStorage.setItem("cart",JSON.stringify(newCart));
        return newCart;
    }
    if(action.type === 'ADD_ALL'){
        return {
            items: action.item.items,
            totalAmount: action.item.totalAmount
        }
    }
    if(action.type === 'REMOVE_ALL'){
        const newCart = {
            items: [],
            totalAmount: 0
        }
        localStorage.setItem("cart",JSON.stringify(newCart))
        return newCart;
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...existingItem,amount: existingItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        const newCart =  {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
        localStorage.setItem("cart",JSON.stringify(newCart));
        return newCart;
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD',item: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE',id: id});
    };

    const addOneItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD_ONE',item: item});
    }

    const addAllFromStorage = (items) => {
        dispatchCartAction({type: 'ADD_ALL',item: items});
    }

    const emptyCart = () => {
        dispatchCartAction({type:'REMOVE_ALL',item: []})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        addOneItem: addOneItemToCartHandler,
        addAllItems: addAllFromStorage,
        removeAll: emptyCart
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;