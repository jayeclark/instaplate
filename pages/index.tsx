import {useState, useContext} from 'react';
import CategorySlider from "../components/filters/categorySlider";
import CartIcon from "../components/cart/cartWidget";
import SearchAndFilter from '../components/searchAndFilter';
import CartContext from '../components/context/cartContext';
import UserContext from '../components/context/userContext';

function Home() {

  const { cart } = useContext(UserContext);
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
    console.log("set cart called");
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
            <SearchAndFilter cuisine={cuisine} />
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
  