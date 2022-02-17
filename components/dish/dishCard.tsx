import { useState, useRef } from 'react';

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col} from "reactstrap";

import { current } from '../../scripts/utilities';
import { parseSRC } from '../../scripts/utilities';
import AddRemoveButton from "../cart/addRemoveButton";
import NotAvailable from '../restaurant/notAvailable';
import DishDetail from "./dishDetail";
import styles from '../../styles/Dishes.module.css';

export default function DishCard({dish, index, isAvailable, menuStart}) {
  
  const [displayDetails, setDisplayDetails] = useState(false);
  const handleSetDisplay = (bool: boolean) => setDisplayDetails(bool);
  
  const dishRef = useRef();

  return (
    <>
    <Col key={index} xs="12" sm="6" md="4" style={{ padding: 0 }}
      onMouseEnter={() => current(dishRef).classList.add("expanded")}
      onMouseLeave={() => current(dishRef).classList.remove("expanded")}
      onClick={()=>handleSetDisplay(true)}
    >
      <div ref={dishRef} className={styles["dish-lockup"]}>
      <Card 
        style={{ height: "100%", margin: "0px 10px", position: "relative", border: "none" }} 
        >
          <div className={styles["dish-lockup-img-container"]}>
          <div className={styles["dish-lockup-img"]}>
          <CardImg
          top={true}
          height={'200px'}
          position="center"
          src={parseSRC(dish)}
        />
        </div>
          </div>

        <CardBody style={{padding: "10px 15px"}}>
          <CardTitle>
            <div><b>{dish.name}</b></div>
            <div style={{ textAlign: "left", fontWeight: "300", fontSize: "0.9rem" }}>${dish.price}</div>
          </CardTitle>
          <CardText style={{ fontSize: "0.8rem", fontWeight: "300"}}>
            {dish.description}
          </CardText>
        </CardBody>
        {isAvailable ? <AddRemoveButton item={dish} /> : <NotAvailable menuStart={menuStart}/> }
      </Card>
      </div>
    </Col>
    <DishDetail dish={displayDetails ? dish : null} handleCloseDish={() => handleSetDisplay(false)}/>
    </>
  )
}