import { useRouter } from "next/router";

import RestaurantDetail from "../../components/restaurant/restaurantDetail";

export default function Restaurant({}) {
  const router = useRouter();
  const restaurantID = router.query.id;

  return (
    <>
      <RestaurantDetail restaurantID={restaurantID} />
    </>
    )
}