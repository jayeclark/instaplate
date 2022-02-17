/* pages/checkout.js */

import { useContext, useState, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Link from "next/link";
import Cookie from "js-cookie";

import CheckoutForm from "../components/checkout/checkoutForm";
import UserContext from "../components/context/userContext";
import styles from "../styles/Checkout.module.css";
import navStyles from "../styles/Navigation.module.css";


function Checkout() {
  // get app context
  const {isAuthenticated} = useContext(UserContext);

  const [currentCart, setCurrentCart] = useState({items: [], total: 0});

  const cart = Cookie.getJSON("cart") || {items: [], total: 0};
    
  useEffect(() => {
    setCurrentCart(cart);
  },[]);

  const {total} = currentCart;
  const serviceFee = total * 0.10 + 0.01;
  const deliveryFee = currentCart.items.length > 0 ? currentCart.items[0].restaurant.deliveryFee : 0;
  const grandTotal = (total + serviceFee + deliveryFee).toFixed(2);

  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    "pk_test_51K9s9CKfDYuSYV2wNyHJYXZADEwza6qOZtQljALfWU0f4CTtH4hUR41XbdLWxCtXfPTyNjgb8lsD2TOA9ykh9PtD00e13yO8Bg"
  );

  const handleToggleSignIn = () => {
    const element = document.getElementById("loginScreen");
    const background = document.getElementById("modalBackground");
    background.style.display = "block";
    setTimeout(() => {background.style.opacity = "1"}, 20);
    setTimeout(() => {element.classList.add(navStyles.showLoginDrawerContainer)},20);
  }

  return (
    <Container className="checkout" style={{minHeight: "calc(100vh - 70px)", backgroundColor: "rgb(246, 249, 252)"}}>
    <Row>
      <Col style={{ paddingLeft: 5,  paddingRight: 5 }} xs={{ size: 10, order: 1, offset: 1 }} sm={{ size: 6, order: 1, offset: 1 }}>
        <Elements stripe={stripePromise}>
          {currentCart.items.length > 0 && isAuthenticated && <CheckoutForm />}
          {currentCart.items.length > 0 && !isAuthenticated && (
            <div className={styles.paper}>
              <div style={{height: "fit-content"}}>
                Please <a style={{cursor: "pointer"}} onClick={handleToggleSignIn}>sign in</a> to continue with checkout.
              </div>
            </div>
          )}          
          {currentCart.items.length === 0 && (
            <div className={styles.paper}>
              <div style={{height: "fit-content"}}>
                There are no items in your cart. Please add items to your cart in order to check out.
              </div>
            </div>
          )}
        </Elements>
      </Col>
      <Col style={{ paddingRight: 5, paddingLeft: 5 }} xs={{ size: 10, order: 1, offset: 1 }} sm={{ size: 4, order: 2, offset: 0 }}>
        <div className={styles.paper}>
          <div style={{display: "flex", alignItems: "center", paddingBottom: "15px"}}>
            <div style={{paddingRight: "10px"}}><img height="50px" src="/images/guarantee.png" /></div>
            <div>
              <div style={{color: "rgb(43, 120, 198)", fontWeight: "700", fontSize: "0.75rem"}}>100% satisfaction guarantee</div>
              <div style={{fontWeight: "600", fontSize: "0.75rem"}}>Place your order with peace of mind.</div>
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "5px"}}>
            <div style={{fontWeight: "600", fontSize: "0.75rem"}}>Item subtotal</div>
            <div style={{fontSize: "0.75rem"}}>${total.toFixed(2)}</div>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "5px"}}>
            <div style={{fontWeight: "600", fontSize: "0.75rem"}}>Delivery fee</div>
            <div style={{fontSize: "0.75rem"}}>${deliveryFee.toFixed(2)}</div>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "5px"}}>
            <div style={{fontWeight: "600", fontSize: "0.75rem"}}>Service fee</div>
            <div style={{fontSize: "0.75rem"}}>${serviceFee.toFixed(2)}</div>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0px", borderBottom: "1px solid #efefef", borderTop: "1px solid #efefef"}}>
            <div style={{fontWeight: "600", fontSize: "0.75rem"}}>Subtotal</div>
            <div style={{fontWeight: "600", fontSize: "0.75rem"}}>${grandTotal}</div>
          </div>
          <div style={{color:"rgb(10, 173, 10)", fontSize: "0.9rem", padding: "40px 0px", textAlign: "center"}}>Add promo code or gift card</div>
          <div style={{backgroundColor: "rgb(250,250,250)", fontSize: "0.6rem"}}><p>By placing your order, you agree to be bound by the Instacart <Link href="/terms"><a>Terms of Service</a></Link> and <Link href="/privacy"><a>Privacy Policy</a></Link>. Your credit/debit card will be <b>temporarily authorized for ${grandTotal}</b>. Your statement will reflect the final order total after order completion. <Link href="/info"><a>Learn more</a></Link>
          </p>
          <p>Prices may vary from those in restaurant.</p></div>
        </div>
      </Col>
      <style jsx global>
        {`
          body,
          html {
            background-color: #f6f9fc!important;
            font-size: 18px;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          }
          input {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif!important;
          }
          * {
            box-sizing: border-box;
          }
          #user-id,
          #zip-marker,
          #zip-value {
            display: none;
          }
          .checkout h1 {
            color: #32325d;
            font-weight: 400;
            line-height: 50px;
            font-size: 40px;
            margin: 20px 0;
            padding: 0;
          }
          .checkout label {
            color: #6b7c93;
            font-weight: 300;
            letter-spacing: 0.025em;
          }
          .checkout button {
            white-space: nowrap;
            border: 0;
            outline: 0;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            color: #fff;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            background-color: #6772e5;
            text-decoration: none;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
            margin-top: 10px;
          }
          .checkout form {
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 3px solid #e6ebf1;
          }

          .checkout input,
          .StripeElement {
            display: block;
            background-color: #f8f9fa !important;
            margin: 10px 0 20px 0;
            max-width: 500px;
            padding: 10px 14px;
            font-size: 1em;
            font-family: "Source Code Pro", monospace;
            box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
              rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            background: white;
          }
          .checkout input::placeholder {
            color: #aab7c4;
          }
          .checkout input:focus,
          .StripeElement--focus {
            box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
              rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
          }
          .StripeElement.IdealBankElement,
          .StripeElement.PaymentRequestButton {
            padding: 0;
          }
        `}
      </style>
    </Row>
    </Container>
  );
  // }
}
export default Checkout;
