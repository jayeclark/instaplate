
import { useState, useContext } from "react";

import { FormGroup, Input } from "reactstrap";
import fetch from "isomorphic-fetch";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import router from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { parseSRC } from "../../scripts/utilities";
import { getAPIUrl } from "../../scripts/urls";
import { address, address2, city, state, zip } from "../../scripts/validation";
import CartContext from "../context/cartContext";
import CardSection from "./cardSection";
import Icons from "../UI/icons/index";
import styles from '../../styles/Checkout.module.css';


function CheckoutForm() {
  const API_URL = getAPIUrl();
  const [formSection, setFormSection] = useState("address");
  const [data, setData] = useState({
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    stripe_id: "",
  });
  const [error, setError] = useState([]);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const cart = Cookies.getJSON("cart");
  const { handleSetCart } = useContext(CartContext)

  const validationFunctions = { address, address2, city, state, zip };

  const validate = (e) => {
    const { name, value } = e.target;
    const { validation } = validationFunctions[name];
    return validation(value);
  };

  function onChange(e) {

    const newError = validationFunctions[e.target.name].message;
    
    if (validate(e) === false && !error.find(err => err === newError)) {
      const tempError = [...error];
      tempError.push(newError);
      setError(tempError);
    } 

    if (validate(e) && error.find(err => err === newError)) {
      const tempError = [...error];
      const messageIndex = tempError.findIndex(err => err === newError);
      tempError.splice(messageIndex, 1);
      setError(tempError);
    }

    const tempData = {... data};
    tempData[e.target.name] = e.target.value;
    setData(tempData);
  }

  async function submitOrder(e) {
    e.preventDefault();
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const token = await stripe.createToken(cardElement);
    const userToken = Cookies.get("token");
    
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: userToken && { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        amount: Number((cart.total * 1.1).toFixed(2)),
        dishes: cart.items,
        address: data.address,
        address_line_2: data.address2,
        city: data.city,
        zip: data.zip,
        state: data.state,
        token: token.token.id,
        restaurant_id: cart.items[0].restaurant.id, 
      }),
    });

    if (!response.ok) {
      setError(response.statusText);
    }
    else {
      Cookies.set("cart", {items: [], total: 0});
      toast.success('Your order was placed successfully! A driver will be in touch shortly about your expected delivery time', { onOpen: () => setTimeout(() => {setProcessing(false); handleSetCart({items: [], total: 0}); router.push("/")}, 2000)});
    }
  }

  const { mapMarker, cardIcon, bagIcon, giftIcon } = Icons;

  return (
    <div className={styles.paper}>
      <div className={styles.deliveryAddress}>
        <h6 className={formSection === "address" ? styles.sectionIconActive : styles.sectionIconInactive}>
          <div>{mapMarker}</div> Delivery address</h6>
        <div className={formSection === "address" ? styles.sectionActive : styles.sectionInactive} >
          <div className={styles.errorContainer}>
          {error.length > 0 &&
            (
              <small style={{ fontSize: "0.7rem", color: "red" }}>
                {error[0]}
              </small>
            )
          }
          </div>
          <FormGroup >
            <div style={{ flex: "0.90", marginRight: 0 }}>
              <Input autoComplete="off" placeholder="Address line 1" name="address" onChange={onChange} />
            </div>
            </FormGroup>
            <FormGroup>
            <div style={{ flex: "0.90", marginRight: 0 }}>
              <Input autoComplete="off" placeholder="Address line 2 (optional)" name="address2" onChange={onChange} />
            </div>
          </FormGroup>
          <FormGroup style={{ display: "flex", marginTop: "-10px"}}>
            <div style={{ flex: "0.52", marginRight: 10 }}>
              <Input autoComplete="off" placeholder="City" name="city" onChange={onChange} />
            </div>
            <div style={{ flex: "0.18", marginRight: 10 }}>
              <Input autoComplete="off" placeholder="State" name="state" onChange={onChange} />
            </div>
            <div style={{ flex: "0.3", marginRight: 0 }}>
              <Input autoComplete="off" placeholder="Zip code" name="zip" defaultValue="" onChange={onChange} />
            </div>
          </FormGroup>
          <button className="save-button" type="button" onClick={() => setFormSection("payment")}>Save</button>
        </div>
      </div>
      <div style={{marginBottom: "20px", borderBottom: "1px solid #efefef"}}>
        <h6 style={{ display: "flex", alignItems: "center", paddingBottom: "10px", color: formSection === "payment" ? "rgb(10, 173, 10)" : "#888" }}><div style={{margin: "0px 5px"}}>{cardIcon}</div> Payment</h6>
        <div style={{position: "relative", marginBottom: "20px", display: formSection === "payment" ? "block" : "none"}}>
          <CardSection buttonDisabled={processing} data={data} stripeError={error} submitOrder={submitOrder} />
          <div style={{cursor: "pointer", position: "absolute", top:"100px", color: "rgb(10, 173, 10)", fontSize: "0.8rem", right: "10px", zIndex:"9999"}} onClick={()=>setFormSection("address")}>Edit previous section</div>
        </div>
      </div>
      <div style={{marginBottom: "20px", borderBottom: "1px solid #efefef"}}>
        <h6 style={{ display: "flex", alignItems: "center", paddingBottom: "10px" }}>
          <div style={{color: "#888", paddingLeft: "8px"}}>{bagIcon}</div>
          <div style={{paddingTop: "5px", paddingLeft:"5px"}}>{cart.items.reduce((a,b) => a + b.quantity, 0)} items</div>
        </h6>
        <div className={styles.hidden}>
          {cart.items.map((item,i) => (<img key={i} height="50px" style={{marginBottom: "10px", marginRight:"5px", width:"50px", borderRadius:"30px", overflow:"hidden"}} src={parseSRC(item)}/>))}
        </div>
      </div>
      <div style={{marginBottom: "20px", borderBottom: "1px solid #efefef", overflowX: "scroll"}}>
        <h6 style={{ display: "flex", alignItems: "center", paddingBottom: "10px" }}><div style={{color: "#888", paddingLeft: "8px"}}>{giftIcon}</div><div style={{paddingTop: "5px", paddingLeft:"5px"}}> Make it a Gift</div></h6>
      </div>

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
          .save-button {
            position: relative; 
            left: calc(100% - 200px); 
            margin-top: 5px; 
            margin-bottom: 25px!important; 
            border-radius: 4px;
            margin-left: auto; 
            min-width: 200px; 
            background-color: rgb(10, 173, 10)!important;
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

          @media only screen and (max-width: 576px) {
            .save-button {
              min-width: 100%; 
              left: 0px;
            }
            input {
              padding: 10px 5px!important;
            }
          }
        `}
      </style>
    </div>
  );
}
export default CheckoutForm;
