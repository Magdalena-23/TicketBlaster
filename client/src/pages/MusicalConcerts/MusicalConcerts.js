import React, { useEffect, useState } from "react";
import EventItem from "../../components/events/EventItem";
import Button from "../../components/common/Button/Button";
import classes from "./MusicalConcerts.module.css";
import { format } from "date-fns";
import axios from "../../api/axios";

const MusicalConcerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [totalConcerts, setTotalConcerts] = useState(null);

  function formatWithOrdinalSuffix(date) {
    return format(date, "MMMM do, yyyy");
  }

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(
          `/api/events?type=Concert&limit=${displayCount}`
        );
        const fetchedConcerts = response.data;
        setConcerts(fetchedConcerts);

        if (fetchedConcerts.length >= displayCount) {
          setTotalConcerts(fetchedConcerts.length);
        } else {
          setTotalConcerts(null);
        }
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };
    fetchConcerts();
  }, [displayCount]);

  return (
    <div>
      <h1>Musical Concerts</h1>
      <div className={classes.grid}>
        {concerts.map((concert) => {
          return (
            <EventItem
              key={concert.id}
              artist={concert.artist}
              date={formatWithOrdinalSuffix(new Date(concert.date))}
              city={concert.city}
              country={concert.country}
              description={concert.description}
              img={concert.img}
              text="Get tickets"
            />
          );
        })}
      </div>
      {totalConcerts !== null && (
        <Button
          className={classes.btn}
          onClick={() => setDisplayCount(displayCount + 10)}
        >
          Load More Musical Concerts
        </Button>
      )}
    </div>
  );
};

export default MusicalConcerts;
