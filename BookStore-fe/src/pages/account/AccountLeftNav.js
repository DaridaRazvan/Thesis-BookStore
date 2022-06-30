import classes from "./Account.module.css";
import {NavLink} from "react-router-dom";


const AccountLeftNav = () => {
    return (
        <div className = {classes.left}>
            <h1>Account</h1>
            <li><NavLink to="/account">Change Data</NavLink></li>
        </div>
    );
}

export default AccountLeftNav;