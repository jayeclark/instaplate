import {useState} from 'react';
import CategorySlider from "../components/filters/categorySlider";
import CartIcon from "../components/cart/cartWidget";
import SearchAndFilter from '../components/searchAndFilter';

function Home() {

    const [cuisine, setCuisine] = useState(null);

    const handleSetCuisine = (id) => {
      setCuisine(id);
    }

    // TODO: Add components for offer carousel, three subsets of restaurants
    // TODO: Add components for explore by category, offer
    // TODO: Filter dishes according to query

    return (
        <div>
          <CartIcon />
            <div style={{ minHeight:"160px" }}>
                <CategorySlider handleSetCuisine={handleSetCuisine}/>
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
        </div>
    )
  }
  export default Home;
  