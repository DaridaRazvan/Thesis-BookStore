import Cart from "../../components/cart/Cart";
import Header from "../../components/layout/Header";
import Books from "../../components/books/Books";
import {useState, Fragment} from "react";
import {useNavigate} from "react-router-dom";
import classes from "./Store.module.css";

const Store = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const navigate = useNavigate();

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    const changePage = () => {
        console.log("clicked");
        navigate('/searchResults/1');
    }

    return (
        <Fragment>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler} showPicture={true}/>
            <main>
                <Books/>
                <section className={classes.showAll}>
                    <button onClick={changePage}>All books</button>
                </section>
            </main>
        </Fragment>
    );
}

export default Store;
