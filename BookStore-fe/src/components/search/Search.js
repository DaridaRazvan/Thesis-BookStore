import classes from './Search.module.css';
import {useRef} from "react";
import {useNavigate} from "react-router-dom";


const isEmpty = (value) => value.trim() === '';

const Search = () => {
    const navigate = useNavigate();
    const searchInputRef = useRef();

    const searchHandler = (event) => {
        event.preventDefault();

        const enteredText = searchInputRef.current.value;

        const enteredTextIsValid = !isEmpty(enteredText);

        if(!enteredTextIsValid){
            return;
        }

        console.log(enteredText);
        const path = `/searchResults/${enteredText}/1`;
        console.log(path);
        navigate(path);
    }

    return(
        <div className={classes.search}>
            <form onSubmit={searchHandler}>
                <input placeholder='search' type='text' id='name' ref={searchInputRef}/>
                <button>Search</button>
            </form>
        </div>
    );
}

export default Search;