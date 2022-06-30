import React, { useState, Fragment} from "react";
import classes from './TopBooks.module.css';
import Cart from "../../components/cart/Cart";
import Header from "../../components/layout/Header";
import AvailableBooks from "../../components/books/AvailableBooks";

const TopBooks = () => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    return (
        <Fragment>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler} showPicture={false}/>
            <main className={classes.space}>
                <AvailableBooks bookLink={'http://127.0.0.1:5000/books/topBooks'}/>
            </main>
        </Fragment>
    );
}

export default TopBooks;