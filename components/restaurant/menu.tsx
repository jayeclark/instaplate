import { useState } from "react";

import { Row } from "reactstrap";
import Cookie from "js-cookie";

import { isAvailable } from '../../scripts/time';
import CartContext from "../context/cartContext";
import DishCard from '../dish/dishCard';
import CartIcon from "../cart/cartWidget";

function Menu({ restId, menu, style }){

  const cart = Cookie.getJSON("cart") || {items: [], total: 0};
  const [ thisCart, setThisCart ] = useState(cart);
  const [ drawerOpen, setDrawerOpen] = useState('closed');

  const openDrawer = () => {
    setDrawerOpen('opening');
  }
  const closeDrawer = () => {
    setDrawerOpen('closing')
  }
  const handleSetDrawer = (state) => {
    setDrawerOpen(state);
  }

  const handleSetCart = (newCart) => {
    setThisCart(newCart);
  };

  const isThisMenuAvailable = menu ? isAvailable(menu.menuStart, menu.menuEnd, [menu.mon, menu.tue, menu.wed, menu.thu, menu.fri, menu.sat, menu.sun]) : false;

  const Dishes = ({ name, dishes, isAvailable }) => {
  if (dishes.length === 0) { return null;}

  return (
      <CartContext.Provider value={{cart: thisCart, handleSetCart, drawerOpen, handleSetDrawer, openDrawer, closeDrawer}}>
        <CartIcon />
        <Row style={{margin: "0px", padding: "20px 15px 40px 15px"}}>
        <h2 style={{marginBottom: "0px", paddingBottom: "0px"}}>{name}</h2>
        {dishes.map((res, index) => (
          <DishCard 
            key={index}
            dish={res} 
            index={index} 
            isAvailable={isAvailable}
            menuStart={menu.menuStart}
            />
        ))}
        </Row>
        <style jsx>
          {`
            h2 {
              padding-bottom: 20px;
            }
          `}
        </style>
      </CartContext.Provider>
    )
  }

  const MenuCategories = ({categories, isAvailable}) => {

    return (
      <>
      {categories.map(({ id, name, dishes }) => {
        const dishesToRender = dishes.length > 0 ? dishes : [];
        return (
          <Dishes name={name} key={id} dishes={dishesToRender} isAvailable={isAvailable} />
        )
      })}
      </>
    )
  }

  if (restId && menu){
    return (
    <div className="menu-details" style={style}>
      <MenuCategories categories={menu.menu_categories} isAvailable={isThisMenuAvailable}/>
    </div>
    )
  } else if (!restId) {
    return <h1> No Dishes</h1>
  } else {
    return null;
  }
}

export default Menu;