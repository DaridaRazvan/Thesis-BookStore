import classes from './BookItemAdmin.module.css';
import React from 'react';

const BookItemAdmin = (props) => {

    const deleteBook = async () => {
        const response = await fetch(`http://127.0.0.1:5000/books/delete/${props.id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        console.log(responseData);
    }

    const removeBook = () => {
        deleteBook().then(r =>{
            props.refresh();
        })
    }

    return (
        <li className={classes.book}>
            <div className={classes.bookDiv}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.author}>{props.author}</div>
                </div>
                <button className={classes.removeButton} onClick={removeBook}>Remove Book</button>
            </div>
        </li>
    );
};

export default BookItemAdmin;