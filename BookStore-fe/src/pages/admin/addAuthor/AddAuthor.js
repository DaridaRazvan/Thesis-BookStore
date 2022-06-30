import classes from "../Admin.module.css";
import Card from "../../../components/ui/Card";
import AdminLeftNav from "../AdminLeftNav";
import React, {useRef, useState} from "react";

const isEmpty = (value) => value.trim() === '';

const AddAuthor = () => {
    const authorName = useRef();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const addAuthor = async (authorName) => {
        const response = await fetch(`http://127.0.0.1:5000/authors/add`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: authorName
            })
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        console.log(responseData);
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        //code
        const enteredAuthor = authorName.current.value;

        if(isEmpty(enteredAuthor))
            return;
        //alert("Author "+ enteredAuthor+ " added!");

        setFormSubmitted(true);
        addAuthor(enteredAuthor).catch((error) => {
            console.log(error)
        })

    }

    const removeFormSubmitted = () => {
        setFormSubmitted(false);
    }

    return(
        <section className = {classes.admin}>
            <Card>
                <div className = {classes.position}>
                    <AdminLeftNav/>
                    <div className = {classes.right}>
                        <form onSubmit={confirmHandler}>
                            <div className={classes.control}>
                                <label htmlFor='author'>Author</label>
                                <input onClick={removeFormSubmitted} type='text' id='author' ref={authorName}/>
                            </div>
                            <button className={classes.button}>Confirm</button>
                        </form>
                        {formSubmitted && <p>Author added successfully!</p>}
                    </div>
                </div>
            </Card>
        </section>
    );
}

export default AddAuthor;
