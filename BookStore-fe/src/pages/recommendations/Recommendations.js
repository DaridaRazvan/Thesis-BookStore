import Cart from "../../components/cart/Cart";
import Header from "../../components/layout/Header";
import classes from "../topBooks/TopBooks.module.css";
import {useState, Fragment} from "react";
import BookRecommendations from "../../components/books/BookRecommendations";

const Recommendations = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const userId = localStorage.getItem('userId');

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
            <h2>Book Recommendations</h2>
            <main className={classes.space}>
                <BookRecommendations bookLink={`http://127.0.0.1:5000/books/recommendation/SVDTuning/${userId}`}/>
            </main>
        </Fragment>
    );
}

export default Recommendations;