import React from "react";

const recallUser = () => {
    if (typeof window !== 'undefined' && window.localStorage.getItem("instacart_user")) {
        return JSON.parse(window.localStorage.getItem("instacart_user"));
    }
    return null;
}

const recallAuth = () => {
    if 
    (typeof window !== 'undefined' && window.localStorage.getItem("instacart_auth_token")) {
        return window.localStorage.getItem("instacart_auth_token") === "true"
    }
    return false;
}

const recallZip = () => {
    if 
    (typeof window !== 'undefined' && window.localStorage.getItem("instacart_zipCode")) {
        return window.localStorage.getItem("instacart_zipCode")
    }
    return "00901";
};

// set backup default for isAuthenticated if none is provided in Provider
const UserContext = React.createContext(
    {   user: recallUser(), 
        isAuthenticated: recallAuth(), 
        handleSetUser: (user: any, token: any) => {},
        zipCode: recallZip(),
        handleSetZip: (str: string) => {},
        API_URL: null,
        cart: null,
        handleSetCart: (cart: any) => {},
        updateTotal: ({cart, count, price}) => {}
    });

export default UserContext;