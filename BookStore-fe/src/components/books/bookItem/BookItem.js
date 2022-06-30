import classes from './BookItem.module.css';
import BookItemForm from "./BookItemForm";
import React, {useContext} from 'react';
import CartContext from "../../../store/cart-context";
import {useNavigate} from "react-router-dom";

const BookItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `${props.price.toFixed(2)} lei`;
    const navigate = useNavigate();

    const addToCartHandler = (amount) => {
        console.log(props.id);
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price: props.price
        });
    }

    const showBook = () => {
        let path = `/book/${props.id}`;
        navigate(path);
    }

    return (
        <li className={classes.book}>
            <div className={classes.divBook} onClick={showBook}>
                <div>
                    <img className={classes.pic} src={props.thumbnail} alt={"Pic"}/>
                </div>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.author}>{props.author}</div>
                    <div className={classes.price}>{price}</div>
                </div>
            </div>
            <div>
                <BookItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
};

export default BookItem;