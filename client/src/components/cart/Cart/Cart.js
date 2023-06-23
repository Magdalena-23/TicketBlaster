import React from "react";
import classes from "./Cart.module.css";
import Button from "../../common/Button/Button";
import CartItem from "../CartItem/CartItem";
import Title from "../../common/Title/Title";

const Cart = () => {
  return (
    <div>
      <Title>Shopping Cart</Title>
      <CartItem />
      <CartItem />
      <div className={classes["btn-container"]}>
        <Button className={classes.btn}>Back</Button>
        <Button className={`${classes.btn} ${classes["btn-pink"]}`}>
          Check Out
        </Button>
      </div>
    </div>
  );
};

export default Cart;
