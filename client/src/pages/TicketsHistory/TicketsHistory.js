import React from "react";
import classes from "./TicketsHistory.module.css";
import EventItem from "../../components/events/EventItem";
import { concertsData } from "../../dummyData";

function TicketsHistory() {
  return (
    <div className={classes.grid}>
      {concertsData.map((concert) => {
        return (
          <EventItem
            className={classes.disabled}
            key={concert.id}
            artist={concert.artist}
            date={concert.date}
            location={concert.location}
            description={concert.description}
            img={concert.img}
            text="Print"
          />
        );
      })}
    </div>
  );
}

export default TicketsHistory;
