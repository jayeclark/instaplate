import HandlerContext from "../context/handlerContext";
import { useContext, useRef } from "react";
import CartDrawer from "./cartDrawer";
import styles from '../../styles/Cart.module.css';
import Icons from '../UI/icons/index';

const CartIcon = () => {
  const { getCart} = useContext(HandlerContext);
  const cart:any = getCart();
  const { items } = cart;

  const { shoppingCartDisabled, shoppingCartEnabled } = Icons;
  const drawerRef = useRef();

  const showCartDrawer = () => { 
    const el: HTMLElement = drawerRef.current;
    el.classList.add(styles.show);
  }
  const hideCartDrawer = () => { 
    const el: HTMLElement = drawerRef.current;
    el.classList.remove(styles.show); 
  }

  return (
    <div className={styles.cartWidget}>
    <button type="button" disabled={items.length === 0} onClick={showCartDrawer}>
      {items.length === 0 ? shoppingCartDisabled : shoppingCartEnabled}
      <span className={styles.itemCount}>{items.reduce((a,b) => a + b.quantity, 0)}</span>
    </button>
    <div ref={drawerRef} className={styles.cartDrawerContainer}>
      {items.length > 0 ? <div className={styles.cartDrawerContainerBackground}></div> : null}
      {items.length > 0 ? <CartDrawer handleCloseDrawer={hideCartDrawer}/> : null}
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