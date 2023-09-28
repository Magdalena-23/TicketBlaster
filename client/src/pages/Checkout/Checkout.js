import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Checkout.module.css";

// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// const stripePromise = loadStripe(
//   "pk_test_51NWOWgKlPGTvaQSgefUtlfn4sNBx6OZkkKBzx4lEj8PuGVf7wG6I1K4f6gtL0rr12KgjUfdVZ8KN1D1VyU06xxhl00he8zsqY5"
// );

import Title from "../../components/common/Title/Title";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import CartItem from "../../components/cart/CartItem/CartItem";
import axios from "../../api/axios";
import { decodeJwt } from "../../helpers/jwtDecode";
import { formatTime } from "../../helpers/timeFormat";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import { LoadingContext } from "../../context/LoadingContext";

const Checkout = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  // const stripe = useStripe(); // Use the useStripe hook to get access to the stripe object
  // const elements = useElements();

  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const userId = decodeJwt();

  useEffect(() => {
    const getCartItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/tickets/${userId}/${false}`);

        setTotalPrice(
          response.data
            .map((x) => x.quantity * x.event.price)
            .reduce((x, y) => (x = x + y))
        );

        setCartItems(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCartItems();
  }, [userId, setIsLoading]);

  const pay = async () => {
    try {
      const response = await axios.post(
        `/api/tickets/purchase-ticket/${userId}`
      );

      // Collect payment information from the user (you can use state variables here)
      // const cardElement = elements.getElement(CardElement);
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: "card",
      //   card: cardElement,
      // });

      // if (error) {
      //   console.error("Error:", error.message);
      //   return;
      // }

      // PaymentMethod created successfully, handle the paymentMethod.id or send it to your backend for processing
      // const paymentInfo = {
      //   token: paymentMethod.id,
      //   amount: totalPrice.toFixed(2), // Assuming you are using the total price calculated in your component
      // };

      // Make the POST request to your backend API
      // const response = await axios.post("/api/purchase-tickets", paymentInfo);

      // if (response.data.success) {
      // Payment successful, handle accordingly
      navigate("/successful-payment", { state: { cartItems } });
      // } else {
      // Payment failed, handle accordingly
      //   console.error("Payment failed:", response.data.message);
      // }
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className={classes.flex}>
            <div className={classes.left}>
              {cartItems.map((item) => {
                return (
                  <CartItem
                    key={item._id}
                    id={item._id}
                    artist={item.event.artist}
                    img={item.event.img}
                    date={formatTime(item.event.date)}
                    country={item.event.country}
                    city={item.event.city}
                    price={item.event.price}
                    quantity={item.quantity}
                    button={true}
                    smaller={true}
                  />
                );
              })}

              <div className={classes["total-price"]}>
                <h2>Total:</h2>
                <h2>${totalPrice.toFixed(2)} USD</h2>
              </div>
            </div>
            {/* <Elements stripe={stripePromise}> */}
            <form className={classes["inputs-container"]}>
              <Input type="text" label="Full Name" />
              <Input type="number" label="Card No." />
              <Input type="date" label="Expires" />
              <Input type="number" label="PIN" />
            </form>
            {/* </Elements> */}
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
        </div>
      )}
    </>
  );
};

export default Checkout;
