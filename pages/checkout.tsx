/* pages/checkout.js */

import { useContext } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkout/checkoutForm";
import UserContext from "../components/context/userContext";
import HandlerContext from "../components/context/handlerContext";
import styles from "../styles/Checkout.module.css";
import Link from "next/link";

function Checkout() {
  // get app context
  const {isAuthenticated} = useContext(UserContext);
  const {getCart} = useContext(HandlerContext);

  const cart: any = getCart();

  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    "pk_test_51K9s9CKfDYuSYV2wNyHJYXZADEwza6qOZtQljALfWU0f4CTtH4hUR41XbdLWxCtXfPTyNjgb8lsD2TOA9ykh9PtD00e13yO8Bg"
  );

  return (
    <Row>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 1, offset: 1 }}>
        <Elements stripe={stripePromise}>
          {cart.items.length > 0 && <CheckoutForm />}
          {cart.items.length > 0 && !isAuthenticated && (
            <div className={styles.paper}>
              <div style={{height: "fit-content"}}>
                Please sign in order to continue.
              </div>
            </div>
          )}          
          {cart.items.length === 0 && (
            <div className={styles.paper}>
              <div style={{height: "fit-content"}}>
                There are no items in your cart. Please add items to your cart in order to check out.
              </div>
            </div>
          )}
        </Elements>
      </Col>
      <Col style={{ paddingRight: 0 }} sm={{ size: 4, order: 2, offset: 0 }}>
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
            <div style={{fontSize: "0.75rem"}}>${cart.total.toFixed(2)}</div>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "5px"}}>
            <div style={{fontWeight: "600", fontSize: "0.75rem"}}>Service fee</div>
            <div style={{fontSize: "0.75rem"}}>${(cart.total * 0.1).toFixed(2)}</div>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0px", borderBottom: "1px solid #efefef", borderTop: "1px solid #efefef"}}>
            <div style={{fontWeight: "600", fontSize: "0.75rem"}}>Subtotal</div>
            <div style={{fontWeight: "600", fontSize: "0.75rem"}}>${(Number(cart.total.toFixed(2)) + Number((cart.total * 0.1).toFixed(2))).toFixed(2)}</div>
          </div>
          <div style={{color:"rgb(10, 173, 10)", fontSize: "0.9rem", padding: "40px 0px", textAlign: "center"}}>Add promo code or gift card</div>
          <div style={{backgroundColor: "rgb(250,250,250)", fontSize: "0.6rem"}}><p>By placing your order, you agree to be bound by the Instacart <Link href="/terms"><a>Terms of Service</a></Link> and <Link href="/privacy"><a>Privacy Policy</a></Link>. Your credit/debit card will be <b>temporarily authorized for ${(Number(cart.total.toFixed(2)) + Number((cart.total * 1.1).toFixed(2))).toFixed(2)}</b>. Your statement will reflect the final order total after order completion. <Link href="/info"><a>Learn more</a></Link>
          </p>
          <p>Prices may vary from those in restaurant.</p></div>
        </div>
      </Col>
      <style jsx global>
        {`
          input {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif!important;
          }
          * {
            box-sizing: border-box;
          }
          body,
          html {
            background-color: #f6f9fc;
            font-size: 18px;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          }
          h1 {
            color: #32325d;
            font-weight: 400;
            line-height: 50px;
            font-size: 40px;
            margin: 20px 0;
            padding: 0;
          }
          label {
            color: #6b7c93;
            font-weight: 300;
            letter-spacing: 0.025em;
          }
          button {
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
          form {
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 3px solid #e6ebf1;
          }
          button:hover {
            color: #fff;
            cursor: pointer;
            background-color: #7795f8;
            transform: translateY(-1px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
              0 3px 6px rgba(0, 0, 0, 0.08);
          }
          input,
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
          input::placeholder {
            color: #aab7c4;
          }
          input:focus,
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
  );
  // }
}
export default Checkout;