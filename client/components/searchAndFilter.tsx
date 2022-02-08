import {useState} from 'react';
import FilterSidebar from "./filters/filterSidebar";
import Search from "./filters/search";
import RestaurantCardsWrapper from "./restaurantCardsWrapper";
import RecommendedDishesWrapper from "./recommendedDishesWrapper";

export default function SearchAndFilter({cuisine}) {

  const [sort, setSort] = useState('relevance');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({dietary: [], price: [], cuisine: null})

  const handleSetQuery = (str: string) => setQuery(str);
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
      <FilterSidebar handleAddQuery={handleAddQuery} handleRemoveQuery={handleRemoveQuery} filters={filters} handleSetSort={handleSetSort} />
      <div>
        <div>
        <RestaurantCardsWrapper sort={sort} cuisine={cuisine} filters={filters} query={query}/>
        </div>
        <div>
        <RecommendedDishesWrapper sort={sort} filters={filters} query={query}/>
        </div>  
      </div>
    </>
  )
}