import React, {useState, Fragment, useEffect, useContext} from "react";
import Cart from "../../components/cart/Cart";
import Header from "../../components/layout/Header";
import AuthContext from "../../store/auth-context";
import classes from './WishlistBooks.module.css';
import BookItemSimple from "../../components/books/bookItem/BookItemSimple";
import Card from "../../components/ui/Card";


const WishlistBooks = () => {
    const authCtx = useContext(AuthContext);
    const [cartIsShown, setCartIsShown] = useState(false);
    const [books,setBooks] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState();

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`http://127.0.0.1:5000/users/wishlist/${authCtx.userId}`);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            const loadedBooks = [];

            for (const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    author: responseData[key].author,
                    thumbnail: responseData[key].thumbnail
                });
            }
            //console.log(loadedBooks);
            setBooks(loadedBooks);
            setIsLoading(false);
        };


        fetchBooks().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });


    },[]);

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

    const booksList = books.map(book => <BookItemSimple key={book.id}  id={book.id} name={book.name} author={book.author}
                                                        thumbnail={book.thumbnail}/>);

    return(
        <Fragment>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler} showPicture={false}/>
            <section className={classes.books}>
                <Card>
                    <ul>{booksList}</ul>
                </Card>
            </section>
        </Fragment>
    )
}

export default WishlistBooks;