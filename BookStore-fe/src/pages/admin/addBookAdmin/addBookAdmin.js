import classes from "../Admin.module.css";
import Card from "../../../components/ui/Card";
import AdminLeftNav from "../AdminLeftNav";
import {useRef, useState} from "react";

const isEmpty = (value) => value.trim() === '';

const AddBookAdmin = () => {
    const [errorMsg,setErrorMsg] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [text,setText] = useState('');

    const name = useRef();
    const description = useRef();
    const price = useRef();
    const sales = useRef();
    const thumbnail = useRef();
    const publishedYear = useRef();
    const numberOfPages = useRef();
    const authors = useRef();
    const genres = useRef();

    const addBook = async (name,description,price,sales,thumbnail, publishedYear, numberOfPages,
                           authors,genres) => {
        const response = await fetch(`http://127.0.0.1:5000/books/add`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price:price,
                sales:sales,
                thumbnail: thumbnail,
                publishedYear: publishedYear,
                numberOfPages:numberOfPages,
                authors: authors,
                genres: genres
            })
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        return await response.json();
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        //code
        const enteredName = name.current.value;
        const enteredDescription = description.current.value;
        const enteredPrice = price.current.value;
        const enteredSales = sales.current.value;
        const enteredThumbnail = thumbnail.current.value;
        const enteredPublishedYear = publishedYear.current.value;
        const enteredNumberOfPages = numberOfPages.current.value;
        const enteredAuthors = authors.current.value;
        const enteredGenres = genres.current.value;

        if(isEmpty(enteredName) || isEmpty(enteredDescription) || isEmpty(enteredPrice) ||
            isEmpty(enteredSales) || isEmpty(enteredThumbnail) || isEmpty(enteredPublishedYear)
            || isEmpty(enteredNumberOfPages) || isEmpty(enteredAuthors) || isEmpty(enteredGenres)){
            setErrorMsg(true);
            return;
        }

        addBook(enteredName,enteredDescription,enteredPrice,enteredSales,enteredThumbnail,enteredPublishedYear,
            enteredNumberOfPages,enteredAuthors,enteredGenres).then(r => {
                setText(r.message);
                setFormSubmitted(true);
        })
    }

    const removeFormSubmitted = () => {
        setFormSubmitted(false);
        setErrorMsg(false);
    }

    return(
        <section className = {classes.admin}>
            <Card>
                <div className = {classes.position}>
                    <AdminLeftNav/>
                    <div className = {classes.right}>
                        <p> Add Book </p>

                        <form onSubmit={confirmHandler}>
                            <div className={classes.control}>
                                <label htmlFor='name'>Name</label>
                                <input onClick={removeFormSubmitted} type='text' id='name' ref={name}/>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='description'>Description</label>
                                <input onClick={removeFormSubmitted} type='text' id='description' ref={description}/>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='price'>Price</label>
                                <input onClick={removeFormSubmitted} type='number' id='price' ref={price}/>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='sales'>Sales</label>
                                <input onClick={removeFormSubmitted} type='number' id='sales' ref={sales}/>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='thumbnail'>Thumbnail</label>
                                <input onClick={removeFormSubmitted} type='text' id='thumbnail' ref={thumbnail}/>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='publishedYear'>Published Year</label>
                                <input onClick={removeFormSubmitted} type='number' id='publishedYear' ref={publishedYear}/>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='numberOfPages'>Number Of Pages</label>
                                <input onClick={removeFormSubmitted} type='number' id='numberOfPages' ref={numberOfPages}/>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='authors'>Authors</label>
                                <input onClick={removeFormSubmitted} type='text' id='authors' ref={authors}/>
                            </div>
                            <div className={classes.control}>
                                <label htmlFor='genres'>Genres</label>
                                <input onClick={removeFormSubmitted} type='text' id='genres' ref={genres}/>
                            </div>
                            <button className={classes.button}>Confirm</button>
                        </form>
                        {errorMsg && <p>Make sure fields are not empty!</p>}
                        {formSubmitted && <p>{text}</p>}
                    </div>
                </div>
            </Card>
        </section>
    );
}

export default AddBookAdmin;