import RestaurantDetail from "../../components/restaurant/restaurantDetail";
import { useRouter } from "next/router";

export default function Restaurant({}) {
  const router = useRouter();
  const restaurantID = router.query.id;

  return (
    <>
      <RestaurantDetail restaurantID={restaurantID} />
    </>
    )
}