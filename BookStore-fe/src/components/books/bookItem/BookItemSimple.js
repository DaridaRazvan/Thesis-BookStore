import classes from './BookItem.module.css';
import React from 'react';
import {useNavigate} from "react-router-dom";

const BookItemSimple = (props) => {
    const navigate = useNavigate();

    const showBook = () => {
        let path = `/book/${props.id}`;
        navigate(path);
    }
    return (
        <li className={classes.book}>
            <div className={classes.divBook} onClick={showBook}>
                <div>
                    <img className={classes.pic} src={props.thumbnail} alt={"Pic"}/>
                </div>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.author}>{props.author}</div>
                </div>
            </div>
        </li>
    );
};

export default BookItemSimple;