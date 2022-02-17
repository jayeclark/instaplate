import { useContext } from "react";

import Link from "next/link";

import UserContext from "../context/userContext";
import CartContext from "../context/cartContext";
import Icons from "../UI/icons/index";
import CartHeader from "./cartHeader";
import CartItem from "./cartItem";
import styles from "../../styles/Cart.module.css";

function CartDrawer({ handleCloseDrawer }) {

  const { cart: {items, total} } = useContext(CartContext);

  let { zipCode } = useContext(UserContext);

  const { closeIcon } = Icons;

  const restaurant = items.length > 0 ? items[0].restaurant : null;
  
  const itemList = items.map((item, index) => <CartItem key={index} item={item} handleCloseDrawer={handleCloseDrawer}/>);

// return Cart
  return (
    <div className={styles.cartDrawer}>
      <div className={styles.cartContainer}>
        <div className={styles.closeCart} onClick={handleCloseDrawer}>
          <div className={styles.closeCartIcon}>{closeIcon}</div>
          <div className={styles.closeCardText}>Close</div>
        </div>
        <CartHeader restaurant={restaurant} cartTotal={total} zipCode={zipCode} />         
        {(items && items.length > 0) ? <div>{itemList}</div> : null }
        <Link href="/checkout">
          <a className={styles.checkout} >
            <div className={styles.checkoutButton}>
              Go to Checkout
              <div className={styles.checkoutTotal}>${total.toFixed(2)}</div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
export default CartDrawer;
