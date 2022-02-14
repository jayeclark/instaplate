import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import RecommendedRestaurants from './recommendedRestaurants';
import { GET_RESTAURANTS } from '../scripts/queries';

function RestaurantsWrapper({ids, title, subTitle, sort}) {

  if (!sort) {
    sort = (a, b) => b.price - a.price;
  }
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  
  if (loading) return <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "800px"}}><p>Loading...</p></div>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  return <RecommendedRestaurants title={title} subTitle={subTitle} restaurants={data.restaurants.filter(x => ids.includes(x.id)).sort(sort)} />

}

export default RestaurantsWrapper;

