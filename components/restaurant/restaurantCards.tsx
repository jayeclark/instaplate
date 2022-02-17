import Link from 'next/link';
import { useQuery } from '@apollo/client';
import {
  Container,
  Row,
  Col} from "reactstrap";

import { getAPIUrl } from '../../scripts/urls';
import { GET_RESTAURANTS } from '../../scripts/queries';
import Card from '../UI/Card';

function RestaurantCards({ filters, cuisine, sort, query }) {

  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  const list = query && query !== '' ? data.restaurants.filter(x => x.name.toLowerCase().includes(query.toLowerCase())) : data.restaurants;
  const API_URL = getAPIUrl();
  
  function relevance(a, b) {return b.name?.length - a.name?.length}
  function popularity(a, b) {return Number(b.recentOrders) - Number(a.recentOrders)}
  function rating(a, b) {return Number(b.rating) - Number(a.rating)}
  function delivery(a, b) {return Number(a.deliveryTime.substring(0,2)) - Number(b.deliveryTime.substring(0,2))}

  const sortFunctions = { relevance, popularity, rating, delivery }
  const sortFunction = sortFunctions[sort];

  // Restaurant, cuisine, price, dietary filters
  const cuisineFilter = (x) => cuisine ? x.types.find(({ id }) => id === cuisine) : true;
  const priceFilter = (x) => filters.price.length > 0 ? filters.price.includes(x.price) : true;
  const dietFilter = (x) => filters.dietary.length > 0 ? x.dietary_options.find(({id}) => filters.dietary.includes(id)) : true;

  // Apply filters
  let filteredRestaurants = list?.filter(cuisineFilter).filter(priceFilter).filter(dietFilter);

  if (filteredRestaurants.length === 0) {
    return(

      <Container style={{width: "100%", padding: "0px 20px"}}>
        <Row cols={1} style={{margin: "15px 0px 65px 0px", padding: "20px", border: "1px solid #dfdfdf"}}>
          <Col><h4> No restaurants match those filters!</h4></Col>
        </Row> 
      </Container>
  
    )
  }

  // Map fake delivery times and ratings
  const restaurantList = filteredRestaurants.map(x => {
    const { id, name, deliveryTime, deliveryFee, rating, recentOrders, image: { url }} = x
    return { id, name, url, rating, deliveryTime, deliveryFee, recentOrders };
  })

  let restList = restaurantList.sort(sortFunction).map(({ id, name, url, deliveryFee, deliveryTime, rating }) => (
    <Col xs="12" sm="6" lg="4" key={id}>
      <Link as={"/restaurants/"+id} href="/restaurants/[id]">
        <a>
          <Card style={{ margin: "0 8px 20px 8px", border: "none" }}>
            <div style={{height: "120px", overflow: "hidden"}}>
              <img
                width="100%"
                style={{ position: "relative", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                src={
                API_URL + url
                }
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0px 0px 0px"}}>
              <span style={{textDecoration: "none", color: "#666"}}><b>{name}</b></span>
              <div style={{top: "-5px", backgroundColor: "#efefef", fontWeight: "bold", color: "#666", fontSize: "0.8rem", padding: "5px 8px", borderRadius: "15px"}}>{rating}</div>
            </div>
            <div style={{ color: "#666", fontSize: "0.8rem" }}>
              ${deliveryFee} Delivery • {deliveryTime}
            </div>
          </Card>
        </a>
      </Link>
    </Col>
  ));

  return(

      <Container className="centered-container">
      <Row xs='3'>
        {restList}
      </Row> 
      <style jsx>{`
        .centered-container {
          width: 100%!important;
          padding: 0px 36px 0px 12px!important;
        }
        @media only screen and (max-width: 796px) {
          .centered-container {
            padding: 0px 12px 0px 12px!important;
          }
        }

      `}</style>
      </Container>
  
    )

}

export default RestaurantCards;

