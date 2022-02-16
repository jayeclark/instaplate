import {useState} from "react";

import {Container, Row, Col} from "reactstrap";
import { useQuery } from '@apollo/client';

import { GET_DISHES } from '../../scripts/queries';
import { parseSRC } from "../../scripts/utilities"
import LeftRightArrows from "../UI/sliderArrows";
import DishDetail from "./dishDetail";

function RecommendedDishes({ query, filters, sort }){

  const { loading, error, data } = useQuery(GET_DISHES)
  const [currentDish, setCurrentDish] = useState(null);

  if (loading) return <div style={{minHeight: "422px"}}><p>Loading...</p></div>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  const dishes = query && query !== '' ? data.dishes.filter(x => x.name.toLowerCase().includes(query.toLowerCase())).slice(0,50) : data.dishes.slice(0,10);

  const handleCloseDish = () => {
    setCurrentDish(null);
  }

  const handleSetDish = (dishID: string) => {
    setCurrentDish(dishID)
  }
  
  const getDish = (dishID: string) => {
    return dishes.filter((x: any) => x.id === dishID)[0];
  }

  if (dishes.length === 0) {
    return(

      <Container style={{width: "100%", padding: "0px 20px"}}>
        <Row>
          <div><h2>Recommended Dishes</h2></div>
        </Row>
        <Row cols={1} style={{margin: "15px 0px 15px 0px", padding: "20px", border: "1px solid #dfdfdf"}}>
          <Col><h4> No dishes match those filters!</h4></Col>
        </Row> 
      </Container>
  
    )
  }

  return (
    <>
      <Container style={{width: "100%", padding: "0px 12px", overflowX: "hidden"}}>
          <Row>
            <div><h2>Recommended Dishes</h2></div>
          </Row>
          <Row style={{width: "100%", overflowX:"scroll"}}>
            <LeftRightArrows numElements={dishes.length}>
              <div style={{display:"flex"}}>
              {dishes.map((dish: any, i: number) => (
                <div key={i}>
                  <div className="dish-lockup" onClick={()=>handleSetDish(dish.id)}>
                    <div className="image-container" style={{backgroundImage: `url(${parseSRC(dish)})`, position: "relative"}}><img object-fit="cover" height="100%" src={parseSRC(dish)}></img></div>
                    <div><b>{dish.name}</b></div>
                    <div>{dish.restaurant.name}</div>
                    <div className="price-button"><div>${dish.price.toFixed(2)}</div></div>
                  </div>
                </div>
                )
              )}
              </div>
            </LeftRightArrows>
          </Row>
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