import React from "react";
import EventItem from "./EventItem";
import classes from "./EventItem.module.css";

function ComedyShows() {
  return (
    <div>
      <h1>Stand-up Comedy</h1>
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

export default ComedyShows;
