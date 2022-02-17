import { useState, useContext } from 'react';

import Cookie from "js-cookie";

import { parseSRC } from "../../scripts/utilities";
import Icons from '../UI/icons/index';
import CartContext from '../context/cartContext';

function DishDetail({ dish, handleCloseDish }) {

  const [numItems, setNumItems] = useState(1);

  const updateItemCount = (increment) => {
    if (numItems + increment > 0) {
      setNumItems(numItems + increment);
    }
  }

  const { cart, handleSetCart } = useContext(CartContext);

  if (dish === null) {
    return null;
  }

  const handleAdd = ({item, count}) => {
    const newCart = {...cart};
    if (cart.items.filter(x => x.id === item.id).length > 0) {
      newCart.items.filter(x => x.id === item.id)[0].quantity += count;
      newCart.total += item.price * count;
    } else {
      newCart.items.push({...item, quantity: count});
      newCart.total += item.price * count;
    }
    handleSetCart(newCart);
    handleCloseDish();
    Cookie.set("cart", newCart);
  }

  return (
    <div className="background-container">
      <div className="dish-detail">
        <div className="dish-image">
          <img src={parseSRC(dish)} width="100%" />
        </div>
        <div style={{margin: "0px 20px", fontSize: "2.5rem"}}>{dish.name}</div>
        <div style={{margin: "0px 20px"}}>{dish.description}</div>
        <div onClick={handleCloseDish} className="close-button round-button white">
          {Icons.closeIcon}
        </div>
      </div>

      <div className="bottom-ribbon">
        <div className="quantity-buttons">
          <div onClick={() => updateItemCount(-1)} className="round-button lightgray">{Icons.minusIcon}</div>
          <div style={{textAlign: "center", minWidth: "35px", fontSize: "1.2rem"}}>{numItems}</div>
          <div onClick={() => updateItemCount(1)} className="round-button lightgray">{Icons.plusIcon}</div>
        </div>
        <div onClick={(e) => handleAdd({ item: dish, count: numItems })} className="add-to-cart">
          Add {numItems} to order
          <div className="price-total">
            ${(dish.price * numItems).toFixed(2)}
          </div>
        </div>
      </div>
      <style jsx>{`
        .background-container {
          background-color: rgba(0,0,0,0.6);
          position: fixed;
          top: 0px;
          left: 0px;
          width: 100vw;
          height: 100vh;
          z-index: 999;
        }

        .dish-detail {
          position: fixed;
          top: 0px;
          left: 0px;
          margin: 72px calc(max(0px,((100vw - 676px) / 2))) 0px calc(max(0px,((100vw - 676px) / 2)));
          background-color: white;
          width: calc(min(676px, 100vw));
          max-width: 676px;
          height: calc(100vh - 80px);
          text-align: left;
          overflow: scroll;
          padding-bottom: 104px;
        }

        .dish-image {
          width: 100%;
          height: 425px;
          max-height: 425px;
          overflow: hidden;
        }

        .dish-image img {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

        }
        .close-button {
          position: fixed;
          top: 72px;
          left: calc(max(0px,((100vw - 676px) / 2)));
          border: 1px solid #ccc;
        }
        .round-button {
          width: 46px;
          height: 46px;
          margin: 5px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .round-button.white {
          background-color: white;
        }

        .round-button.lightgray {
          background-color: #efefef;
        }

        .bottom-ribbon {
          position: fixed;
          width: calc(min(676px, 100vw));
          max-width: 676px;
          bottom: 0px;
          left: 0px;
          margin: 0px calc(max(0px,((100vw - 676px) / 2)));
          background-image: linear-gradient(rgba(255,255,255,0), #fff, #fff);
          text-align: center;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: stretch;
          padding: 20px;
        }
        .quantity-buttons {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          flex-shrink: 0;
          flex-grow: 0;
          padding-right: 15px;
        }
        .add-to-cart {
          margin: 5px;
          background-color: black;
          color: white;
          width: 100%;
          height: 100%;
          position: relative;
          padding: 15px;
          font-weight: 400;
          line-height: 24px;
          font-size: 1.2rem;
          cursor: pointer;
        }
        .price-total {
          position: absolute;
          right: 0px;
          top: 0px;
          bottom: 0px;
          padding: 15px;
          font-weight: 300;
        }

        @media only screen and (max-width: 600px) {
          .price-total {
            color: #666;
            bottom: 45px;
            right: -10px;
            top: unset;
          }
        }
      `}</style>
    </div>
  )
}

export default DishDetail;