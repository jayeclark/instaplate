import React, { useState, useEffect, useContext } from "react";

import {
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import Link from "next/link";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from "next-auth/react";

import { ErrorObject } from "../../types";
import { registerUser } from "../auth";
import UserContext from "../context/userContext";
import Icons from '../UI/icons/index';
import styles from "../../styles/Dialog.module.css";


function Register(props: any) {

  const nullError: ErrorObject = {};
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(nullError);
  const { isAuthenticated, user, handleSetUser } = useContext(UserContext);

  const { handleCloseDrawer, handleToggle } = props;
  useEffect(() => {
    if (isAuthenticated && user) {
      handleCloseDrawer();
    }
  }, []);

  const { plusIcon } = Icons;

  function onChange(event: any) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <div className={styles["login-drawer"]}>
      <div className={styles["login-container"]}>
        <div className={styles["close-modal"]} onClick={handleCloseDrawer}>
          <div className={styles["rotate-icon"]}>
            {plusIcon}
          </div>
        </div>
        <div className={styles["content-scroll-container"]}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>Sign Up</h1>
            </div>
            <section className={styles.wrapper}>
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message?.map((err: any) => {
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
                Welcome to Instaplate! Enter your details to sign up.
                <Form>
                  <fieldset disabled={loading}>
                    <FormGroup>
                      <Input
                        placeholder="Username"
                        disabled={loading}
                        onChange={onChange}
                        value={data.username}
                        type="text"
                        name="username"
                        className={styles["dialog-input"]}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        placeholder="Email"
                        onChange={onChange}
                        value={data.email}
                        type="email"
                        name="email"
                        className={styles["dialog-input"]}
                      />
                    </FormGroup>
                    <FormGroup style={{ marginBottom: 10 }}>
                      <Input
                        placeholder="Password"
                        onChange={onChange}
                        value={data.password}
                        type="password"
                        name="password"
                        className={styles["dialog-input"]}
                      />
                      <div style={{fontSize: "0.75rem", textAlign: "center", margin: "10px 0px"}}>
                        By continuing, you agree to our <Link href="/terms"><a className={styles["nav-link"]}>Terms of Service</a></Link> & <Link href="/privacy"><a className={styles["nav-link"]}>Privacy Policy</a></Link>
                        </div>
                      <button
                        className={styles.btn}
                        disabled={loading}
                        onClick={() => {
                          setLoading(true);
                          registerUser(data.username, data.email, data.password)
                            .then((res: any) => {
                              // set authed user in global context object
                              if (res.data) {handleSetUser(res.data.user, res.data.jwt)};
                              setLoading(false);
                              handleCloseDrawer();
                              toast.success("Your account has been registered and you have automatically been logged in!")
                            })
                            .catch((error) => {
                              if (error) {setError(error.response.data)} else {setError({})};
                              setLoading(false);
                            });
                        }}
                      >
                        {loading ? "Loading.." : "Submit"}
                      </button>
                    </FormGroup>
                  </fieldset>
                </Form>
            </section>
            <div className={styles["login-footer"]}>
              <div style={{marginBottom: "12px"}}>Already have an account?</div>
              <div onClick={handleToggle} className={styles["nav-link"]} style={{ cursor: "pointer", textDecoration: "none", color: "rgb(10, 173, 10)!important", fontSize: "1.1rem", marginTop: "15px", paddingTop: "15px"}}>Log in</div>
            </div>
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
export default Register;
