import AuthContext from './auth-context'
import React, { useEffect, useState} from "react";

const defaultAuthState = {
    isAuthenticated: false,
    token: '',
    userId: null,
    name: '',
    surname: '',
    isAdmin: false,
    logInError: false
}

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(defaultAuthState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin');
        const userId = localStorage.getItem('userId');
        const name = localStorage.getItem('name');
        const surname = localStorage.getItem('surname');

        if(token == null)
            return;

        setIsLoggedIn({
            isAuthenticated: true,
            token: token,
            userId: userId,
            name: name,
            surname: surname,
            isAdmin: isAdmin === "true",
            logInError: false
        });

    }, []);


    const loginHandler = async (email, password) => {
        const fetchLogIn = async () =>{
            const response = await fetch('http://127.0.0.1:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            setIsLoggedIn({
                isAuthenticated: true,
                token: responseData.access,
                userId: responseData.userId,
                name: responseData.name,
                surname: responseData.surname,
                isAdmin: responseData.isAdmin,
                logInError: false
            });

            localStorage.setItem("token",responseData.access);
            localStorage.setItem("isAdmin",responseData.isAdmin);
            localStorage.setItem("userId",responseData.userId);
            localStorage.setItem("name",responseData.name);
            localStorage.setItem("surname",responseData.surname);
        }

        fetchLogIn().catch((error)=>{
            setIsLoggedIn({...isLoggedIn,logInError: true});
        });
    };

    const logoutHandler = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("surname");

        setIsLoggedIn({
            isAuthenticated: false,
            token: '',
            userId: -1,
            name: '',
            surname: '',
            isAdmin: false,
            logInError: false
        });
    };

    const setNoLogInError = () => {
        setIsLoggedIn({...isLoggedIn,logInError: false});
    }

    const authContext = {
        isAuthenticated: isLoggedIn.isAuthenticated,
        token: isLoggedIn.token,
        userId: isLoggedIn.userId,
        name: isLoggedIn.name,
        surname: isLoggedIn.surname,
        isAdmin: isLoggedIn.isAdmin,
        logInError: isLoggedIn.logInError,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        setLogInError: setNoLogInError
    };

    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthProvider;