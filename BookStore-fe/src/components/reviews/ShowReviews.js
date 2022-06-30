import classes from './ShowReviews.module.css'
import Review from "./Review";

const ShowReviews = (props) => {

    const reviewsList = props.reviews.map(review =>
        <Review key={review.id}  id={review.id} name={review.name} rating={review.rating} description={review.description} />);

    return (
        <section className={classes.reviews}>
        <ul>
            {reviewsList}
        </ul>
        </section>
    );
}

export default ShowReviews;