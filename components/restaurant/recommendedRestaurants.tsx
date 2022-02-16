import {Container, Row, Col, Card} from "reactstrap";
import Link from "next/link";
import { useQuery } from '@apollo/client';

import { GET_RESTAURANTS } from '../../scripts/queries';
import { parseSRC } from "../../scripts/utilities"
import LeftRightArrows from "../UI/sliderArrows";

function RecommendedRestaurants({ ids, title, sort, subTitle }){
  
  if (!sort) {
    sort = (a, b) => b.price - a.price;
  }
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  
  if (loading) return <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "800px"}}><p>Loading...</p></div>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  const restaurants = data.restaurants.filter(x => ids.includes(x.id)).sort(sort)
  
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
      <div className="restaurant-line-container">
      <Container>
          <Row>
            <div className="title"><h2 style={{marginBottom: "0px", paddingBottom: "0px"}}>{title}</h2>{subTitle ? <small>{subTitle}</small> : null}</div>
          </Row>
          <Row xs="3" style={{overflowX:"scroll"}}>
            <LeftRightArrows numElements={restaurants.length}>
              <div style={{display:"flex"}}>
              {restaurants.map((rest: any, i: number) => (
              <Col xs="12" sm="6" lg="4" key={i}>
                  <Link as={"/restaurants/"+rest.id} href="/restaurants/[id]">
                    <a>
                      <Card style={{ margin: "0px 8px 20px 8px", border: "none" }}>
                        <div className="right-margin">
                          <div className="image-container">
                            <img
                                width="100%"
                                style={{ position: "relative", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                                src={parseSRC(rest)}
                              />
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0px 0px 0px"}}>
                            <span style={{textDecoration: "none", color: "#666"}}><b>{rest.name}</b></span>
                            <div style={{top: "-5px", backgroundColor: "#efefef", fontWeight: "bold", color: "#666", fontSize: "0.8rem", padding: "5px 8px", borderRadius: "15px"}}>{rest.rating}</div>
                          </div>
                          <div style={{ color: "#666", fontSize: "0.8rem" }}>
                            ${rest.deliveryFee} Delivery • {rest.deliveryTime}
                          </div>
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
      </div>
      <style jsx>{`
          .restaurant-line-container {
            margin-bottom: 0px; 
            overflowX: hidden;
            margin-left: -10px;
            margin-right: -10px;
          }
          .title {
            padding: 0px 16px 8px 26px;
          }
          .restaurant-card {
            margin: 0 8px 20px 8px;
            border: none;
            max-width: 20vw;
          }
          .right-margin {
            margin-right: 10px;
            margin-left: 10px;
          }
          .dish-lockup {
            position: relative;
            min-width: 120px;
            margin-right: 15px;
            cursor: pointer;
          }
          .image-container {
            overflow: hidden;
            height: 120px;
          }
          .image-container img {
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
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

          @media only screen and (max-width: 796px) {

            .right-margin {
              margin-right: 0px;
              margin-left: 20px;
            }
          }
        `}</style>

    </>
  )
}

export default RecommendedRestaurants