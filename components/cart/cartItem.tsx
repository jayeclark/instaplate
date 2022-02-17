import { useContext } from 'react';

import Cookie from "js-cookie";

import { parseSRC } from '../../scripts/utilities';
import CartContext from '../context/cartContext';
import Icons from '../UI/icons/index';
import styles from '../../styles/Cart.module.css';

export default function CartItem({ item, handleCloseDrawer }) {

  const { cart: thisCart, handleSetCart } = useContext(CartContext);

  const { editOutlineIcon, trashOutlineIcon, plusIcon, minusIcon, trashIcon } = Icons;
  const handleAdd = ({item, count}) => {
    const newCart = {...thisCart};
    if (newCart.items.filter(x => x.id === item.id).length > 0) {
      newCart.items.filter(x => x.id === item.id)[0].quantity += count;
    } else {
      newCart.items.push({...item, quantity: count})
    }
    newCart.total += item.price * count;
    handleSetCart(newCart);
    Cookie.set("cart", newCart);
  }

  const handleRemove = ({item}) => {
    const newCart = { ...thisCart };
    if (newCart.items.filter(x => x.id === item.id)[0].quantity === 1) {
      newCart.items = newCart.items.filter(x => x.id !== item.id);
    } else {
      newCart.items.filter(x => x.id === item.id)[0].quantity -= 1;
    }
    newCart.total -= item.price;
    if (newCart.total === 0) {
      handleCloseDrawer();
      Cookie.set("cart", newCart);
      setTimeout(() => {
        handleSetCart(newCart);
      }, 1050)
    } else {
      Cookie.set("cart", newCart);
      handleSetCart(newCart);
    }
  }

  const handleRemoveAll = ({item}) => {
    const newCart = { ...thisCart };
    const quantityInCart = newCart.items.filter(x => x.id === item.id)[0].quantity;
    newCart.items = thisCart.items.filter(x => x.id !== item.id);
    newCart.total -= quantityInCart * item.price;
    if (newCart.total === 0) {
      handleCloseDrawer();
      Cookie.set("cart", newCart);
      setTimeout(() => {
        handleSetCart(newCart);
      }, 1050)
    } else {
      Cookie.set("cart", newCart);
      handleSetCart(newCart);
    }
  }

  return (
    <div
      className={styles.cartItemRow}
      style={{ marginBottom: 15 }}
      key={item.id}
    >
      <div className={styles.itemDetails}>
        <div className={styles.itemImg}>
          <img width="100%" src={parseSRC(item)}/>
        </div>
        <div>
          <div>{item.name}</div>
          <div className={styles.itemCount}>{item.quantity} ct</div>
          <div className={styles.itemOptions}><div>{editOutlineIcon}Preferences&nbsp;&nbsp;&nbsp;</div><div><span style={{ cursor: "pointer" }} onClick={() => handleRemoveAll({item})}>{trashOutlineIcon}Remove</span></div></div>
        </div>
      </div>
      <div className={styles.itemQuantityLockup}>
        <div className={styles.itemQuantityGroup}>
          <div className={styles.itemQuantityHidden} onClick={()=> handleRemove({item})}>{item.quantity === 1 ? trashIcon : minusIcon}</div>
          <div className={styles.itemQuantity}>{item.quantity}</div>
          <div className={styles.itemQuantityHidden} onClick={()=> handleAdd({item, count: 1})}>{plusIcon}</div>
        </div>
        <div className={styles.itemTotalCost}>${item.price * item.quantity}</div>
      </div>
    </div>
  )
}