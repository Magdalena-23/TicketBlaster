import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Title from "../../components/common/Title/Title";
import classes from "./Cart.module.css";
import CartItem from "../../components/cart/CartItem/CartItem";
import { decodeJwt } from "../../helpers/jwtDecode";
import { formatTime } from "../../helpers/timeFormat";
import { LoadingContext } from "../../context/LoadingContext";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import axios from "../../api/axios";

const Cart = (props) => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
    setIsLoading(true);
    const getCartItems = async () => {
      try {
        const response = await axios.get(`/api/tickets/${userId}/${false}`);
        setCartItems(response.data.filter((x) => x.event));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCartItems();
  }, [userId, setIsLoading]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Title>Shopping Cart</Title>
      {/* <CartItems /> */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {cartItems.length === 0 && (
            <span className={classes["no-items-found"]}>No items in cart</span>
          )}
          {cartItems.length > 0 && (
            <>
              {cartItems.map((item) => (
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
                />
              ))}
              <div className={classes["btn-container"]}>
                <Button className={classes.btn} onClick={goBack}>
                  Back
                </Button>
                <Button
                  className={`${classes.btn} ${classes["btn-pink"]}  ${
                    cartItems.length === 0 ? classes.disabledBtn : ""
                  }`}
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
