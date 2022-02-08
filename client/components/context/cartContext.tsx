import React from "react";

// set backup default for isAuthenticated if none is provided in Provider
const CartContext = React.createContext(
    {   cart: { items:[], total:0 }
    });

export default CartContext;