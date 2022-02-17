import { useState } from 'react';

import Cookie from "js-cookie";

import CategorySlider from "./filters/categorySlider";
import CartIcon from "./cart/cartWidget";
import SearchAndFilter from './searchAndFilter';
import CartContext from './context/cartContext';

export default function Stores() {

  // TODO: Fix relevance sort (replace placeholder)
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

  const [cuisine, setCuisine] = useState(null);

  const handleSetCuisine = (id) => {
    setCuisine(id);
  }

  return (
    <CartContext.Provider value={{cart: thisCart, handleSetCart, drawerOpen, handleSetDrawer, openDrawer, closeDrawer}}>
      <CartIcon />
      <div style={{ minHeight:"160px" }}>
        <CategorySlider cuisine={cuisine} handleSetCuisine={handleSetCuisine}/>
      </div>
      <div className="flex">
        <SearchAndFilter highlights={[]} cuisine={cuisine}/>
      </div>
    <style jsx>{`
      .flex {
        display: flex;
        flex-wrap: nowrap;
        padding: 20px 0px;
      }
    `}</style>
    </CartContext.Provider>
  )
}