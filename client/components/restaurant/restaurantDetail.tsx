import Menus from './menus';
import RestaurantHeader from './restaurantHeader';

function RestaurantDetail({ restaurantID }) {

  return (
    <>
    <RestaurantHeader restID={restaurantID}/>
    <Menus restaurantID={restaurantID} initialMenu={null} />
    <div className="bottom-padding"></div>
    <style jsx>
      {`
        .bottom-padding {
          height: 0px;
          padding: 0px;
          margin: 0px;
        }

        @media only screen and (max-width: 796px) {
          .bottom-padding {
            height: 54px;
            padding: 0px;
            margin: 0px;
          }
        }
      `}
    </style>
    </>
  )

}
 
export default RestaurantDetail;
