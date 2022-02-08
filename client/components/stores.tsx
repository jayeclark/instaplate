import {useState} from 'react';
import CategorySlider from "./filters/categorySlider";
import CartIcon from "./cart/cartWidget";
import SearchAndFilter from './searchAndFilter';

export default function Stores() {

  // TODO: Fix relevance sort (replace placeholder)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  const [cuisine, setCuisine] = useState(null);

  const handleSetCuisine = (id) => {
    setCuisine(id);
  }

  return (
    <div>
      <CartIcon />
      <div style={{ minHeight:"160px" }}>
            <CategorySlider handleSetCuisine={handleSetCuisine}/>
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