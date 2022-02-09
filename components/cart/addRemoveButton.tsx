import HandlerContext from "../context/handlerContext";
import { useContext } from "react";
import styles from '../../styles/Dishes.module.css';
import Icons from '../UI/icons/index';

export default function AddRemoveButton({ item }) {

  const { getCart, dispatchCart } = useContext(HandlerContext);
  const cart: any = getCart();

  const { plusIcon, minusIcon, trashIcon } = Icons;

  const quantityInCart = cart.items?.find(x => x.id === item.id)?.quantity || 0;

  return (
    <div className={styles["button-container"]}>
      <button className={styles["add-to-cart"]}
        type="button"
        onClick={quantityInCart === 0 ? () => dispatchCart({type: 'addItem', add: {item, count: 1}}) : null}
        >
        {quantityInCart > 0 ? <div onClick = {()=> dispatchCart({type: 'removeItem', remove: {item}})} className={styles["plus-minus-icon"]}>{quantityInCart === 1 ? trashIcon : minusIcon}</div> : null}
        {quantityInCart > 0 ? <div style={{ padding: "0px 15px" }}>{ quantityInCart }</div> : null }
        <div onClick = {quantityInCart > 0 ? () => dispatchCart({type: 'addItem', add: {item, count: 1}}) : null} className={styles["plus-minus-icon"]} style={quantityInCart > 0 ? {marginRight: "-5px", marginLeft: "0px"} : null }>{plusIcon}</div>
        {quantityInCart > 0 ? null : <div>Add<span className={styles["hidden-text"]}> To Cart</span></div> }
      </button>
    </div>
  )
}