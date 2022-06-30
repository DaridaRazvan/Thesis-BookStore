import classes from './Navbar.module.css';
import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

const Navbar = () => {
    const loginCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const logOutHandler = () => {
        loginCtx.onLogout();
        navigate('/login');
    }

    return(
        <div className={classes.navbar}>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/searchResults/1">Shop</NavLink></li>
                <li><NavLink to="/reviews">Reviews</NavLink></li>
                <li><NavLink to="/recommendations">Recommendations</NavLink></li>
                <li><NavLink to="/account">Account</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li className={classes.logButton}><button onClick={logOutHandler}>Log out</button></li>
            </ul>
        </div>
    );
};

export default Navbar;