import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./EventDetails.module.css";
import EventItem from "../../components/events/EventItem";
import Button from "../../components/common/Button/Button";
import axios from "../../api/axios";
import { formatTime } from "../../helpers/timeFormat";
import Title from "../../components/common/Title/Title";
import { decodeJwt } from "../../helpers/jwtDecode";

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const eventId = window.location.pathname.split("/").pop();
    const getEvent = async () => {
      const response = await axios.get(`/api/events/find/${eventId}`);
      const event = response.data;
      setEvent(event);
    };
    getEvent();
  }, []);

  const userId = decodeJwt();

  const handleAddToCart = async () => {
    try {
      await axios.post("/api/tickets/cart-item", {
        event: event._id,
        user: userId,
        quantity: quantity,
        isPurchased: false,
      });
      navigate("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={classes.title}>
        <Title>{event.artist}</Title>
        <span className={classes.date}>{formatTime(event.date)}</span>
        <span>
          {event.city}, {event.country}
        </span>
      </div>
      <div className={`${classes["event-item"]}`}>
        <div className={classes["img-container"]}>
          <img src={event.img} alt="event" />
        </div>
        <div className={classes.desc}>
          <div className={classes.about}>
            <h2>About</h2>
            <p>{event.description}</p>
          </div>
          <div className={classes.tickets}>
            <div className={classes.flex}>
              <h2>Tickets</h2>
              <h2 className={classes.price}>
                $
                {event.price !== undefined && event.price !== null
                  ? event.price.toFixed(2)
                  : ""}{" "}
                USD
              </h2>
            </div>
            <div className={classes.flex}>
              <input
                value={quantity}
                min="1"
                max="10"
                className={classes["tickets-number"]}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button className={classes.btn} onClick={handleAddToCart}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <h2>Related Acts</h2>
      <div className={classes.grid}>
        <EventItem />
        <EventItem />
      </div>
    </>
  );
};

export default EventDetails;
