import { useQuery } from '@apollo/client';
import RestaurantCards from './restaurantCards';
import { GET_RESTAURANTS } from '../scripts/queries';

function RestaurantCardsWrapper({ sort, query, filters, cuisine }) {

  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  return <RestaurantCards sort={sort} cuisine={cuisine} filters={filters} list={data.restaurants.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))} />

}

export default RestaurantCardsWrapper;

