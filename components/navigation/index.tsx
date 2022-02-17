import { useContext, useRef, useEffect } from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Cookie from "js-cookie";

import { current } from "../../scripts/utilities";
import UserContext from "../context/userContext";
import Icons from '../UI/icons/index';
import Login from "./loginDrawer";
import MenuDrawer from "./menuDrawer";
import Nav from "../UI/Nav";
import NavItem from "../UI/NavItem";
import Register from "./registerDrawer";
import styles from '../../styles/Navigation.module.css';

const Navigation = (props) => {

  const { user, handleSetUser, zipCode } = useContext(UserContext);
  const { data: sessionData } = useSession();

  const modalBackgroundRef = useRef();
  const navContentRef = useRef();
  const loginRef = useRef();
  const registerRef = useRef();

  useEffect(() => {
    if (sessionData?.user && !user) {
      const token: any = sessionData.token;
      const tempUser = {...sessionData.user, username: null, provider: null, token: null};
      tempUser.username = tempUser.email.replace(/@.+/,'');
      tempUser.provider = "google";
      tempUser.token = token;
      Cookie.set("token", token.jwt);
      handleSetUser(tempUser, token);
    } else if (user?.provider === "google" && !sessionData?.user) {
      handleSetUser(null, null);
    }
  }, [user, handleSetUser, sessionData])

  useEffect(() => {
    const addTransition = () => {
      const el: HTMLElement = navContentRef.current;
      if (Number(window.innerWidth) < 576 && !el.style.transition.includes("0.7s")) {
        setTimeout(() => {el.style.transition = "left 0.7s"}, 20);
      }
      if (Number(window.innerWidth) >= 576 && el.style.transition.includes("0.7s")) {
        el.style.transition = null;
      }
    }
    window.addEventListener("resize", () => addTransition());
    return window.removeEventListener("resize", () => addTransition());
  },[])

  const { hamburgerMenu, mapMarker } = Icons;

  const toggleNavContent = () => {
    const modalContent: HTMLElement = navContentRef.current;
    const background: HTMLElement = modalBackgroundRef.current;

    const loginVisible = () => current(loginRef).classList.contains(styles.showLoginDrawerContainer);
    const registerVisible = () => current(registerRef).classList.contains(styles.showLoginDrawerContainer);
    if (!modalContent.classList.contains(styles.modalMenuExpanded)) {
      modalContent.classList.add(styles.modalMenuExpanded);
      background.style.display = "block";
      setTimeout(() => {background.style.opacity = "1"}, 10);
      return true;
    }
    
    modalContent.classList.remove(styles.modalMenuExpanded);
    if (!loginVisible() && !registerVisible()) {
      background.style.opacity = "0";
      setTimeout(() => {background.style.display = "none"}, 700);
    }
    return false;

  };

  const closeNavContent = () => {
    const modalContent: HTMLElement = navContentRef.current;
    const background: HTMLElement = modalBackgroundRef.current;

    const loginVisible = () => current(loginRef).classList.contains(styles.showLoginDrawerContainer);
    const registerVisible = () => current(registerRef).classList.contains(styles.showLoginDrawerContainer);
    
    modalContent.classList.remove(styles.modalMenuExpanded);
    if (!loginVisible() && !registerVisible()) {
      background.style.opacity = "0";
      setTimeout(() => background.style.display = "none", 700);
    }
    return false;
  }

  return (
    <div>
    <Nav>
      <div style={{display: "flex", flexWrap: 'nowrap', alignItems: "center"}}>
        <div className={styles.hamburger} onClick={toggleNavContent}>{hamburgerMenu}</div>
        <NavItem className={styles.navbarBrand} >
          <Link href="/">
            <a className={styles.navLink}>
              <img src="/logo.png" width="160px"></img>
            </a>
          </Link>
        </NavItem>
      </div>
      <div style={{display: "flex", flexShrink: "0", alignItems: "center", flexWrap: "nowrap"}}>
      <NavItem>
        <div className={styles.mapMarker}>
          { user && 
              <div id="user-id">{user.username || user.email.replace(/@.+/,'')}</div>
          }
          { !user && 
            (<> 
              <div id="zip-marker">{zipCode ? mapMarker : null}</div>
              <div id="zip-value">{zipCode}</div>
            </>)
          }
        </div>
      </NavItem>
      </div>

    </Nav>
    <div id="modalBackground" ref={modalBackgroundRef} className={styles.modalBackground} onClick={closeNavContent}></div>
    <MenuDrawer 
      navContentRef={navContentRef}
      handleSetUser={handleSetUser}
      user={user}
      toggleNavContent={toggleNavContent}
      closeNavContent={closeNavContent}
      loginRef={loginRef}
      registerRef={registerRef}
    />
    <div id="loginScreen" ref={loginRef} className={styles.loginDrawerContainer}>
      <Login 
        handleToggle={() => {
          current(loginRef).classList.remove(styles.showLoginDrawerContainer);
          current(registerRef).classList.add(styles.showLoginDrawerContainer);
        }}
        handleCloseDrawer={() => {
          current(modalBackgroundRef).style.opacity = "0";
          setTimeout(() => current(modalBackgroundRef).style.display = "none", 800);
          current(loginRef).classList.remove(styles.showLoginDrawerContainer);
      }} 
      />
    </div>
    <div ref={registerRef} className={styles.loginDrawerContainer}>
      <Register 
        handleToggle={() => {
          current(registerRef).classList.remove(styles.showLoginDrawerContainer);
          current(loginRef).classList.add(styles.showLoginDrawerContainer);
        }} 
        handleCloseDrawer={() => {
          current(modalBackgroundRef).style.opacity = "0";
          setTimeout(() => current(modalBackgroundRef).style.display = "none", 800);
          current(registerRef).classList.remove(styles.showLoginDrawerContainer)
        }} 
      />
    </div>
  </div>
  )
}
export default Navigation;