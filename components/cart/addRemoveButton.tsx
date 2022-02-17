import { useContext } from 'react';
import styles from '../../styles/Dishes.module.css';
import Icons from '../UI/icons/index';
import CartContext from '../context/cartContext';
import Cookie from "js-cookie";

export default function AddRemoveButton({ item }) {

  const { cart, handleSetCart } = useContext(CartContext);

  const handleAdd = ({ item, count }) => {
    const newCart = { ...cart };
    if (newCart.items.filter(x => x.id === item.id).length > 0) {
      newCart.items.filter(x => x.id === item.id)[0].quantity += count;
    } else {
      newCart.items.push({ ...item, quantity: count })
    }
    newCart.total += item.price * count;
    Cookie.set("cart", newCart);
    handleSetCart(newCart);
  }
  const handleRemove = ({ item }) => {
    const newCart = { ...cart };
    if (newCart.items.filter(x => x.id === item.id)[0].quantity === 1) {
      newCart.items = newCart.items.filter(x => x.id !== item.id);
    } else {
      newCart.items.filter(x => x.id === item.id)[0].quantity -= 1;
    }
    newCart.total -= item.price;
    Cookie.set("cart", newCart);
    handleSetCart(newCart);
  }

  const { plusIcon, minusIcon, trashIcon } = Icons;

  const quantityInCart = cart.items?.find(x => x.id === item.id)?.quantity || 0;

  return (
    <div className={styles["button-container"]}>
      <button className={styles["add-to-cart"]}
        type="button"
        onClick={quantityInCart === 0 ? () => handleAdd({item, count: 1}) : null}
        >
        {quantityInCart > 0 ? (
          <div 
              onClick = {()=> handleRemove({ item })} 
              className={styles["plus-minus-icon"]}
          >
            {quantityInCart === 1 ? trashIcon : minusIcon}
          </div>
        ) : null}
        {quantityInCart > 0 ? <div style={{ padding: "0px 15px" }}>{ quantityInCart }</div> : null }
        <div 
          onClick = {quantityInCart > 0 ? () => handleAdd({ item, count: 1 }) : null} 
          className={styles["plus-minus-icon"]} 
          style={quantityInCart > 0 ? {marginRight: "-5px", marginLeft: "0px"} : null }
        >
          {plusIcon}
        </div>
        {quantityInCart > 0 ? null : <div>Add<span className={styles["hidden-text"]}> To Cart</span></div> }
      </button>
    </div>
  )
}