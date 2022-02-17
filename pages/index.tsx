import { useState } from 'react';

import Cookie from "js-cookie";

import CategorySlider from "../components/filters/categorySlider";
import CartIcon from "../components/cart/cartWidget";
import SearchAndFilter from '../components/searchAndFilter';
import CartContext from '../components/context/cartContext';


function Home() {

  const cart = Cookie.getJSON("cart") || {items: [], total: 0};
  const [ thisCart, setThisCart ] = useState(cart);
  const [ drawerOpen, setDrawerOpen] = useState('closed');


  const highlights = [
    {title: 'In a rush?', subTitle: `Here's the fastest delivery for you`, ids: ['6205ba349bc0d23c302f199e', '6205bc1f9bc0d23c302f19a8','6202d343fd91dd000f4b2984', '6205bbcb9bc0d23c302f19a6'], sort: (a, b) => Number(a.deliveryTime.substring(0,2)) - Number(b.deliveryTime.substring(0,2)) },
    {title: 'Popular near you', subTitle: null, ids: ['6205ba349bc0d23c302f199e', '6202d343fd91dd000f4b2984', '6205baf29bc0d23c302f19a2', '6205bc1f9bc0d23c302f19a8' ], sort: null},
    {title: 'Family favorites', subTitle: null, ids: ['6205bbcb9bc0d23c302f19a6', '6205bc1f9bc0d23c302f19a8','6205ba9f9bc0d23c302f19a0', '6205baf29bc0d23c302f19a2'], sort: null}
  ]

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
    if (cuisine === id) {
      setCuisine(null)
    } else {
      setCuisine(id);    
    }
  }

  // TODO: Add components for offer carousel, three subsets of restaurants
  // TODO: Add components for explore by category, offer
  // TODO: Filter dishes according to query

  return (
      <CartContext.Provider value={{cart: thisCart, handleSetCart, drawerOpen, handleSetDrawer, openDrawer, closeDrawer}}>
        <CartIcon />
          <div style={{ minHeight:"160px" }}>
              <CategorySlider cuisine={cuisine} handleSetCuisine={handleSetCuisine}/>
          </div>
          
          <div className="flex">
            <SearchAndFilter cuisine={cuisine} highlights={highlights}/>
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
export default Home;
  