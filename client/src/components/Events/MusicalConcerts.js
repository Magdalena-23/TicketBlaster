import React from "react";
import EventItem from "./EventItem";
import classes from "./EventItem.module.css";

function MusicalConcerts() {
  return (
    <div>
      <h1>Musical Concerts</h1>
      <div className={classes.grid}>
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
        <EventItem />
      </div>
    </div>
  );
}

export default MusicalConcerts;
