import React, { useState, Fragment} from "react";
import Cart from "../../components/cart/Cart";
import Header from "../../components/layout/Header";
import {useParams} from "react-router-dom";
import ResultBookList from "./ResultBookList";
import classes from './Results.module.css'

const Result = () => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const { search } = useParams();
    const { page } = useParams();
    const { genre } = useParams();

    console.log(search, page, genre);

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
                <ResultBookList search={search} page={page} genre={genre}/>
            </main>
        </Fragment>
    );
}

export default Result;