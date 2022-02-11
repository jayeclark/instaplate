import styles from '../../styles/Cart.module.css';
import { useContext } from 'react';
import UserContext from '../context/userContext';
import Icons from '../UI/icons/index';
import { parseSRC } from '../../scripts/utilities';

export default function CartItem({ item }) {

  const { editOutlineIcon, trashOutlineIcon, plusIcon, minusIcon, trashIcon } = Icons;
  const { cart, add, remove, removeAll } = useContext(UserContext);

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
          <div className={styles.itemOptions}><div>{editOutlineIcon}Preferences&nbsp;&nbsp;&nbsp;</div><div><span style={{ cursor: "pointer" }} onClick={() => removeAll({cart, item})}>{trashOutlineIcon}Remove</span></div></div>
        </div>
      </div>
      <div className={styles.itemQuantityLockup}>
        <div className={styles.itemQuantityGroup}>
          <div className={styles.itemQuantityHidden} onClick={()=> remove({cart, item})}>{item.quantity === 1 ? trashIcon : minusIcon}</div>
          <div className={styles.itemQuantity}>{item.quantity}</div>
          <div className={styles.itemQuantityHidden} onClick={()=> add({cart, item, count: 1})}>{plusIcon}</div>
        </div>
        <div className={styles.itemTotalCost}>${item.price * item.quantity}</div>
      </div>
    </div>
  )
}