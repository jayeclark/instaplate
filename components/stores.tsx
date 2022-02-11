import {useState} from 'react';
import CategorySlider from "./filters/categorySlider";
import CartIcon from "./cart/cartWidget";
import SearchAndFilter from './searchAndFilter';

export default function Stores() {

  // TODO: Fix relevance sort (replace placeholder)

  const [cuisine, setCuisine] = useState(null);

  const handleSetCuisine = (id) => {
    setCuisine(id);
  }

  return (
    <div>
      <CartIcon />
      <div style={{ minHeight:"160px" }}>
            <CategorySlider cuisine={cuisine} handleSetCuisine={handleSetCuisine}/>
        </div>
        <div className="flex">
          <SearchAndFilter cuisine={cuisine}/>
        </div>
      <style jsx>{`
        .flex {
          display: flex;
          flex-wrap: nowrap;
          padding: 20px 0px;
        }
      `}</style>
    </div>
  )
}