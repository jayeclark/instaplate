import {useState} from "react";

import {Container, Row } from "reactstrap";

import DishDetail from "./dish/dishDetail";
import { getAPIUrl } from "../scripts/urls";
import { parseSRC } from "../scripts/utilities"

function RecommendedDishes({ dishes, filters, sort }){

  const API_URL = getAPIUrl();
  const [currentDish, setCurrentDish] = useState(null);

  const handleCloseDish = () => {
    setCurrentDish(null);
  }

  const handleSetDish = (dishID: string) => {
    setCurrentDish(dishID)
  }
  
  const getDish = (dishID: string) => {
    return dishes.filter((x: any) => x.id === dishID)[0];
  }

  return (
    <>
      <Container style={{overflowX: "hidden"}}>
        <div style={{overflowX: "hidden", marginRight: "10px"}}>
          <Row style={{overflowX:"scroll"}}>
          <div><h2>Recommended Dishes</h2></div>
          <div style={{display:"flex"}}>
          {dishes.map((dish: any, i: number) => (
            <div key={i}>
              <div className="dish-lockup" onClick={()=>handleSetDish(dish.id)}>
                <div className="image-container"><img object-fit="cover" src={parseSRC(dish)}></img></div>
                <div><b>{dish.name}</b></div>
                <div>{dish.restaurant.name}</div>
                <div className="price-button"><div>${dish.price.toFixed(2)}</div></div>
              </div>
            </div>
            )
          )}
          </div>
          </Row>
        </div>
      </Container>
      {currentDish ? <DishDetail dish={getDish(currentDish)} handleCloseDish={handleCloseDish} /> : null}
      <style jsx>{`
          .dish-lockup {
            position: relative;
            min-width: 120px;
            margin-right: 15px;
            cursor: pointer;
          }
          .image-container {
            max-Width: 120px;
            overflow: hidden;
            height: 120px;
          }
          .image-container img {
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            object-fit: cover;
          }
          .price-button {
            background-color: rgba(0,0,0,0.6);
            color: white;
            font-size: 0.8rem;
            position: absolute;
            right: 8px;
            top: 8px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            border-radius: 12px;
          }
        `}</style>

    </>
  )
}

export default RecommendedDishes