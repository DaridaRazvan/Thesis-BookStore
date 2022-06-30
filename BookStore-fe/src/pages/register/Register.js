import classes from './Register.module.css'
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";


const isEmpty = (value) => value.trim() === '';
const isLongerThanSeven = (value) => value.trim().length > 3;
const validPostalCode = (value) => value.trim().length === 6;
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Register = () => {
    const navigate = useNavigate();
    const [formInputsValidity,setFormInputsValidity] = useState({
        name:true,
        surname:true,
        password:true,
        email:true,
        address:true,
        postalCode:true
    });

    const [userCreated, setUserCreated] = useState(false);
    const [responseMessage,setResponseMessage]= useState("");

    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const emailInputRef = useRef();
    const addressInputRef = useRef();
    const postalCodeInputRef = useRef();

    const confirmHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredSurname = surnameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredSurnameIsValid = !isEmpty(enteredSurname);
        const enteredPasswordIsValid = isLongerThanSeven(enteredPassword) && isLongerThanSeven(enteredConfirmPassword)
            && enteredPassword === enteredConfirmPassword;
        const enteredEmailIsValid = validateEmail(enteredEmail);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPostalCodeIsValid = validPostalCode(enteredPostalCode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            surname: enteredSurnameIsValid,
            password: enteredPasswordIsValid,
            email: enteredEmailIsValid,
            address: enteredAddressIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        const formIsValid = enteredNameIsValid && enteredSurnameIsValid && enteredPasswordIsValid
            && enteredEmailIsValid && enteredAddressIsValid && enteredPostalCodeIsValid;

        if (!formIsValid) {
            return;
        }

        //fetch data;
        const response = await fetch('http://127.0.0.1:5000/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: enteredName,
                surname: enteredSurname,
                password: enteredPassword,
                email: enteredEmail,
                adress: enteredAddress,
                postalCode: enteredPostalCode,
                isAdmin: false
            })
        });
        const responseData = await response.json();
        setResponseMessage(responseData.message);
        setUserCreated(true);
    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name? '': classes.invalid}`;
    const surnameControlClasses = `${classes.control} ${formInputsValidity.surname? '': classes.invalid}`;
    const passwordControlClasses = `${classes.control} ${formInputsValidity.password? '': classes.invalid}`;
    const emailControlClasses = `${classes.control} ${formInputsValidity.email? '': classes.invalid}`;
    const addressControlClasses = `${classes.control} ${formInputsValidity.address? '': classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode? '': classes.invalid}`;

    const responseMessageClasses = `${responseMessage === "Email already used!"? classes.failedToCreateUser : classes.userCreated}`;

    const redirectLogin = () => {
            navigate('/login');
    }

    return (
        <form className={classes.register} onSubmit={confirmHandler}>
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
            <div className={passwordControlClasses}>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref={passwordInputRef}/>
                {!formInputsValidity.password && <p>Passwords don't match!</p>}
            </div>
            <div className={passwordControlClasses}>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type='password' id='confirmPassword' ref={confirmPasswordInputRef}/>
                {!formInputsValidity.password && <p>Passwords don't match!</p>}
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
            {userCreated && <p className={responseMessageClasses}> {responseMessage} </p>}
            <div className={classes.space}>
                <button onClick={redirectLogin}>Back</button>
                <button>Register</button>
            </div>
        </form>
    );
}

export default Register;