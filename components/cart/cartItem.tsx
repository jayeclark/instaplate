import { useContext } from 'react';
import styles from '../../styles/Cart.module.css';
import Icons from '../UI/icons/index';
import { parseSRC } from '../../scripts/utilities';
import UserContext from '../context/userContext';
import CartContext from '../context/cartContext';
import Cookie from "js-cookie";

export default function CartItem({ item }) {

  const { cart: thisCart, handleSetCart } = useContext(CartContext);
  const { cart, updateTotal, handleSetCart: handleSetMainCart} = useContext(UserContext);

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
    handleSetCart(newCart);
    Cookie.set("cart", newCart);
  }
  const handleRemoveAll = ({item}) => {
    const newCart = { ...thisCart };
    const quantityInCart = newCart.items.filter(x => x.id === item.id)[0].quantity;
    newCart.items = thisCart.items.filter(x => x.id !== item.id);
    newCart.total -= quantityInCart * item.price;
    handleSetCart(newCart);
    Cookie.set("cart", newCart);
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