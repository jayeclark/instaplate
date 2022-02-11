import {useState} from 'react';
import FilterSidebar from "./filters/filterSidebar";
import Search from "./filters/search";
import RestaurantCardsWrapper from "./restaurantCardsWrapper";
import RecommendedDishesWrapper from "./recommendedDishesWrapper";

export default function SearchAndFilter({cuisine}) {

  const [sort, setSort] = useState('relevance');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({dietary: [], price: [], cuisine: null, query: null})

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

  return (
    <>
      <Search global={true} handleSetQuery={handleSetQuery}/>
      <div style={{display: "flex", width: "100vw", flexWrap: "nowrap"}}>
        <div className="side-bar-container">
          <FilterSidebar handleAddQuery={handleAddQuery} handleRemoveQuery={handleRemoveQuery} filters={filters} handleSetSort={handleSetSort} />
        </div>
        <div style={{width: "70%"}}>
          <div className="restaurants">
          <RestaurantCardsWrapper sort={sort} cuisine={cuisine} filters={filters} query={query}/>
          </div>
          <div className="dishes">
          <RecommendedDishesWrapper sort={sort} filters={filters} query={query}/>
          </div>  
        </div>
      </div>
      <style jsx>{`

      @media only screen and (max-width: 796px) {
        .side-bar-container {
          display: none;
        }
        .restaurants,
        .dishes {
          width: 100vw;
          overflow: hidden;
        }
      }
      `}</style>
    </>
  )
}