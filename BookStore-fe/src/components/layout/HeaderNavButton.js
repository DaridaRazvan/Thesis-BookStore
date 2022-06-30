import classes from './HeaderNavButton.module.css';
import navButton from '../../assets/navButton.png';

const HeaderNavButton = (props) => {

    return(
        <button className={classes.button} onClick={props.navPressed}>
      <span className={classes.img}>
        <img src={navButton} width="25" height="25" alt=''/>
      </span>
        </button>
    );
}

export default HeaderNavButton;