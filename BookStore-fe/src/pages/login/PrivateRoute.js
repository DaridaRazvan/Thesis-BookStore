import React, {useContext, useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import CartContext from "../../store/cart-context";

const PrivateRoute = () => {
    const cartCtx = useContext(CartContext);

    
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem("cart"));
        if(cartData === null)
            return;
        cartCtx.addAllItems(cartData);    
    },[]);
    
    const token = localStorage.getItem("token");
    return token != null ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;