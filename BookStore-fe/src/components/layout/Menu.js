import classes from './Menu.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import {Fragment} from 'react';

const Menu = () => {
    const navigate = useNavigate();

    const moveToTopBooks = () => {
        navigate("/searchResults/topBooks");
    }

    const moveToWishlist = () => {
        navigate("/wishlist");
    }

    const moveToRecommendations = () => {
        navigate("/recommendations");
    }

    return(
        <Fragment>
            <div className={classes.dropdown}>
                <button className={classes.dropButton}>Books</button>
                <div className={classes.content}>
                    <NavLink to="/searchResults/genre/Biography/1">Biography</NavLink>
                    <NavLink to="/searchResults/genre/Authors/1">Foreign Authors</NavLink>
                    <NavLink to="/searchResults/genre/Science/1">Science</NavLink>
                    <NavLink to="/searchResults/genre/Fiction/1">Fiction</NavLink>
                    <NavLink to="/searchResults/genre/Literature/1">Literature</NavLink>
                    <NavLink to="/searchResults/genre/Sport/1">Sport</NavLink>
                    <NavLink to="/searchResults/genre/Graphic Novel/1">Graphic Novels</NavLink>
                    <NavLink to="/searchResults/genre/Poetry/1">Poetry</NavLink>
                    <NavLink to="/searchResults/genre/Mystery/1">Detective/Mystery</NavLink>
                </div>
            </div>
            <div className={classes.dropdown}>
                <button className={classes.dropButton} onClick={moveToTopBooks}>Top Books</button>
            </div>
            <div className={classes.dropdown}>
                <button className={classes.dropButton} onClick={moveToWishlist}>Wishlist</button>
            </div>
            <div className={classes.dropdown}>
                <button className={classes.dropButton} onClick={moveToRecommendations}>Recommendations</button>
            </div>
        </Fragment>
    )
}

export default Menu;