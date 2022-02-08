import { useContext, useRef, useEffect } from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";

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

  useEffect(() => {
    if (sessionData?.user && !user) {
      const tempUser = {...sessionData.user, username: null, provider: null};
      tempUser.username = tempUser.email.replace(/@.+/,'');
      tempUser.provider = "google";
      handleSetUser(tempUser);
    } else if (user?.provider === "google" && !sessionData?.user) {
      handleSetUser(null);
    }
  }, [user, handleSetUser, sessionData])

  const modalBackgroundRef = useRef();
  const navContentRef = useRef();
  const loginRef = useRef();
  const registerRef = useRef();

  const { hamburgerMenu, mapMarker } = Icons;

  const toggleNavContent = () => {
    const modalContent: HTMLElement = navContentRef.current;
    const background: HTMLElement = modalBackgroundRef.current;

    const loginVisible = () => current(loginRef).classList.contains(styles.showLoginDrawerContainer);
    const registerVisible = () => current(registerRef).classList.contains(styles.showLoginDrawerContainer);
    if (!modalContent.classList.contains(styles.modalMenuExpanded)) {
      modalContent.classList.add(styles.modalMenuExpanded);
      background.style.display = "block";
      return true;
    }
    
    modalContent.classList.remove(styles.modalMenuExpanded);
    if (!loginVisible() && !registerVisible()) {
      setTimeout(() => background.style.display = "none", 300);
    }
    return false;

  };

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
              <div>{user.username || user.email.replace(/@.+/,'')}</div>
          }
          { !user && 
            (<> 
              <div>{zipCode ? mapMarker : null}</div>
              <div>{zipCode}</div>
            </>)
          }
        </div>
      </NavItem>
      </div>

    </Nav>
    <div ref={modalBackgroundRef} className={styles.modalBackground}></div>
    <MenuDrawer 
      navContentRef={navContentRef}
      handleSetUser={handleSetUser}
      user={user}
      toggleNavContent={toggleNavContent}
      loginRef={loginRef}
      registerRef={registerRef}
    />
    <div ref={loginRef} className={styles.loginDrawerContainer}>
      <Login 
        handleToggle={() => {
          current(loginRef).classList.remove(styles.showLoginDrawerContainer);
          current(registerRef).classList.add(styles.showLoginDrawerContainer);
        }}
        handleCloseDrawer={() => {
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
          setTimeout(() => current(modalBackgroundRef).style.display = "none", 800);
          current(registerRef).classList.remove(styles.showLoginDrawerContainer)
        }} 
      />
    </div>
  </div>
  )
}
export default Navigation;