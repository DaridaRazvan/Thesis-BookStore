import {useState, useRef, useContext} from "react";
import {Rating} from "react-simple-star-rating";
import AuthContext from "../../store/auth-context";
import classes from './AddReview.module.css';

const AddReview = (props) => {
    const loginCtx = useContext(AuthContext);

    const [show,setShow] = useState(false);
    const [rating, setRating] = useState(0);

    const descriptionInputRef = useRef();

    const changeHandler = () => {
        setShow(!show);
    }

    const handleRating = (rate) =>{
        setRating(rate);
    }

    const sendReview = async (event) => {
        event.preventDefault();

        const enteredDescription = descriptionInputRef.current.value;

        console.log(rating,enteredDescription);
        const response = await fetch('http://127.0.0.1:5000/reviews/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookId: props.id,
                userId: loginCtx.userId,
                userName:loginCtx.name + " " + loginCtx.surname,
                rating:rating,
                description: enteredDescription
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        changeHandler();
        props.update();
    }

    let addReview;
    if(!show){
        addReview = <div className={classes.review}>
            {!show && <button onClick={changeHandler}>Add Review</button>} </div>
    }else{
        addReview =
            <form className={classes.review} onSubmit={sendReview}>
                <label>Rating:</label>
                <Rating onClick={handleRating} readonly={false} ratingValue={rating}/>
                <div>
                    <textarea ref={descriptionInputRef}/>
                </div>
                <div>
                    <button onClick={changeHandler}>Back</button>
                    <button>Add Review</button>
                </div>
            </form>
    }


    return(
        <section>
            {addReview}
        </section>
    );
}

export default AddReview;