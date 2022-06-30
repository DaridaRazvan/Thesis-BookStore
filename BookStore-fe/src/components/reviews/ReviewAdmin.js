import classes from "./ReviewAdmin.module.css";

const ReviewAdmin = (props) => {

    const verifyReview = async () => {
        const response = await fetch(`http://127.0.0.1:5000/reviews/verify/${props.id}`)

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        console.log(responseData);

        props.refresh();
    }

    const deleteReview = async () => {
        const response = await fetch(`http://127.0.0.1:5000/reviews/delete/${props.id}`, {
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

        props.refresh();
    }

    return(
        <li className={classes.review}>
            <div className = {classes.reviewDiv}>
                <div>
                    <h3>{props.userName}</h3>
                    <div className={classes.description}>{props.description}</div>
                </div>
                <div>
                    <button className={classes.button} onClick={verifyReview}>Verify</button>
                    <button className={classes.button} onClick={deleteReview}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default ReviewAdmin;