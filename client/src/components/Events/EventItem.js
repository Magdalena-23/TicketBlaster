import React from "react";
import classes from "./EventItem.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";

function EventItem(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/event-details/${props.id}`);
  };
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
          <Button className={classes.btn} onClick={handleClick}>
            {props.text}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
