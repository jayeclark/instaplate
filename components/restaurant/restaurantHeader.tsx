import { useQuery } from '@apollo/client';

import { GET_RESTAURANT } from '../../scripts/queries';
import { getAPIUrl } from '../../scripts/urls';
import { parseSRC } from '../../scripts/utilities';

export default function RestaurantHeader({ restID }) {

  const API_URL = getAPIUrl();
  const { loading, error, data } = useQuery(GET_RESTAURANT, { variables: { id: restID }})
  if (loading) return <div style={{minHeight: "360px", justifyContent: "center", alignItems: "center", display: "flex", padding: "50px", textAlign: "center"}}><p>Loading restaurant info...</p></div>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  const { name, description, rating, price, types, deliveryTime, image } = data.restaurant;

  return (
    <>
    <div className="restaurant-hero">
    <img 
      className="restaurant-image" 
      width="100%"
      style={{objectPosition: "50% 50%", transform: "translateY(-50%)"}}
      object-position="center center"
      src={parseSRC({ image })}
    />
    </div>
    <div className="restaurant-card">
      <div className="restaurant-description">
        <h1 style={{marginBottom: "0px"}}>{name}</h1>
        <p style={{padding: "0px", margin:"0px 0px 8px 0px", fontSize:"0.7rem", color:"#888"}}>{description}</p>
        <p style={{padding: "0px", margin:"0px", fontSize:"0.8rem", fontWeight: "600"}}>
          <img height="18px" style={{display: "inline-block", paddingRight: "5px", paddingBottom: "4px"}} src="/images/star.png"/>
          {rating} (500+ ratings) • {types.map(t => t.title).join(', ')} • {'$'.repeat(price)}<br />
          <span style={{fontWeight: "normal"}}>{deliveryTime}</span>
        </p>
      </div>
    </div>
    <style jsx>
        {`
          .restaurant-hero {
            margin: -8px -15px;
            width: calc(100vw + 15px);
            height: 180px;
            overflow: hidden;
          }
          .restaurant-card {
            margin: 0px;
            padding: 25px;
            border: 1px solid #ccc;
            border: none;
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            text-align: left;
          }

          .restaurant-image {
            margin: 0px 15px;
          }

          .restaurant-description {
            margin: 0px 15px;
            text-align: left;
            width: 100%;
          }

          @media only screen and (max-width: 576px) {
            .restaurant-hero {
              display: none;
            }

            .restaurant-description {
              text-align: center;
            }
          }
        `}
      </style>

  </>
  )
}
