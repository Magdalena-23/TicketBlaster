import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./EventDetails.module.css";
import EventItem from "../../components/Events/EventItem";
import Button from "../../components/common/Button/Button";
import axios from "../../api/axios";
import { formatTime } from "../../helpers/timeFormat";
import Title from "../../components/common/Title/Title";
import { decodeJwt } from "../../helpers/jwtDecode";
import { useAuth } from "../../context/AuthContext";

const EventDetails = () => {
  const { user } = useAuth();
  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const eventId = window.location.pathname.split("/").pop();
  useEffect(() => {
    const getEvent = async () => {
      const response = await axios.get(`/api/events/find/${eventId}`);
      const event = response.data;
      setEvent(event);
    };
    getEvent();
  }, [eventId]);

  const userId = decodeJwt();

  const handleAddToCart = async () => {
    if (!user) {
      localStorage.setItem(
        "redirectedFromItem",
        JSON.stringify({ event: event._id, quantity })
      );
      navigate("/login");
      return;
    }
    try {
      const quantityNumber = parseFloat(quantity);

      await axios.post("/api/tickets/cart-item", {
        event: event._id,
        user: userId,
        quantity: quantityNumber,
        isPurchased: false,
      });

      localStorage.removeItem("redirectedFromItem");
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
          <img
            src={
              event.img
                ? event.img
                : "https://img.freepik.com/free-photo/paper-texture_1194-6010.jpg"
            }
            alt="event"
          />
        </div>
        <div className={classes.desc}>
          <div className={classes.about}>
            <h2>About</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{event.description}</p>
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
        {event.relatedEvents &&
          event.relatedEvents.map((e) => {
            return (
              <EventItem
                key={e._id}
                id={e._id}
                artist={e.artist}
                img={e.img}
                date={formatTime(e.date)}
                city={e.city}
                country={e.country}
                description={e.description}
                text="Get Ticket"
              />
            );
          })}
      </div>
    </>
  );
};

export default EventDetails;
