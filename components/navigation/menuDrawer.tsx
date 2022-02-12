import { logout } from '../auth';
import Icons from '../UI/icons/index';
import Link from "next/link";
import styles from "../../styles/Navigation.module.css";
import { signOut } from "next-auth/react";
import styles2 from "../../styles/Dialog.module.css";

export default function MenuDrawer({ 
  navContentRef, 
  handleSetUser,
  user, 
  toggleNavContent,
  closeNavContent,
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
    closeIcon,
    logOutIcon } = Icons;

  return (
    <div ref={navContentRef} className={styles.menuDrawer}>
      <div className={styles.closeIcon} style={{width: "calc(100vw - 40px)"}}>
        <div onClick={closeNavContent} className={styles2["close-modal"]} style={{zIndex: "999", right: "10px", position: "absolute", cursor:"pointer"}}>
          {closeIcon}
        </div>
      </div>
    <div style={{width: "calc(100vw - 40px)", overflowX: "hidden"}}>
      <div className={styles.menuHeader}>
          {user ? (
            <>
            <h5>{user.username || user.email.replace(/@.+/,'')}</h5>
            <a className={styles.accountSettings}>Account settings</a>
            </>
          ) : (
            <div className={styles.menuHeaderOptions}>
              <div 
                className={styles.menuHeaderOption}
                onClick={()=>{registerRef.current.classList.add(styles.showLoginDrawerContainer), toggleNavContent()}}
              >
                Sign up
              </div>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <div 
                className={styles.menuHeaderOption}
                onClick={()=>{loginRef.current.classList.add(styles.showLoginDrawerContainer), toggleNavContent()}}
              >
                Sign in
              </div>
            </div>
          )}
      </div>
      <hr />
      <Link href="/restaurants"><div style={{cursor: "pointer"}} onClick={toggleNavContent} className={styles.menuItem}>{restaurantIcon}<div>Stores</div></div></Link>
      <Link href="/store/account/orders"><div style={{cursor: "pointer"}} onClick={toggleNavContent}  className={styles.menuItem}>{ordersIcon}<div>Your Orders</div></div></Link>
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
          Press · Jobs · <Link href="/terms"><span className={styles.menuFooter} style={{cursor: "pointer"}} onClick={toggleNavContent}>Terms</span></Link> · <Link href="/privacy"><span className={styles.menuFooter} style={{cursor: "pointer"}} onClick={toggleNavContent}>Privacy</span></Link>
        </h6>
      </div>
    </div>
  </div>
  )

}