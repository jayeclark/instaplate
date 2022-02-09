import { Row } from "reactstrap";
import { isAvailable } from '../../scripts/time';
import DishCard from '../dish/dishCard';
import CartIcon from "../cart/cartWidget";

function Menu({ restId, menu, style }){

  const isThisMenuAvailable = isAvailable(menu.menuStart, menu.menuEnd, [menu.mon, menu.tue, menu.wed, menu.thu, menu.fri, menu.sat, menu.sun]);

  const Dishes = ({ name, dishes, isAvailable }) => {
  if (dishes.length === 0) { return null;}

  return (
      <>
        <CartIcon />
        <Row style={{margin: "0px", padding: "20px 15px 40px 15px"}}>
        <h2 style={{marginBottom: "0px", paddingBottom: "0px"}}>{name}</h2>
        {dishes.map((res, index) => (
          <DishCard 
            key={index}
            dish={res} 
            index={index} 
            isAvailable={isAvailable}
            menuStart={menu.menuStart}
            />
        ))}
        </Row>
        <style jsx>
          {`
            h2 {
              padding-bottom: 20px;
            }
          `}
        </style>
      </>
    )
  }

  const MenuCategories = ({categories, isAvailable}) => {

    return (
      <>
      {categories.map(({ id, name, dishes }) => {
        const dishesToRender = dishes.length > 0 ? dishes : [];
        return (
          <Dishes name={name} key={id} dishes={dishesToRender} isAvailable={isAvailable} />
        )
      })}
      </>
    )
  }

  if (restId){
    return (
    <div className="menu-details" style={style}>
      <MenuCategories categories={menu.menu_categories} isAvailable={isThisMenuAvailable}/>
    </div>
    )
  } else if (!restId) {
    return <h1> No Dishes</h1>
  }
}

export default Menu;