
import { useEffect, useState } from "react";

import { useQuery } from '@apollo/client';

import { timeToString, isAvailable, timeInMinutes } from "../../scripts/time";
import { GET_RESTAURANT } from '../../scripts/queries';
import FilteredDishes from './filteredDishes';
import Search from "../filters/search";
import Menu from "./menu";

function Menus({restaurantID, initialMenu}) {

  const [dishString, setDishString] = useState('');
  const [currentMenu, setCurrentMenu] = useState(null);

  const handleSetDishString = (search: string) => {
    setDishString(search)
  };

  let menus = [];

  useEffect(() => {
    if (initialMenu) {
      setCurrentMenu(initialMenu)
    } else if (menus.length > 0 && currentMenu === null) {
      setCurrentMenu(menus[0].id)
    }
  })

  const { loading, error, data } = useQuery(GET_RESTAURANT, { variables: { id: restaurantID }})
  if (loading) return <div style={{padding: "100px", minHeight: "400px", textAlign: "center"}}><p>Loading menus...</p></div>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  menus = data.restaurant.menus;

  let filteredMenus = menus.filter(({ menuEnd, mon, tue, wed, thu, fri, sat, sun }) => {
    const days = [mon, tue, wed, thu, fri, sat, sun];
    const day = new Date().getDay();
    const hr = new Date().getHours();
    const min = new Date().getMinutes();

    return days[day] === true && timeInMinutes({ hr, min }) < timeInMinutes(menuEnd);
  }).sort((a, b) => {
    return timeInMinutes(a.menuStart) - timeInMinutes(b.menuStart);
  });

  if (filteredMenus.length === 0) {
    filteredMenus = menus;
  }

  const filteredDishes = !dishString ? [] : filteredMenus.reduce((a, b) => {
    const { menu_categories, menuStart, menuEnd, mon, tue, wed, thu, fri, sat, sun } = b;
    const isThisMenuAvailable = isAvailable(menuStart, menuEnd, [mon, tue, wed, thu, fri, sat, sun]);
    
    const dishes = menu_categories.reduce((x,y) => {
      x.push(...y.dishes.map(dish => {
        const tempDish = {...dish};
        tempDish.isAvailable = isThisMenuAvailable;
        tempDish.menu = b;
        return tempDish;
      }));
      return x;
    },[]);

    const dishSet = new Set(dishes);
    const uniqueDishes = Array.from(dishSet);
    const filteredDishes = uniqueDishes.filter((dish: any) => dish.name.toLowerCase().includes(dishString.toLowerCase()))
    return [...a, ...filteredDishes];
  },[]);

  return (
    <>
      <Search global={false} handleSetQuery={handleSetDishString}/>
      {dishString ? <FilteredDishes dishes={filteredDishes} /> : null}
      <div className="menu-toggler">
      <h3 style={{textAlign: "left", margin:"0px"}}>Menu</h3>
      <div className="menu-ribbon" style={{display: "flex"}}>
        {filteredMenus.length === 0 ? <div style={{ padding: "0px 15px" }}>Sorry, no menus available today!</div> : menus.map((menu,i) => {
          return (
          <MenuButton key={i} menu={menu} index={i} handleSetMenu={() => setCurrentMenu(menu.id)} style={{ borderBottom: menu.id === currentMenu ? "4px solid black" : null }}/>
          )
        })}
      </div>
      <div className="menu-display">
          {currentMenu ? <Menu restId={restaurantID} style={null} menu={filteredMenus.find((x:any) => x.id === currentMenu)} /> : null}
      </div>
      <style>{`
        .menu-toggler {
          margin: 0px 15px;
          padding: 25px;
          text-align: left;
        }

        .menu-ribbon {
          padding: 0px;
          margin-left: -15px;
          font-size: 0.9rem;
          font-weight: 300;
        }

        .menu-display {
          margin: 0px -25px;
        }
      `}</style>
      </div>
    </>
  )
}

function MenuButton({menu, index, handleSetMenu, style}) {

  const hours = timeToString(menu.menuStart) + ' - ' + timeToString(menu.menuEnd);
  return (
  <div 
    key={index} 
    className="menu-option" 
    onClick={() => handleSetMenu()}
    style={{
      padding: "5px 0px",
      margin: "0px 15px",
      display: "inline-block",
      cursor: "pointer",
      borderBottom: index === 0 ? "4px solid black" : "4px solid transparent",
      height: "40px",
      lineHeight: "30px",
      ...style,
    }}
  >
    <span className="menu-name" style={{ fontWeight: index === 0 ? '600' : 'normal' }}>
      {menu.name}
    </span>
    <span className="hours">&nbsp;({hours})</span>
  </div>
  )
}

export default Menus;