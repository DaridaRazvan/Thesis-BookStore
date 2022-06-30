import {useContext, useEffect, useState} from "react";
import classes from "./MyReviews.module.css";
import Card from "../../components/ui/Card";
import AuthContext from "../../store/auth-context";
import ReviewWithBook from "../../components/reviews/ReviewWithBook";
import Header from "../../components/layout/Header";
import {Fragment} from "react";
import Cart from "../../components/cart/Cart";

const MyReviews = () => {
    const loginCtx = useContext(AuthContext);
    const [reviews,setReviews] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState();
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    useEffect(() =>{
        const fetchReviews = async () => {
            const response = await fetch(`http://127.0.0.1:5000/reviews/userReviews/${loginCtx.userId}`);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            const loadedReviews = [];

            for (const key in responseData){
                loadedReviews.push({
                    id: responseData[key].id,
                    book: responseData[key].book,
                    description: responseData[key].description,
                    rating: responseData[key].rating
                });
            }
            console.log(loadedReviews);
            setReviews(loadedReviews);
            setIsLoading(false);
        };


        fetchReviews().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });


    },[loginCtx.userId]);

    if(isLoading){
        return <section className={classes.BooksLoading}>
            <p>Loading...</p>
        </section>
    }

    if(httpError){
        return <section className={classes.BooksError}>
            <p>{httpError}</p>
        </section>
    }

    const reviewsList = reviews.map(review =>
        <ReviewWithBook key={review.id}  id={review.id} book={review.book} rating={review.rating} description={review.description} />);
    return (
        <Fragment>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler} showPicture={false}/>
            <section className={classes.books}>
                <Card>
                    <ul>{reviewsList}</ul>
                </Card>
            </section>
        </Fragment>
    );
}

export default MyReviews;