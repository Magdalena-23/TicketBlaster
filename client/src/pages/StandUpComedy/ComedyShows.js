import React, { useState, useEffect } from "react";
import EventItem from "../../components/events/EventItem";
import Button from "../../components/common/Button/Button";
import classes from "../MusicalConcerts/MusicalConcerts.module.css";
import { format } from "date-fns";
import axios from "../../api/axios";

const ComedyShows = () => {
  const [comedyShows, setComedyShows] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [totalComedyShows, setTotalComedyShows] = useState(null);

  function formatWithOrdinalSuffix(date) {
    return format(date, "MMMM do, yyyy");
  }

  useEffect(() => {
    const fetchComedyShows = async () => {
      try {
        const response = await axios.get(
          `/api/events?type=Comedy&limit=${displayCount}`
        );
        const fetchedComedyShows = response.data;
        setComedyShows(fetchedComedyShows);

        if (fetchedComedyShows.length >= displayCount) {
          setTotalComedyShows(fetchedComedyShows.length); // Set the total number of comedyShows
        } else {
          setTotalComedyShows(null); // No more comedyShows available
        }
      } catch (error) {
        console.error("Error fetching comedyShows:", error);
      }
    };
    fetchComedyShows();
  }, [displayCount]);

  return (
    <div>
      <h1>Stand-up Comedy</h1>
      <div className={classes.grid}>
        {comedyShows.map((comedyShow) => {
          return (
            <EventItem
              key={comedyShow.id}
              artist={comedyShow.artist}
              date={formatWithOrdinalSuffix(new Date(comedyShow.date))}
              city={comedyShow.city}
              country={comedyShow.country}
              description={comedyShow.description}
              img={comedyShow.img}
              text="Get tickets"
            />
          );
        })}
      </div>
      {totalComedyShows !== null && (
        <Button
          className={classes.btn}
          onClick={() => setDisplayCount(displayCount + 10)}
        >
          Load More Stand-up Comedy Shows
        </Button>
      )}
    </div>
  );
};

export default ComedyShows;
