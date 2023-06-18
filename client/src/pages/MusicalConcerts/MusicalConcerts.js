import React from "react";
import EventItem from "../../components/events/EventItem";
import Button from "../../components/common/Button/Button";
import classes from "./MusicalConcerts.module.css";
import { concertsData } from "../../dummyData";

function MusicalConcerts() {
  return (
    <div>
      <h1>Musical Concerts</h1>
      <div className={classes.grid}>
        {concertsData.map((concert) => {
          return (
            <EventItem
              key={concert.id}
              artist={concert.artist}
              date={concert.date}
              location={concert.location}
              description={concert.description}
              img={concert.img}
              text="Get tickets"
            />
          );
        })}
      </div>
      <Button className={classes.btn}>Load More Musical Concerts</Button>
    </div>
  );
}

export default MusicalConcerts;
