import React, { useState, useEffect, useContext } from "react";

import {
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { ErrorObject } from "../../types";
import { login } from "../auth";
import UserContext from "../context/userContext";
import Icons from "../UI/icons";
import styles from "../../styles/Dialog.module.css";

function Login(props: any) {

  const nullError: ErrorObject = {};
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(nullError);

  const { isAuthenticated, user, handleSetUser } = useContext(UserContext);

  const { handleCloseDrawer, handleToggle } = props;

  const router = useRouter();
  const currentPage = router.pathname;

  useEffect(() => {
    if (isAuthenticated && user) {
      handleCloseDrawer();
    }
  }, []);

  const { plusIcon } = Icons;

  function onChange(event: any) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <div className={styles["login-drawer"]}>
      <div className={styles["login-container"]}>
        <div className={styles["close-modal"]} onClick={handleCloseDrawer}>
          <div className={styles["rotate-icon"]}>
            {plusIcon}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Log in</h1>
          </div>
          <section className={styles.wrapper}>
            {Object.entries(error).length !== 0 &&
              error.constructor === Object &&
              error.message.map((err: any) => {
                return (
                  <div
                    key={err.messages[0].id}
                    style={{ marginBottom: 10 }}
                  >
                    <small style={{ color: "red" }}>
                      {err.messages[0].message}
                    </small>
                  </div>
                );
              })}
              <Link href="/api/auth/signin">
                  <button
                    className={styles.btn}
                    style={{
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                      color: '#666'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                  >
                    Log in with <img height="20px" src="/images/google.png"/>
                  </button>
              </Link>
            <Form>
              <fieldset disabled={loading}>
                <FormGroup>
                  <Input
                    placeholder="Email"
                    onChange={(event) => onChange(event)}
                    name="identifier"
                    className={styles["dialog-input"]}
                />
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder="Password"
                    onChange={(event) => onChange(event)}
                    type="password"
                    name="password"
                    className={styles["dialog-input"]}
                  />
                </FormGroup>
                <div style={{marginTop: "12px"}}>Forgot password?&nbsp;
                  <Link href="/">
                    <span style={{ fontWeight: "bold", color: "rgb(10, 173, 10)", textDecoration: "none" }}>
                      Reset it
                    </span>
                  </Link>&nbsp;or&nbsp;
                  <Link href="/">
                    <span style={{ fontWeight: "bold", color: "rgb(10, 173, 10)", textDecoration: "none" }}>
                      email me a login link
                    </span>
                  </Link></div>
                <FormGroup>
                  <button
                    className={styles.btn}
                    onClick={(e) => {
                      e.preventDefault();
                      setLoading(true);
                      login(data.identifier, data.password, currentPage)
                        .then((res: any) => {
                          setLoading(false);

                          // set authed User in global context to update header/app state
                          handleSetUser(res.data.user, res.data.jwt);
                          window.localStorage.setItem("instacart_user", res.data.user);
                        })
                        .catch((error) => {
                          //setError(error.response.data);
                          setLoading(false);
                        });
                    }}
                  >
                    {loading ? "Loading... " : "Log In"}
                  </button>
                </FormGroup>
              </fieldset>
            </Form>
          </section>
          <div className={styles["login-footer"]}>
            <div style={{marginBottom: "12px"}}>Don't have an account?</div>
            <a 
              onClick={handleToggle}
              className={styles["nav-link"]} 
              style={{ cursor: "pointer", textDecoration: "none", color: "rgb(10, 173, 10)!important", fontSize: "1.1rem", marginTop: "15px", paddingTop: "15px"}}>
                Sign Up
            </a>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          h1 {
            font-weight: 700;
          }
          .notification {
            color: #ab003c;
          }
        `}
      </style>
    </div>
  );
}
export default Login;
