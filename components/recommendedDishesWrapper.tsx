import { useQuery } from '@apollo/client';
import RecommendedDishes from './recommendedDishes';
import { GET_DISHES } from '../scripts/queries';

function DishesWrapper({query, sort, filters}) {

  const { loading, error, data } = useQuery(GET_DISHES)
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  return <RecommendedDishes sort={sort} filters={filters} dishes={query !== '' ? data.dishes.filter(x => x.name.toLowerCase().includes(query.toLowerCase())).slice(0,50) : data.dishes.slice(0,10)} />

}

export default DishesWrapper;

