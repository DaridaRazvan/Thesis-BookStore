import React from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    token: '',
    userId: null,
    name: '',
    surname: '',
    isAdmin: false,
    logInError: false,
    onLogin: (email,password) => {},
    onLogout:() => {},
    setLogInError: () => {},
});

export default AuthContext;