import UserContext from "../context/userContext";
import CartContext from "../context/cartContext";
import { useContext, useRef, useState, useEffect } from "react";
import CartDrawer from "./cartDrawer";
import styles from '../../styles/Cart.module.css';
import Icons from '../UI/icons/index';
import Cookies from "js-cookie";

const CartIcon = () => {

  let { cart: thisCart, openDrawer, handleSetCart, closeDrawer, handleSetDrawer, drawerOpen } = useContext(CartContext);

  let { items } = thisCart ? thisCart : { items: [] };
  if (items.length === 0 && Cookies.getJSON("cart")) {
    thisCart = Cookies.getJSON("cart");
    //handleSetCart(thisCart);
  }

  const [button, setButton] = useState(items.length === 0);
  const { shoppingCart } = Icons;
  const drawerRef = useRef();

  const showCartDrawer = () => { 
    openDrawer();
  }
  const hideCartDrawer = () => { 
    closeDrawer();
  }

  const openTimeout = () => { if (drawerOpen === 'opening') { handleSetDrawer('open'); }}
  
  const closeTimeout = () => { if (drawerOpen === 'closing') { handleSetDrawer('closed') }}

  useEffect(() => {
    const el: HTMLElement = drawerRef.current;
    const classes = el.classList;
    let timeout : any;
    let backgroundTimeout: any;

    if (drawerOpen === 'open') {
      if (!classes.contains(styles.show)) {classes.add(styles.show);}
      if (!classes.contains(styles.changeBackgroundDisplay)) { classes.add(styles.changeBackgroundDisplay); }
      if (!classes.contains(styles.changeBackgroundColor)) { classes.add(styles.changeBackgroundColor); }
    }

    if (drawerOpen === 'closed' && el.classList.contains(styles.show)) {
      if (classes.contains(styles.show)) { classes.remove(styles.show); }
      if (classes.contains(styles.changeBackgroundColor)) { classes.remove(styles.changeBackgroundColor); }
      if (classes.contains(styles.changeBackgroundDisplay)) { classes.remove(styles.changeBackgroundDisplay); }
    }

    if (drawerOpen === 'opening' && !classes.contains(styles.show)) {
      if (!classes.contains(styles.changeBackgroundDisplay)) {
        classes.add(styles.changeBackgroundDisplay);
      }
      setTimeout(() => classes.add(styles.show), 20);
      setTimeout(() => classes.add(styles.changeBackgroundColor), 20);
      timeout = closeTimeout;
      clearTimeout(timeout);

      timeout = openTimeout;
      setTimeout(timeout, 1000);
    } 

    if (drawerOpen === 'closing' && classes.contains(styles.show)) {
      if (!classes.contains(styles.changeBackgroundColor)) {
        classes.add(styles.changeBackgroundColor);
      }
      if (!classes.contains(styles.changeBackgroundDisplay)) {
        classes.add(styles.changeBackgroundDisplay);
      }
      setTimeout(() => classes.remove(styles.changeBackgroundColor), 10);
      setTimeout(() => classes.remove(styles.show), 10);  
      timeout = openTimeout;
      clearTimeout(timeout);

      timeout = closeTimeout;
      setTimeout(timeout, 1000);
    }

    if (items.length > 0) {
      setButton(true);
    }
    if (timeout) {
      return clearTimeout(timeout);
    }
  },[drawerOpen]);

  return (
    <div className={styles.cartWidget}>
    <button 
      type="button" 
      disabled={items.reduce((a,b) => a + b.quantity, 0) === 0} 
      onClick={showCartDrawer}
    >
      {shoppingCart}
      <span className={styles.itemCountWidget}>{!items ? 0 : items.reduce((a,b) => a + b.quantity, 0)}</span>
    </button>
    <div ref={drawerRef} className={`${styles.cartDrawerContainer}${(drawerOpen === "open" || drawerOpen === "closing") ? ' ' : ''}${(drawerOpen === "open" || drawerOpen === "closing") ? styles.show : ''}`}>
      {items?.length > 0 ? <div className={styles.cartDrawerContainerBackground}></div> : null}
      {items?.length > 0 || drawerOpen !== 'closed' ? <CartDrawer handleCloseDrawer={hideCartDrawer}/> : null}
    </div>
    <style jsx>
      {`

        button {
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          height: 48px;
          border-radius: 48px;
          border: none;
          min-width: 82px;
          background-color: rgb(10, 173, 10);
          color: white;
          transition: background-color 0.5s ease, color 0.5s ease;
        }

        button:hover {
          opacity: 0.8;
        }

        button:disabled {
          color: #666;
          background-color: rgb(246, 246, 246);
        }
      `}
    </style>
    </div>
  )
}

export default CartIcon;