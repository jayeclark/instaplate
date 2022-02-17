import { useEffect } from "react";

import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

import { getAPIUrl } from "../scripts/urls";

//register a new user
export const registerUser = (username:string, email:string, password:string) => {
  const API_URL = getAPIUrl();
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);
        window.localStorage.setItem("instacart_auth_token", res.data.jwt);
        window.localStorage.setItem("instacart_user", JSON.stringify(res.data.user))

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurant selection
        Router.push("/");
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const login = (username: string, password:string, currentPage:string) => {

  const API_URL = getAPIUrl();
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { username, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookie.set("token", res.data.jwt);

        window.localStorage.setItem("instacart_auth_token", res.data.jwt);
        window.localStorage.setItem("instacart_user", JSON.stringify(res.data.user))

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurant selection
        Router.push(currentPage);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = (currentPage) => {
  //remove token and user cookie
  Cookie.remove("token");

  // sync logout between multiple windows
  window.localStorage.setItem("logout", Date.now().toString());
  window.localStorage.removeItem("instacart_user");
  window.localStorage.removeItem("instacart_auth_token");

  //redirect to the home page
  Router.push(currentPage);
};

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
