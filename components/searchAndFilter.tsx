import {useState} from 'react';

import FilterSidebar from "./filters/filterSidebar";
import Search from "./filters/search";
import RecommendedRestaurants from './restaurant/recommendedRestaurants';
import RecommendedDishes from './dish/recommendedDishes';
import RestaurantCards from './restaurant/restaurantCards';

export default function SearchAndFilter({cuisine, highlights}) {

  const [sort, setSort] = useState('relevance');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({dietary: [], price: [], query: null})

  const handleSetQuery = (str: string) => {
    const newFilters = {...filters};
    newFilters.query = str;
    setFilters(newFilters);
    setQuery(str);
  };
  const handleAddQuery = (key, value) => {
    if (filters[key].includes(value) === false) {
      const tempFilters = {...filters};
      tempFilters[key].push(value);
      setFilters(tempFilters);
    }
  }
  const handleRemoveQuery = (key, value) => {
    if (filters[key].includes(value)) {
      const tempFilters = { ...filters};
      tempFilters[key] = filters[key].filter(x => x !== value);
      setFilters(tempFilters);
    }
  }
  const handleSetSort = (str) => {
    setSort(str);
  }

  const shouldHideFeaturedRestaurants = () => {
    return ((query && query !== '') 
            || cuisine 
            || filters.price.length > 0 
            || filters.dietary.length > 0 
            || sort !== 'relevance')
  }

  return (
    <>
      <Search global={true} handleSetQuery={handleSetQuery}/>
      <div style={{display: "flex", width: "100vw", flexWrap: "nowrap"}}>
        <div className="side-bar-container" style={{width: "30%", maxWidth: "390px"}}>
          <FilterSidebar handleAddQuery={handleAddQuery} handleRemoveQuery={handleRemoveQuery} filters={filters} handleSetSort={handleSetSort} />
        </div>
        <div className="right-side">
          {shouldHideFeaturedRestaurants() ? null : highlights.map((highlight: any, i: number) => (
            <RecommendedRestaurants key={i} ids={highlight.ids} sort={highlight.sort} title={highlight.title} subTitle={highlight.subTitle} />
          ))}
          {shouldHideFeaturedRestaurants() ? null :  (
            <div className="feature-divider">
            </div>
          )}
          <div className="restaurants">
          <RestaurantCards sort={sort} cuisine={cuisine} filters={filters} query={query}/>
          </div>
          <div className="dishes">
          <RecommendedDishes sort={sort} filters={filters} query={query}/>
          </div>  
        </div>
      </div>
      <style jsx>{`
      .right-side {
        width: 70%;
        padding-right: 20px;
      }
      .feature-divider {
        margin-right: 15px;
        margin-left: 15px; 
        border-bottom: 3px solid #666; 
        margin-bottom: 30px;
      }
      @media only screen and (max-width: 796px) {
        .side-bar-container {
          display: none;
        }
        .right-side {
          width: 100vw;
        }
        .restaurants,
        .dishes {
          width: 100vw;
          overflow: hidden;
        }
        .feature-divider {
          margin-right: 20px;
          margin-left: 40px; 
        }
      }
      `}</style>
    </>
  )
}