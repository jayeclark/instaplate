import { parseDeliveryByTime } from '../../scripts/time';
import { parseSRC } from '../../scripts/utilities';
import Icons from '../UI/icons/index';
import styles from '../../styles/Cart.module.css';

export default function CartHeader({ restaurant, cartTotal, zipCode='00901' }) {

  const { guaranteeIcon } = Icons;

  if (cartTotal === 0) {
    return (          
    <div className={styles.cartEmpty}>
      You have no items in your cart!
    </div>
    )
  }

  return (  
    <>    
      <div className={styles.cartHeader}>
        <h6>Shopping Cart</h6>
        <p>Shopping in {zipCode}</p>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.cartDetails}>
        <div className={styles.restaurantLockup}>
          <div className={styles.restaurantLogo}>
            <img height="65px" src={parseSRC(restaurant)} />
          </div>
          <div>
            <div className={styles.restaurantName}>{restaurant.name}</div>
            <div className={styles.restaurantDeliveryBy}>Next delivery: Today by {parseDeliveryByTime(restaurant.deliveryTime)}</div>
            <div className={styles.restaurantGuarantee}>{guaranteeIcon}&nbsp;100% satisfaction guarantee</div>
          </div>
        </div>
      <div className={styles.cartTotal}>${cartTotal.toFixed(2)}</div>
      </div>
      <div className={styles.noRush}>Choose No-Rush at checkout to see free delivery options.</div>
    </>  
  );
}