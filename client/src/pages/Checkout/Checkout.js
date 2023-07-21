import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Checkout.module.css";
import Title from "../../components/common/Title/Title";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
// import CartItems from "../../components/cart/Cart/CartItems";
import CartItem from "../../components/cart/CartItem/CartItem";
import axios from "../../api/axios";
import { decodeJwt } from "../../helpers/jwtDecode";
import { formatTime } from "../../helpers/timeFormat";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import { LoadingContext } from "../../context/LoadingContext";

const Checkout = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

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
        </div>
      )}
    </>
  );
};

export default Checkout;
