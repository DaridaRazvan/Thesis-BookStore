import Header from "../../components/layout/Header";
import Cart from "../../components/cart/Cart";
import {useState, Fragment} from "react";
import classes from './About.module.css';


const About = () => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    return(
        <Fragment>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler} showPicture={true}/>
            <section className={classes.about}>
                <h2>About</h2>
                <p>I chose to develop this site because I wanted to create an easier
                    way for book lovers to find information about books, see ratings
                    and get recommendations for books. I decided to make it a website
                    in order to be easily accessible for everyone. The target audience
                    for the site are book lovers who want to find more books to read
                    based on previous read books and genres.
                </p>
            </section>
        </Fragment>
    );
}

export default About;