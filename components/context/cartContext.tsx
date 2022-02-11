import React from "react";

// set backup default for isAuthenticated if none is provided in Provider
const CartContext = React.createContext(
    {   cart: { items:[], total: 0 },
        handleSetCart: (newCart: any) => {},
        drawerOpen: null,
        openDrawer: () => {},
        closeDrawer: () => {},
        handleSetDrawer: (str: string) => {}
    });

export default CartContext;