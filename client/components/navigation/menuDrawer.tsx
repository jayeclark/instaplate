import { logout } from '../auth';
import Icons from '../UI/icons/index';
import NavItem from "../UI/NavItem";
import Link from "next/link";
import styles from "../../styles/Navigation.module.css";
import { signOut } from "next-auth/react";

export default function MenuDrawer({ 
  navContentRef, 
  handleSetUser,
  user, 
  toggleNavContent,
  loginRef,
  registerRef }) {

  const {  
    restaurantIcon,
    ordersIcon,
    favoritesIcon,
    instantIcon,
    moneyIcon,
    giftIcon,
    promoIcon,
    helpIcon,
    howIcon,
    logOutIcon } = Icons;

  return (
    <div ref={navContentRef} className={styles.menuDrawer} onMouseLeave={toggleNavContent}>
    <div className={styles.menuHeader}>
        {user ? (
          <>
          <h5>{user.username || user.email.replace(/@.+/,'')}</h5>
          <Link href="/account"><a className={styles.accountSettings}>Account settings</a></Link>
          </>
        ) : (
          <div className={styles.menuHeaderOptions}>
            <div 
              className={styles.menuHeaderOption}
              onClick={()=>registerRef.current.classList.add(styles.showLoginDrawerContainer)}
            >
              Sign up
            </div>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <div 
              className={styles.menuHeaderOption}
              onClick={()=>loginRef.current.classList.add(styles.showLoginDrawerContainer)}
            >
              Sign in
            </div>
          </div>
        )}
    </div>
    <hr />
    <div className={styles.menuItem}>{restaurantIcon}<div>Stores</div></div>
    <div className={styles.menuItem}>{ordersIcon}<div>Your Orders</div></div>
    <div className={styles.menuItem}>{favoritesIcon}<div>Your Favorites</div></div>
    <div className={styles.menuItem}>{instantIcon}<div>Instaplate Express</div></div>
    <hr/>
    <div className={styles.menuItem}><h6>Credits and Promos</h6></div>
    <div className={styles.menuItem}>{moneyIcon}<div style={{ color: "#D43684" }}>Invite friends, get $50</div></div>
    <div className={styles.menuItem}>{giftIcon}<div>Buy gift cards</div></div>
    <div className={styles.menuItem}>{promoIcon}<div>Add Promo or Gift Card</div></div>
    <hr/>
    <div className={styles.menuItem}><h6>Support</h6></div>
    <div className={styles.menuItem}>{helpIcon}<div>Help Center</div></div>
    <div className={styles.menuItem}>{howIcon}<div>How Instaplate Works</div></div>
        {user && user?.provider !== 'google' ? (
          <Link href="/">
            <a
              className={styles.navLink}
              onClick={() => {
                logout();
                handleSetUser(null);
              }}
            >
              <div className={styles.menuItem}>{logOutIcon}<div>Log out</div></div>
            </a>
          </Link>
        ) : null}
        {user?.provider === 'google' ? (
          <Link href="/">
            <a
              className={styles.navLink}
              onClick={() => {
                signOut();
                handleSetUser(null);
              }}
            >
              <div className={styles.menuItem}>{logOutIcon}<div>Log out</div></div>
            </a>
          </Link>
        ) : null}
    <hr />
    <div>
      <h6 className={styles.menuFooter}>
        Press · Jobs · Terms · Privacy
      </h6>
    </div>
  </div>
  )

}