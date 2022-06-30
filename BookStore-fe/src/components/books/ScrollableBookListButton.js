import classes from './ScrollableBookListButton.module.css';
import {useState, useRef, useEffect} from "react";
import SmallBook from "./bookItem/SmallBook";
import Card from "../ui/Card";

const SLIDE_VALUE = 500;

const ScrollableBookListButton = (props) => {
    let scroll = useRef(null);
    const [scrollX, setScrollX] = useState(0);
    const [scrollEnd, setScrollEnd] = useState(false);

    const [books,setBooks] = useState([]);

    useEffect(() =>{
        const fetchBooks = async () => {
            const response = await fetch(props.link);

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

    //Slide click
    const slide = (shift) => {
        scroll.current.scrollLeft += shift;
        setScrollX(scrollX + shift);

        if (
            Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
            scroll.current.offsetWidth
        ) {
            setScrollEnd(true);
        } else {
            setScrollEnd(false);
        }
    };

    const scrollCheck = () => {
        setScrollX(scroll.current.scrollLeft);
        if (
            Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
            scroll.current.offsetWidth
        ) {
            setScrollEnd(true);
        } else {
            setScrollEnd(false);
        }
    };

    return (
        <div className={classes.size}>
            <div className={classes.title}>
                Recommendations
            </div>
            <Card>
                <div className={classes.App}>
                    {scrollX !== 0 && (
                        <button className="prev" onClick={() => slide(-SLIDE_VALUE)}>
                            {"<"}
                        </button>
                    )}
                    <ul ref={scroll} onScroll={scrollCheck}>
                        {booksList}
                    </ul>
                    {!scrollEnd && (
                        <button className="next" onClick={() => slide(+SLIDE_VALUE)}>
                            {">"}
                        </button>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default ScrollableBookListButton;
