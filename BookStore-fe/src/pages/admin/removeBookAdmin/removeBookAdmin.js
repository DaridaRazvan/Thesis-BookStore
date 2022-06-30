import classes from "../Admin.module.css";
import Card from "../../../components/ui/Card";
import AdminLeftNav from "../AdminLeftNav";
import {useRef, useState} from "react";
import classes2 from './removeBookAdmin.module.css';
import BookItemAdmin from "../../../components/books/bookItem/BookItemAdmin";

const isEmpty = (value) => value.trim() === '';

const RemoveBookAdmin = () => {
    const [books,setBooks] = useState([]);
    const searchInputRef = useRef();

    const fetchBooks = async (search) => {
        const response = await fetch(`http://127.0.0.1:5000/books/search/${search}`);

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
            });
        }
        setBooks(loadedBooks);
    };

    const searchHandler = (event) => {
        event.preventDefault();

        const enteredText = searchInputRef.current.value;

        const enteredTextIsValid = !isEmpty(enteredText);

        if(!enteredTextIsValid){
            return;
        }

        console.log(enteredText);
        fetchBooks(enteredText).catch((error) => {
            console.log(error);
        });
    }

    const refresh = () => {
        const enteredText = searchInputRef.current.value;
        fetchBooks(enteredText).catch((error) => {
            console.log(error);
        });
    }

    const booksList = books.map(book => <BookItemAdmin key={book.id}  id={book.id} name={book.name} author={book.author} refresh={refresh}/>);
    return(
        <section className = {classes.admin}>
            <Card>
                <div className = {classes.position}>
                    <AdminLeftNav/>
                    <div className = {classes.right}>
                        <p> Remove Book </p>
                        <div className={classes2.search}>
                            <form onSubmit={searchHandler}>
                                <input type='text' id='name' ref={searchInputRef}/>
                                <button>Search</button>
                            </form>
                        </div>
                        <ul>{booksList}</ul>
                    </div>
                </div>
            </Card>
        </section>
    );
}

export default RemoveBookAdmin;