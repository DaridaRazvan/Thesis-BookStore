import classes from './Login.module.css'
import React, {useContext, useRef, useState, Fragment} from "react";
import AuthContext from "../../store/auth-context";
import {Navigate, useNavigate} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const isLongerThanSixDigits = (value) => value.trim().length > 3;
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Login = () => {
    const navigate = useNavigate();
    const loginCtx = useContext(AuthContext);

    const [formInputsValidity,setFormInputsValidity] = useState({
        email:true,
        password:true,
        captcha: true
    });

    const [validCaptcha, setValidCaptcha] = useState(true);
    const [captchaBox, setCaptchaBox] = useState(false);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        if(!captchaBox) {
            setValidCaptcha(false);
            return;
        }

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const enteredEmailIsValid = validateEmail(enteredEmail);
        const enteredPasswordIsValid = isLongerThanSixDigits(enteredPassword);

        setFormInputsValidity({
            email:enteredEmailIsValid,
            password:enteredPasswordIsValid,
        });

        const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

        if(!formIsValid){
            return;
        }

        loginCtx.onLogin(enteredEmail,enteredPassword);
    };

    const passwordControlClasses = `${classes.control} ${formInputsValidity.email ? '': classes.invalid}`;
    const emailControlClasses = `${classes.control} ${formInputsValidity.password ? '': classes.invalid}`;

    const setErrorFalse = () => {
        loginCtx.setLogInError();
    }

    const redirectRegister = () => {
        navigate('/register')
    }

    return(
        <Fragment>
            {loginCtx.isAuthenticated  && <Navigate to="/" />}
            {loginCtx.isAdmin  && <Navigate to="/admin" />}
            <form className={classes.form} onSubmit={confirmHandler}>
                <div className={passwordControlClasses}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' ref={emailInputRef} onClick={setErrorFalse}/>
                    {!formInputsValidity.email && <p>Please enter a valid email!</p>}
                </div>
                <div className={emailControlClasses}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={passwordInputRef} onClick={setErrorFalse}/>
                    {!formInputsValidity.password && <p>Please enter a valid password!</p>}
                </div>
                <div align='center'>
                    <ReCAPTCHA
                        sitekey="6LdH5KUfAAAAAEKXlGh18qAoR7KjUYwnRx8mcqv-"
                        onChange={() => setCaptchaBox(true)}
                    />
                </div>
                {!validCaptcha && <p>Please check the Captcha!</p>}
                {loginCtx.logInError && <p>Invalid log in Data. Please try again!</p>}
                <div className={classes.actions}>
                    <button type='button' onClick={redirectRegister}>
                        Create Account
                    </button>
                    <button className={classes.submit}>Confirm</button>
                </div>
            </form>
        </Fragment>
    );
}

export default Login;