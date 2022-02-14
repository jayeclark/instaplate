import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import RecommendedRestaurants from './recommendedRestaurants';
import { GET_RESTAURANTS } from '../scripts/queries';

function RestaurantsWrapper({ids, title, subTitle, sort}) {

  console.log(sort);
  
  if (!sort) {
    sort = (a, b) => b.price - a.price;
  }
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  return <RecommendedRestaurants title={title} subTitle={subTitle} restaurants={data.restaurants.filter(x => ids.includes(x.id)).sort(sort)} />

}

export default RestaurantsWrapper;

