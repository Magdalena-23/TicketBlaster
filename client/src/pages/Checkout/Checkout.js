import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Checkout.module.css";
import Title from "../../components/common/Title/Title";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import CartItems from "../../components/cart/Cart/CartItems";
import axios from "../../api/axios";
import { decodeJwt } from "../../helpers/jwtDecode";

const Checkout = () => {
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const userId = decodeJwt();

  const pay = async () => {
    try {
      // const response = await axios.post(
      //   `/api/tickets/purchase-ticket/${userId}`
      // );
      navigate("/successful-payment", { state: { cartItems } });
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Title>Checkout</Title>
      <div className={classes.flex}>
        <div className={classes.left}>
          <CartItems
            button={true}
            smaller={true}
            setTotalPrice={setTotalPrice}
            setCartItems={setCartItems}
          />
          <div className={classes["total-price"]}>
            <h2>Total:</h2>
            <h2>${totalPrice.toFixed(2)} USD</h2>
          </div>
        </div>
        <div className={classes["inputs-container"]}>
          <Input type="text" label="Full Name" />
          <Input type="number" label="Card No." />
          <Input type="date" label="Expires" />
          <Input type="number" label="PIN" />
        </div>
      </div>
      <div className={classes["btn-container"]}>
        <Button className={classes.btn} onClick={goBack}>
          Back
        </Button>
        <Button
          className={`${classes.btn} ${classes["btn-pink"]}`}
          onClick={pay}
        >
          Pay Now
        </Button>
      </div>
    </>
  );
};

export default Checkout;
