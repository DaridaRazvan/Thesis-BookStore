import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    addOneItem: (item) => {},
    addAllItems: (items) => {},
    removeItem: (id) => {},
    removeAll: () => {}
});

export default CartContext;