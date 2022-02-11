import React, { useEffect, useState, useReducer } from "react";

import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { cartReducer } from "../scripts/reducer";
import { getAPIUrl } from "../scripts/urls";
import UserContext from "../components/context/userContext";
import HandlerContext from "../components/context/handlerContext";
import Layout from "../components/layout";
import '../styles/globals.css';

function MyApp(props: any){

  const API_URL = getAPIUrl();
  const link = new HttpLink({ uri: `${API_URL}/graphql` })
  const cache = new InMemoryCache()
  const client = new ApolloClient({link,cache});

  const initialState = {
    zipCode: "00901",
    user: null,
    isAuthenticated: false
  }

  const [state, setState] = useState(initialState);

  const initialCart = {
    items: [], 
    total: 0,
  };

  const [statefulCart, setStatefulCart] = useState(initialCart);

  const add = ({cart, item, count}) => {
    if (cart.items.filter(x => x.id === item.id).length > 0) {
      cart.items.filter(x => x.id === item.id)[0].quantity += count;
    } else {
      cart.items.push({...item, quantity: count})
    }
    setStatefulCart(cart);
    return true;
  };
  const remove = ({cart, item}) => {
    if (cart.items.filter(x => x.id === item.id)[0].quantity === 1) {
      const newItems = this.items.filter(x => x.id !== item.id)
      cart.items = newItems;
    } else {
      cart.items.filter(x => x.id)[0].quantity -= 1;
    }
    setStatefulCart(cart);
    return true;
  };
  const removeAll = ({cart, item}) => {
    const newItems = cart.items.filter(x => x.id !== item.id);
    cart.items = newItems;
    setStatefulCart(cart);
    return true;
  }
  //const [cart, dispatchCart] = useReducer(cartReducer, initialCart);
  //const getCart = () => cart;

  const { Component, pageProps: {session, ...pageProps} } = props;

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const tempState = { ...state };
      let stateChanged = false;
      if (window.localStorage.getItem("instacart_user") && !tempState.user) {
        tempState.user = JSON.parse(window.localStorage.getItem("instacart_user"));
        stateChanged = true;
      }
      if (window.localStorage.getItem("instacart_zipCode") && !tempState.zipCode) {
        tempState.zipCode = window.localStorage.getItem("instacart_zipCode");
        stateChanged = true;
      }
      if (window.localStorage.getItem("instacart_auth_token") && !tempState.isAuthenticated) {
        tempState.isAuthenticated = true;
        stateChanged = true;
      }
      if (stateChanged) {
        setState(tempState);
      }
    }
  }, [])

  const handleSetUser = (user: any) => {
    const tempState = { ...state, user};
    tempState.isAuthenticated = true;
    setState(tempState);
  };

  const handleSetZip = (str: string) => {
    const tempState = {...state, zipCode: str};
    window.localStorage.set("zipCode", str);
    setState(tempState);
  }

  return (
    <SessionProvider session={session}>
          <UserContext.Provider value={{ 
            user: state.user, 
            isAuthenticated: state.isAuthenticated, 
            handleSetUser,
            zipCode: state.zipCode,
            handleSetZip,
            API_URL,
            cart: initialCart,
            statefulCart,
            add,
            remove,
            removeAll
          }}>
            <ApolloProvider client={client}>
              <Layout>
                  <Component {...pageProps} />
              </Layout>
              <ToastContainer />
            </ApolloProvider>
          </UserContext.Provider>
    </SessionProvider>
  );
  
}


export default MyApp;
