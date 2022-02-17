import { useContext } from "react";

import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "../../../scripts/queries";
import UserContext from "../../../components/context/userContext";
import Unauthorized from "../../unauthorized";
import OrderItem from "../../../components/order/orderItem";
import styles from '../../../styles/Cart.module.css';

export default function Orders() {

  const { user, isAuthenticated } = useContext(UserContext)

  if (!isAuthenticated && !user) {
    return <Unauthorized type="signIn" />
  }

  const { loading, error, data } = useQuery(GET_ORDERS, { variables: { authorization: `Bearer ${user.token}`, email: user.email }})
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  const { orders } = data;
  const parseDate = (dateString) => {
    const monthDay = dateString.replace(/T.+/,'').replace(/^[^-]+-/,'');
    const year = dateString.replace(/T.+/,'').replace(/(^[^-]+)(-.+)/,'$1');
    return monthDay + "-" + year;
  }

  const parseTime = (dateString) => {
    const time = dateString.replace(/^.+T/,'').substring(0,5);
    let hour = Number(time.substring(0,2));
    const minute = time.substring(3,5);
    const amPM = hour >= 12 ? "PM" : "AM";
    if (hour > 12) { hour -= 12; }
    if (hour === 0) { hour = 12; }
    return hour + ":" + minute + amPM;
  }

  const Order = ({order, orderID}) => (
    <div style={{padding: "10px 10px 0px 10px", margin: "5px", border: "1px solid #efefef", borderRadius: "8px"}}>
      <div>
      <h3>Order #{orderID + 1}</h3>
      <h6>{order.dishes.reduce((a:number, dish:any) => dish.quantity + a, 0)} items · Placed on {parseDate(order.createdAt)} at {parseTime(order.createdAt)}</h6>
      </div>
      <div>
        {order.dishes.map((dish: any) => (<OrderItem item={dish}/>))}
      </div>
      <div
      className={styles.cartItemRow}
      style={{ paddingTop: 15, fontSize: "0.9rem", width: "100%", textAlign: "right", justifyContent: "right" }}
      >
        <div>
          <p>Item subtotal:<span style={{display: "inline-block", minWidth: "80px"}}>${order.dishes.reduce((a: number, dish: any) => a + dish.quantity * dish.price, 0).toFixed(2)}</span></p>
          <p>Delivery fee:<span style={{display: "inline-block", minWidth: "80px"}}>${order.dishes[0].restaurant.deliveryFee.toFixed(2)}</span></p>
          <p>Service fee:<span style={{display: "inline-block", minWidth: "80px"}}>${(order.dishes.reduce((a: number, dish: any) => a + dish.quantity * dish.price, 0) * 0.10 + 0.01).toFixed(2)}</span></p>
          <p><b>Grand Total:<span style={{display: "inline-block", minWidth: "80px"}}>${(order.amount / 100).toFixed(2)}</span></b></p>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{padding: "75px 10% 35px 10%"}}>
      <h1 style={{marginBottom: "30px"}}>Your Recent Orders</h1>
      {orders.reverse().map((order: any, i: number)=> (<Order order={order} orderID={i} />))}</div>
  )

}