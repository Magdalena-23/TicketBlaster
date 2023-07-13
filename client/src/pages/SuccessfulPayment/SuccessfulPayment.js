import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./SuccessfulPayment.module.css";
import CartItem from "../../components/cart/CartItem/CartItem";
import Title from "../../components/common/Title/Title";
import { formatTime } from "../../helpers/timeFormat";
import Button from "../../components/common/Button/Button";

const SuccessfulPayment = (props) => {
  const location = useLocation();
  const cartItems = location.state.cartItems;
  console.log(cartItems);
  return (
    <div>
      <Title>Thank you for your purchase!</Title>
      {cartItems.map((purchasedTicket) => {
        return (
          <CartItem
            className={classes.flex}
            key={purchasedTicket._id}
            artist={purchasedTicket.event.artist}
            img={purchasedTicket.event.img}
            city={purchasedTicket.event.city}
            country={purchasedTicket.event.country}
            date={formatTime(purchasedTicket.event.date)}
            price={purchasedTicket.event.price}
            quantity={purchasedTicket.quantity}
            button={true}
          >
            <Button>Print</Button>
          </CartItem>
        );
      })}
    </div>
  );
};

export default SuccessfulPayment;
