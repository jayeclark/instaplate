import styles from '../../styles/Cart.module.css';
import Icons from '../UI/icons/index';
import { parseSRC } from '../../scripts/utilities';

export default function OrderItem({ item }) {

  const { editOutlineIcon } = Icons;

  return (
    <div
      className={styles.cartItemRow}
      style={{ marginBottom: 15, paddingTop: 15 }}
      key={item.id}
    >
      <div className={styles.itemDetails}>
        <div className={styles.itemImg}>
          <img height="100%" style={{position: "relative", left: "50%", transform: "translateX(-50%)"}} src={parseSRC(item)}/>
        </div>
        <div>
          <div>{item.name}</div>
          <div className={styles.itemCount}>{item.quantity} ct</div>
          <div className={styles.itemOptions}><div>{editOutlineIcon}Preferences&nbsp;&nbsp;&nbsp;</div></div>
        </div>
      </div>
      <div className={styles.itemQuantityLockup}>
        <div className={styles.itemTotalCost}>${item.price * item.quantity}</div>
      </div>
    </div>
  )
}