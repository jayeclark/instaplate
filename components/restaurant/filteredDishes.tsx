import { useState } from 'react';

import { Row } from "reactstrap";

import { isAvailable } from '../../scripts/time';
import { timeInMinutes } from '../../scripts/time';
import DishCard from '../dish/dishCard';
import CartIcon from '../cart/cartWidget';

export default function FilteredDishes({dishes}) {

  const sortFunctions = {
    priceAscending: function(a,b) { return a.price - b.price; },
    priceDescending: function(a,b) { return b.price - a.price; },
    alphabetical: function(a,b) { 
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    },
    availability: function(a,b) { return timeInMinutes(a.menu.menuStart) - timeInMinutes(b.menu.menuStart)}
  };

  const [sort, setSort] = useState("availability");

  return (
    <div style={{padding: "0px 15px"}}>
      <CartIcon />
    <Row style={{margin: "0px", padding: "20px 15px 40px 15px"}}>
      <h2 style={{marginBottom: "0px", paddingBottom: "0px"}}>Search Results</h2>
      <div className='sort-options'>
        <div className="sort-option" style={{paddingLeft: "0px" }}>Sort By: </div>
        <div className={sort === "availability" ? "active-sort-option" : "sort-option"} onClick={()=>setSort("availability")}>Availability</div>
        <div className={sort === "alphabetical" ? "active-sort-option" : "sort-option"}  onClick={()=>setSort("alphabetical")}>Alphabetical</div>
        <div className={sort === "priceAscending" ? "active-sort-option" : "sort-option"}  onClick={()=>setSort("priceAscending")}>Price (Ascending)</div>
        <div className={sort === "priceDescending" ? "active-sort-option" : "sort-option"}  onClick={()=>setSort("priceDescending")}>Price (Descending)</div>
      </div>
      {dishes.length === 0 ? <div style={{paddingTop: "20px"}}>Sorry, no dishes match your search!</div> : dishes.sort(sortFunctions[sort]).map((res: any, index: number) => {
        const {menuStart, menuEnd, mon, tue, wed, thu, fri, sat, sun} = res.menu;
        return (
          <DishCard 
            key={index}
            dish={res} 
            index={index} 
            isAvailable={isAvailable(menuStart, menuEnd, [mon, tue, wed, thu, fri, sat, sun])}
            menuStart={res.menu.menuStart}
          />
        )
      })}
    </Row>
    <style jsx>
      {`
        h2 {
          padding-bottom: 20px;
        }
        .sort-options {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
        }
        .sort-option {
          padding: 5px 10px;
          cursor: pointer;
          border-bottom: 4px solid transparent;
          font-weight: 400;
        }
        .active-sort-option {
          padding: 5px 10px;
          cursor: pointer;
          border-bottom: none;
          font-weight: 400;
          border-bottom: 4px solid black;
          font-weight: 600;
        }
      `}
      </style>
    </div>

  )
}