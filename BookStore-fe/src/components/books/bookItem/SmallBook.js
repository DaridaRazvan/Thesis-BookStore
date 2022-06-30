import {useNavigate} from "react-router-dom";
import classes from './SmallBook.module.css'

const SmallBook = (props) => {
    const price = `${props.price.toFixed(2)} lei`;
    const navigate = useNavigate();

    const showBook = (props) => {
        let path = `/book/${props.id}`;
        navigate(path);
    }

    return(
        <li className={classes.book}>
            <div className={classes.flex}>
                <img className={classes.pic} src={props.thumbnail} alt={"Pic"}/>
                <div className={classes.right}>
                    <h4>{props.name}</h4>
                    <p className={classes.author}>{props.author}</p>
                    <p className={classes.price}>{price}</p>
                </div>
            </div>
        </li>
    )
}

export default SmallBook;