import classes from './Account.module.css';
import {useState, Fragment, useEffect, useContext, useRef} from "react";
import Cart from "../../components/cart/Cart";
import Header from "../../components/layout/Header";
import Card from "../../components/ui/Card";
import AccountLeftNav from "./AccountLeftNav";
import AuthContext from "../../store/auth-context";

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Account = () => {
    const authCtx = useContext(AuthContext);
    const [text,setText] = useState("");
    const [cartIsShown, setCartIsShown] = useState(false);
    const [formInputsValidity,setFormInputsValidity] = useState({
        name:true,
        surname:true,
        email:true,
        address:true,
        postalCode:true
    });

    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const emailInputRef = useRef();
    const addressInputRef = useRef();
    const postalCodeInputRef = useRef();

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    const getUserData = async () => {
        const response = await fetch(`http://127.0.0.1:5000/users/get/${authCtx.userId}`);
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        return await response.json();
    }

    const updateData = async (name,surname,email,postalCode,address) => {
        const response = await fetch('http://127.0.0.1:5000/users/update',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: authCtx.userId,
                name: name,
                surname: surname,
                email: email,
                postalCode: postalCode,
                address: address
            })
        });
        return await response.json();
    }

    useEffect(() => {
        getUserData().then(response => {
            console.log(response);
            nameInputRef.current.value = response.name;
            surnameInputRef.current.value  = response.surname;
            emailInputRef.current.value  = response.email;
            addressInputRef.current.value  = response.address;
            postalCodeInputRef.current.value  = response.postalCode;
        }).catch(error => console.log(error));
    },[])


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredSurname = surnameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;

        console.log(enteredName);

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredSurnameIsValid = !isEmpty(enteredSurname);
        const enteredEmailIsValid = validateEmail(enteredEmail);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);

        setFormInputsValidity({
            name:enteredNameIsValid,
            surname:enteredSurnameIsValid,
            email:enteredEmailIsValid,
            address:enteredAddressIsValid,
            postalCode:enteredPostalCodeIsValid
        });

        const formIsValid = enteredNameIsValid && enteredSurnameIsValid && enteredEmailIsValid
            && enteredAddressIsValid && enteredPostalCodeIsValid;

        if(!formIsValid){
            return;
        }

        //fetch
        updateData(enteredName,enteredSurname,enteredEmail,enteredPostalCode,enteredAddress).then(r =>
            setText(r.message)
        );
    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name? '': classes.invalid}`;
    const surnameControlClasses = `${classes.control} ${formInputsValidity.surname? '': classes.invalid}`;
    const emailControlClasses = `${classes.control} ${formInputsValidity.email? '': classes.invalid}`;
    const addressControlClasses = `${classes.control} ${formInputsValidity.address? '': classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode? '': classes.invalid}`;

    return(
        <Fragment>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler} showPicture={false}/>

            <section className = {classes.account}>
                <Card>
                    <div className = {classes.position}>
                        <AccountLeftNav/>
                        <div className = {classes.right}>

                        <form onSubmit={confirmHandler}>
                            <div className={nameControlClasses}>
                                <label htmlFor='name'>Name</label>
                                <input type='text' id='name' ref={nameInputRef}/>
                                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
                            </div>
                            <div className={surnameControlClasses}>
                                <label htmlFor='surname'>Surname</label>
                                <input type='text' id='surname' ref={surnameInputRef}/>
                                {!formInputsValidity.surname && <p>Please enter a valid surname!</p>}
                            </div>
                            <div className={emailControlClasses}>
                                <label htmlFor='email'>Email</label>
                                <input type='text' id='email' ref={emailInputRef}/>
                                {!formInputsValidity.email && <p>Please enter a valid email!</p>}
                            </div>
                            <div className={addressControlClasses}>
                                <label htmlFor='address'>Address</label>
                                <input type='text' id='address' ref={addressInputRef}/>
                                {!formInputsValidity.address && <p>Please enter a valid address!</p>}
                            </div>
                            <div className={postalCodeControlClasses}>
                                <label htmlFor='postalCode'>Postal Code</label>
                                <input type='text' id='postalCode' ref={postalCodeInputRef}/>
                                {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
                            </div>
                            <p className={classes.success}>{text}</p>
                            <div className={classes.space}>
                                <button>Change Data</button>
                            </div>
                        </form>

                        </div>
                    </div>
                </Card>
            </section>
        </Fragment>

    );
}

export default Account;