import {Fragment, useState} from "react";
import booksHeader from '../../assets/booksHeader.jpg'
import classes from './Header.module.css'
//import ReactDOM from 'react-dom';
import HeaderCartButton from "./HeaderCartButton";
import HeaderNavButton from "./HeaderNavButton";
import Navbar from "./Navbar";
import Search from "../search/Search";
import {useNavigate} from "react-router-dom";
import Menu from "./Menu";

// const portalElement = document.getElementById('navbar');

const Header = (props) => {
    const [navButtonIsPressed,setNavButtonIsPressed] = useState(false);
    const navigate = useNavigate();


    const navHandler = () => {
        setNavButtonIsPressed(!navButtonIsPressed);
    };


    const navigateHome = () => {
            navigate('/');
    }

    return (
    <Fragment>
        {/*{navButtonIsPressed && ReactDOM.createPortal(<Navbar/>,portalElement)}*/}
        {navButtonIsPressed && <Navbar/>}
        <header className={classes.header}>
            <div className={classes.nav}>
                <HeaderNavButton navPressed={navHandler}/>
                <h1 className={classes.title} onClick={navigateHome}>Books</h1>
            </div>
            <Search/>
            <HeaderCartButton onCLick={props.onShowCart}/>
        </header>
        <header className={classes.header2}>
            <Menu/>
        </header>
        {props.showPicture &&
        <div className={classes['main-image']}>
            <img src={booksHeader} alt="Books"/>
        </div> }
    </Fragment>
    )
};

export default Header;