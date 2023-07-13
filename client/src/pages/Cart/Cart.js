import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Title from "../../components/common/Title/Title";
import classes from "./Cart.module.css";
import CartItems from "../../components/cart/Cart/CartItems";

const Cart = (props) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Title>Shopping Cart</Title>
      <CartItems />
      <div className={classes["btn-container"]}>
        <Button className={classes.btn} onClick={goBack}>
          Back
        </Button>
        <Button
          className={`${classes.btn} ${classes["btn-pink"]}`}
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
