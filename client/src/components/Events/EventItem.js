import React from "react";
import classes from "./EventItem.module.css";

function EventItem(props) {
  return (
    <div className={`${classes["event-item"]} ${props.className}`}>
      <div className={classes["img-container"]}>
        <img src={props.img} alt="event" />
      </div>
      <div className={classes.desc}>
        <h2>{props.artist}</h2>
        <span className={classes.date}>{props.date}</span>
        <p>{props.description}</p>
        <div>
          <span>
            {props.city}, {props.country}
          </span>
          <button className={classes.btn}>{props.text}</button>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
