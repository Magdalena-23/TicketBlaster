import React from "react";
import EventItem from "../../components/events/EventItem";
import Button from "../../components/common/Button/Button";
import classes from "../MusicalConcerts/MusicalConcerts.module.css";
import { concertsData } from "../../dummyData";

function ComedyShows(props) {
  return (
    <div>
      <h1>Stand-up Comedy</h1>
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
      <Button className={classes.btn}>Load More Stand-up Comedy Shows</Button>
    </div>
  );
}

export default ComedyShows;
