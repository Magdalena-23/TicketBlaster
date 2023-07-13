import React, { useEffect, useState, useContext } from "react";
import classes from "./CartItems.module.css";
import CartItem from "../CartItem/CartItem";
import axios from "../../../api/axios";
import { decodeJwt } from "../../../helpers/jwtDecode";
import { formatTime } from "../../../helpers/timeFormat";
import { LoadingContext } from "../../../context/LoadingContext";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

const CartItems = (props) => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const [cartItems, setCartItems] = useState([]);

  const handleRemove = async (id) => {
    try {
      console.log(id);
      await axios.delete(`/api/tickets/delete/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const userId = decodeJwt();

  useEffect(() => {
    const getCartItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/tickets/${userId}/${false}`);

        // props.setTotalPrice(
        //   response.data
        //     .map((x) => x.quantity * x.event.price)
        //     .reduce((x, y) => (x = x + y), 0)
        // );

        setCartItems(response.data);
        // props.setCartItems(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCartItems();
  }, [userId]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : cartItems.length === 0 ? (
        <span className={classes["no-items-found"]}>No items in cart</span>
      ) : (
        cartItems.map((item) => {
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
              handleRemove={() => handleRemove(item._id)}
              button={props.button}
              smaller={props.smaller}
            />
          );
        })
      )}
    </div>
  );
};

export default CartItems;
