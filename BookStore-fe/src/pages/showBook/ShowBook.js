import React, {useContext, useEffect, useState, Fragment, useRef} from "react";
import Cart from "../../components/cart/Cart";
import Header from "../../components/layout/Header";
import {useParams} from "react-router-dom";
import Card from "../../components/ui/Card";
import classes from "../../components/books/AvailableBooks.module.css";
import BookItemForm from "../../components/books/bookItem/BookItemForm";
import CartContext from "../../store/cart-context";
import classes2 from "./ShowBook.module.css";
import ShowReviews from "../../components/reviews/ShowReviews";
import AddReview from "../../components/reviews/AddReview";
import AuthContext from "../../store/auth-context";
import { IoIosHeart,IoIosHeartEmpty } from 'react-icons/io';

const ShowBook = (props) => {
    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
    const [cartIsShown, setCartIsShown] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState();

    const [isWishlisted,setIsWishlisted] = useState(false);

    const [name,setName] = useState('');
    const [author,setAuthor] = useState([]);
    const [price,setPrice] = useState('');
    const [genre,setGenre] = useState([]);
    const [description,setDescription] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [numberOfPages, setNumberOfPages] = useState('');
    const [reviews, setReviews] = useState([]);

    const thumbnail = useRef();

    const { id } = useParams();

    const addToCartHandler = (amount) => {
        console.log(id);
        cartCtx.addItem({
            id:parseInt(id),
            name:name,
            amount:amount,
            price: price
        });
    }
    useEffect(() =>{
        const checkIfWishlisted = async () => {
            console.log(id,authCtx.userId);
            const response = await fetch('http://127.0.0.1:5000/users/isWishlisted', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId: parseInt(id),
                    userId: parseInt(authCtx.userId)
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            console.log(responseData);
            if(responseData.message === "Book in Wishlist"){
                setIsWishlisted(true);
            }
        };
        checkIfWishlisted().catch((error) => {
            console.log(error);
        });
    },[authCtx.userId, id])

    const fetchBook = async () => {
        const response = await fetch(`http://127.0.0.1:5000/books/${id}`);

        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        console.log(responseData);
        setName(responseData.name);
        setAuthor(responseData.author);
        setPrice(responseData.price);
        setGenre(responseData.genre);
        setDescription(responseData.description);
        setPublishedYear(responseData.publishedYear);
        setNumberOfPages(responseData.numberOfPages);
        thumbnail.current = responseData.thumbnail;

        const reviewList = [];
        for(const key in responseData.reviews){
            reviewList.push({
                id: responseData.reviews[key].id,
                name: responseData.reviews[key].name,
                rating : responseData.reviews[key].rating,
                description: responseData.reviews[key].description
            });
        }
        setIsLoading(false);
        setReviews(reviewList);
        console.log(reviewList);
    };

    const updateReviewList = () => {
        fetchBook().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }

    useEffect(() =>{
        fetchBook().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    },[id])

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    if(isLoading){
        return <section className={classes.BooksLoading}>
            <p>Loading...</p>
        </section>
    }

    const addToWishlist = async () => {
        const response = await fetch('http://127.0.0.1:5000/users/wishlist/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookId: parseInt(id),
                userId: parseInt(authCtx.userId)
            })
        });
        return response.json();
    }

    const removeFromWishlist = async () => {
        const response = await fetch(`http://127.0.0.1:5000/users/wishlist/delete/${authCtx.userId}/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }

    const changeWishlistStatus = () => {
        if(isWishlisted){
            removeFromWishlist().then(data =>{
                console.log(data);
                setIsWishlisted(false);
            });
        } else{
            addToWishlist().then(data =>{
                console.log(data);
                setIsWishlisted(true);
            });
        }
    }

    return (
        <Fragment>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler} showPicture={false}/>
            <main>
                <section className={classes2.book}>
                    <Card>
                        {httpError && <p>{httpError}</p>}
                        <div className={classes2.divBook}>
                            <img className={classes2.pic} src={thumbnail.current} alt={"Pic"}/>
                            <div>
                                <div onClick={changeWishlistStatus}>
                                    {isWishlisted ? <IoIosHeart/> : <IoIosHeartEmpty/>}
                                </div>
                                <h1>{name}</h1>
                                <p>{author}</p>
                                <p>Genre: {genre}</p>
                                <p>Published year: {publishedYear},
                                    Number of pages: {numberOfPages}
                                </p>
                            </div>
                        </div>
                        <p>{description}</p>
                        <div>
                            <p>Price: {price} lei</p>
                            <BookItemForm onAddToCart={addToCartHandler}/>
                        </div>
                    </Card>
                </section>
                <section className={classes2.review}>
                    <Card>
                        <AddReview id={id} update={updateReviewList}/>
                        <ShowReviews reviews={reviews}/>
                    </Card>
                </section>
            </main>
        </Fragment>
    );
}

export default ShowBook;