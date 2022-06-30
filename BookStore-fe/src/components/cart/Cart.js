import {useContext, useState} from 'react';

import classes from './Cart.module.css'
import Modal from "../ui/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import AuthContext from "../../store/auth-context";

const Cart = (props) =>{
    const [isCheckout,setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const loginCtx = useContext(AuthContext);

    const totalAmount = `${cartCtx.totalAmount.toFixed(2)} lei`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addOneItem(item);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = (userData) =>{

        // console.log(JSON.stringify({
        //     user: userData,
        //     //totalPrice: cartCtx.totalAmount,
        //     orderedItems: cartCtx.items
        // }));

        fetch('http://127.0.0.1:5000/orders/add',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                user: loginCtx.userId,
                orderedItems: cartCtx.items
            })
        });

        cartCtx.removeAll();
        props.onClose();
    };

    const modalActions = <div className={classes.actions}>
        <button className={classes['button-btn']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>;

    return (
        <Modal onClose={props.onClose}>
            <ul className = {classes['cart-items']}>
                {cartCtx.items.map(item =>
                    <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>)}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </Modal>
    )
};

export default Cart;