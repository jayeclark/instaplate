import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import RecommendedRestaurants from './recommendedRestaurants';
import { GET_RESTAURANTS } from '../scripts/queries';

function RestaurantsWrapper({ids, title, subTitle}) {

  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  return <RecommendedRestaurants title={title} subTitle={subTitle} restaurants={memoizedData.restaurants.filter(x => ids.includes(x.id))} />

}

export default RestaurantsWrapper;

