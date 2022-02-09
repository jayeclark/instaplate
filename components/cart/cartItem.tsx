import styles from '../../styles/Cart.module.css';
import { useContext } from 'react';
import HandlerContext from '../context/handlerContext';
import Icons from '../UI/icons/index';
import { getAPIUrl } from '../../scripts/urls';

export default function CartItem({ item }) {

  const API_URL = getAPIUrl();
  const { dispatchCart, getCart } = useContext(HandlerContext);
  const { editOutlineIcon, trashOutlineIcon, plusIcon, minusIcon, trashIcon } = Icons;

  return (
    <div
      className={styles.cartItemRow}
      style={{ marginBottom: 15 }}
      key={item.id}
    >
      <div className={styles.itemDetails}>
        <div className={styles.itemImg}>
          <img width="100%" src={API_URL + item.image.url}/>
        </div>
        <div>
          <div>{item.name}</div>
          <div className={styles.itemCount}>{item.quantity} ct</div>
          <div className={styles.itemOptions}>{editOutlineIcon}Preferences&nbsp;&nbsp;&nbsp;<span style={{ cursor: "pointer" }} onClick={() => dispatchCart({type: 'removeItemEntirely', remove: {item}})}>{trashOutlineIcon}Remove</span></div>
        </div>
      </div>
      <div className={styles.itemQuantityLockup}>
        <div className={styles.itemQuantityGroup}>
          <div className={styles.itemQuantityHidden} onClick={()=> dispatchCart({type: 'removeItem', remove: {item}})}>{item.quantity === 1 ? trashIcon : minusIcon}</div>
          <div className={styles.itemQuantity}>{item.quantity}</div>
          <div className={styles.itemQuantityHidden} onClick={()=> dispatchCart({type: 'addItem', add: {item, count: 1}})}>{plusIcon}</div>
        </div>
        <div className={styles.itemTotalCost}>${item.price * item.quantity}</div>
      </div>
    </div>
  )
}