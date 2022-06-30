import {useEffect, useState} from 'react';

import Card from '../ui/Card';
import classes from './AvailableBooks.module.css';
import BookItem from './bookItem/BookItem';

const BookRecommendations = (props) => {
    const [books,setBooks] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState();

    useEffect(() =>{
        const fetchBooks = async () => {
            const response = await fetch(props.bookLink);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            const loadedBooks = [];

            const bookRecommendations = responseData.Books;

            for (const key in bookRecommendations){
                loadedBooks.push({
                    id: bookRecommendations[key].id,
                    name: bookRecommendations[key].name,
                    author: bookRecommendations[key].author,
                    price: bookRecommendations[key].price,
                    thumbnail: bookRecommendations[key].thumbnail
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


    },[props.bookLink]);

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

    const booksList = books.map(book => <BookItem key={book.id}  id={book.id} name={book.name} author={book.author}
                                                  price={book.price} thumbnail={book.thumbnail}/>);
    return (
        <section className={classes.books}>
            <Card>
                <ul>{booksList}</ul>
            </Card>
        </section>
    );
};

export default BookRecommendations;