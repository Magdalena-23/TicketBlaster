import React, { useEffect, useState } from "react";
import classes from "./EventDetails.module.css";
import EventItem from "../../components/events/EventItem";
import Button from "../../components/common/Button/Button";
import axios from "../../api/axios";
import { formatTime } from "../../helpers/timeFormat";
import Title from "../../components/common/Title/Title";

const EventDetails = () => {
  const [event, setEvent] = useState({});

  useEffect(() => {
    const eventId = window.location.pathname.split("/").pop();
    const getEvent = async () => {
      const response = await axios.get(`/api/events/find/${eventId}`);
      const event = response.data;
      setEvent(event);
    };
    getEvent();
  }, []);
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
            src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
            alt="event"
          />
        </div>
        <div className={classes.desc}>
          <div className={classes.about}>
            <h2>About</h2>
            <p>{event.description}</p>
          </div>
          <div className={classes.tickets}>
            <div className={classes.flex}>
              <h2>Tickets</h2>
              <h2 className={classes.price}>${event.price.toFixed(2)} USD</h2>
            </div>
            <div className={classes.flex}>
              <input
                value="1"
                className={classes["tickets-number"]}
                type="number"
              />
              <Button className={classes.btn}>Add to cart</Button>
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
