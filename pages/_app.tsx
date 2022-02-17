import React, { useEffect, useState } from "react";

import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify";
import { ApolloProvider, 
  ApolloClient, 
  HttpLink, 
  InMemoryCache } from '@apollo/client';
import Cookie from "js-cookie";

import { getAPIUrl } from "../scripts/urls";
import UserContext from "../components/context/userContext";
import Layout from "../components/layout";
import '../styles/globals.css';

function MyApp(props: any){

  const initialState = {
    zipCode: "00901",
    user: null,
    isAuthenticated: false
  }

  const [state, setState] = useState(initialState);

  let initialCart = {
    items: [], 
    total: 0,
  };

  const [cart, setCart] = useState(initialCart);
  const handleSetCart = ({cart}) => {
    setCart(cart);
  };
  const updateTotal = ({cart, count, price}) => {
    cart.total += price * count;
  }

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
        tempState.user.token = window.localStorage.getItem("instacart_auth_token");
      }
      if (stateChanged) {
        setState(tempState);
      }
    }
  }, [])

  const handleSetUser = (user: any, token: any) => {
    const tempState = { ...state, user};
    tempState.isAuthenticated = user ? true : null;
    if (user) { tempState.user.token = token; }
    setState(tempState);
  };

  const handleSetZip = (str: string) => {
    const tempState = {...state, zipCode: str};
    window.localStorage.set("zipCode", str);
    setState(tempState);
  }

  const API_URL = getAPIUrl();
  const link = new HttpLink({ uri: `${API_URL}/graphql` })
  const cache = new InMemoryCache()
  const headers = state.isAuthenticated ? {authorization: `bearer ${Cookie.get("token")}`} : null;
  const client = new ApolloClient({link,cache, headers});
  return (
    <SessionProvider session={session}>
          <UserContext.Provider value={{ 
            user: state.user, 
            isAuthenticated: state.isAuthenticated, 
            handleSetUser,
            zipCode: state.zipCode,
            handleSetZip,
            API_URL,
            cart,
            handleSetCart,
            updateTotal,
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
