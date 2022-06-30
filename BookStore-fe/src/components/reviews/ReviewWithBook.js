import classes from './Review.module.css'
import {Rating} from "react-simple-star-rating";

const Review = (props) => {
    return (
        <li className={classes.review}>
            <div>
                <h3>{props.book}</h3>
                <Rating  readonly={true} ratingValue={props.rating}/>
                <div className={classes.description}>{props.description}</div>
            </div>
        </li>
    );
}

export default Review;