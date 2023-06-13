import React from "react";
import classes from "./EventItem.module.css";

function EventItem() {
  return (
    <div className={classes["event-item"]}>
      <div className={classes["img-container"]}>
        <img
          src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
          alt="event"
        />
      </div>
      <div className={classes.desc}>
        <h2>Incubus</h2>
        <span className={classes.date}>June 9th, 2023</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur LoLorem ipsum dolor sit amet,
          consectetur LoLorem ipsum dolor sit amet, consectetur LoLorem ipsum
          dolor sit amet, consectetur LoLorem ipsum dolor sit amet, consectetur
          Lo
        </p>
        <div>
          <span>Zagreb, Croatia</span>
          <button className={classes.btn}>Get tickets</button>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
