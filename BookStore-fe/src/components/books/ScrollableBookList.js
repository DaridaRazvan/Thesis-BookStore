import classes from './ScrollableBookList.module.css'
import {useEffect, useState, Fragment} from "react";
import SmallBook from "./bookItem/SmallBook";

const ScrollableBookList = () => {
    const [books,setBooks] = useState([]);

    useEffect(() =>{
        const fetchBooks = async () => {
            const response = await fetch('http://127.0.0.1:5000/books/recommendation/SVD/1');

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();
            const loadedBooks = [];

            const booksFromFetch = responseData.Books;

            for (const key in booksFromFetch){
                loadedBooks.push({
                    id: booksFromFetch[key].id,
                    name: booksFromFetch[key].name,
                    author: booksFromFetch[key].author,
                    price: booksFromFetch[key].price,
                    thumbnail: booksFromFetch[key].thumbnail
                });
            }
            setBooks(loadedBooks);
        };


        fetchBooks().catch((error) => {
           console.log(error);
        });


    },[]);

    const booksList = books.map(book => <SmallBook key={book.id}  id={book.id} name={book.name} author={book.author}
                                                  price={book.price} thumbnail={book.thumbnail}/>);


    return(
        <Fragment>
            <div className={classes.title}>
                Recommendations
            </div>
            <div className = {classes.size}>
                <ul className = {classes.scrollMenu}>
                    {booksList}
                </ul>
            </div>
        </Fragment>
    )
}

export default ScrollableBookList