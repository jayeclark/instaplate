import styles from '../../styles/Dishes.module.css';
import { timeToString } from '../../scripts/time';

export default function NotAvailable({ menuStart }) {

  return (
    <div className={styles["button-container"]}>
    <button className={styles["add-to-cart"]}
      type="button"
      disabled={true}
    >
      <div style={{fontSize: "0.7rem"}}>Available at {timeToString(menuStart)}</div>
    </button>
  </div>
  )
}