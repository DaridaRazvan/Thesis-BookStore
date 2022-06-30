import classes from "./Admin.module.css";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

const AdminLeftNav = () => {
    const authCtx = useContext(AuthContext);

    const logOutUser = () => {
        authCtx.onLogout();
    }

    return (
        <div className = {classes.left}>
            <h1>Admin Page</h1>
            <li><NavLink to="/admin/addAuthor">Add Author</NavLink></li>
            <li><NavLink to="/admin/addGenre">Add Genre</NavLink></li>
            <li><NavLink to="/admin/addBook">Add Book</NavLink></li>
            <li><NavLink to="/admin/removeBook">Remove Book</NavLink></li>
            <li><NavLink to="/admin/removeComment">Remove Review</NavLink></li>
            <li><button className={classes.button} onClick={logOutUser}>Log out</button></li>
        </div>
    );
}

export default AdminLeftNav;