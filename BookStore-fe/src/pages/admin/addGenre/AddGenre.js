import React, {useRef, useState} from "react";
import classes from "../Admin.module.css";
import Card from "../../../components/ui/Card";
import AdminLeftNav from "../AdminLeftNav";

const isEmpty = (value) => value.trim() === '';

const AddGenre = () => {
    const genreName = useRef();
    const [text,setText] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const addGenre = async (genreName) => {
        const response = await fetch(`http://127.0.0.1:5000/genres/add`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: genreName
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
        const enteredGenre = genreName.current.value;

        if(isEmpty(enteredGenre))
            return

        addGenre(enteredGenre).then(r => {
            setText(r.message);
            setFormSubmitted(true);
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
                                <label htmlFor='genre'>Genre</label>
                                <input onClick={removeFormSubmitted} type='text' id='genre' ref={genreName}/>
                            </div>
                            <button className={classes.button}>Confirm</button>
                        </form>
                        {formSubmitted && <p>{text}</p>}
                    </div>
                </div>
            </Card>
        </section>
    );
}

export default AddGenre;