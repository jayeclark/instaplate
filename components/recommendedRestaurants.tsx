import {useState} from "react";

import {Container, Row, Col, Card} from "reactstrap";
import Link from "next/link";

import { getAPIUrl } from "../scripts/urls";
import { parseSRC } from "../scripts/utilities"
import LeftRightArrows from "./UI/sliderArrows";

function RecommendedRestaurants({ title, restaurants, subTitle }){

  const API_URL = getAPIUrl();

  if (restaurants.length === 0) {
    return(

      <Container style={{width: "100%", padding: "0px 20px"}}>
        <Row>
          <div style={{padding: "0px 5px"}}><h2>{title}</h2>{subTitle ? subTitle : null}</div>
        </Row>
        <Row cols={1} style={{margin: "15px 0px 15px 0px", padding: "20px", border: "1px solid #dfdfdf"}}>
          <Col><h4> No restaurants match those filters!</h4></Col>
        </Row> 
      </Container>
  
    )
  }

  return (
    <>
      <Container style={{width: "100%", padding: "0px 12px", marginBottom: "25px", borderBottom: "1px solid #efefef", overflowX: "hidden"}}>
          <Row>
            <div style={{padding: "0px 16px 8px 16px"}}><h2 style={{marginBottom: "0px", paddingBottom: "0px"}}>{title}</h2>{subTitle ? <small>{subTitle}</small> : null}</div>
          </Row>
          <Row style={{width: "100%", overflowX:"scroll"}}>
            <LeftRightArrows numElements={restaurants.length}>
              <div style={{display:"flex"}}>
              {restaurants.map((rest: any, i: number) => (
              <Col xs="12" sm="6" md="4" key={i}>
              <Link as={"/restaurants/"+rest.id} href="/restaurants/[id]">
                <a>
                  <Card style={{ margin: "0 8px 20px 8px", border: "none" }}>
                    <div style={{height: "120px", overflow: "hidden", backgroundSize: "100% auto", backgroundImage: `url(${API_URL + rest.image.url})`}}>
                      <img
                          width="100%"
                          style={{position: "relative", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                          src={
                          API_URL + rest.image.url
                          }
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0px 0px 0px"}}>
                      <span style={{textDecoration: "none", color: "#666"}}><b>{rest.name}</b></span>
                      <div style={{top: "-5px", backgroundColor: "#efefef", fontWeight: "bold", color: "#666", fontSize: "0.8rem", padding: "5px 8px", borderRadius: "15px"}}>{rest.rating}</div>
                    </div>
                    <div style={{ color: "#666", fontSize: "0.8rem" }}>
                      ${rest.deliveryFee} Delivery • {rest.deliveryTime}
                    </div>
                  </Card>
                </a>
              </Link>
              </Col>
                )
              )}
              </div>
            </LeftRightArrows>
          </Row>
      </Container>
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

export default RecommendedRestaurants