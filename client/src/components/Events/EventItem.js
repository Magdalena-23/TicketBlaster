import React from "react";
import classes from "./EventItem.module.css";

function EventItem(props) {
  return (
    <div className={classes["event-item"]}>
      <div className={classes["img-container"]}>
        <img src={props.img} alt="event" />
      </div>
      <div className={classes.desc}>
        <h2>{props.artist}</h2>
        <span className={classes.date}>{props.date}</span>
        <p>{props.description}</p>
        <div>
          <span>{props.location}</span>
          <button className={classes.btn}>Get tickets</button>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
