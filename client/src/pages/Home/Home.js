import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import classes from "./Home.module.css";
import EventItem from "../../components/events/EventItem";
import { format } from "date-fns";
import axios from "../../api/axios";

function Home() {
  const [heroEvent, setHeroEvent] = useState();
  const [concerts, setConcerts] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  function formatWithOrdinalSuffix(date) {
    return format(date, "MMMM do, yyyy");
  }

  useEffect(() => {
    const fetchSoonestEvent = async () => {
      try {
        const response = await axios.get("/api/events?limit=1");
        const soonestEvent = response.data;
        setHeroEvent(soonestEvent);
        console.log(soonestEvent);
      } catch (error) {
        console.error("Error fetching hero event:", error);
      }
    };

    const fetchConcerts = async () => {
      try {
        const response = await axios.get("/api/events?type=Concert&limit=5");
        const concerts = response.data;
        setConcerts(concerts);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    const fetchComedyShows = async () => {
      try {
        const response = await axios.get("/api/events?type=Comedy&limit=5");
        const comedyShows = response.data;
        setComedyShows(comedyShows);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchSoonestEvent();
    fetchConcerts();
    fetchComedyShows();
  }, []);
  return (
    <>
      <div className={classes.container}>
        <img src={heroEvent[0].img} alt="event" />
        <div className={classes["event-info"]}>
          <div>
            <h3>{heroEvent[0].artist}</h3>
            <div>
              <span>
                {formatWithOrdinalSuffix(new Date(heroEvent[0].date))},
              </span>
              <span className={classes.location}>
                {heroEvent[0].city}, {heroEvent[0].country}
              </span>
            </div>
          </div>
          <Button className={classes.herobtn}>Get tickets</Button>
        </div>
      </div>
      <div className={classes["home-grid"]}>
        <div>
          <h1>Musical Concerts</h1>
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
          <Link to="/musical-concerts" onClick={handleClick}>
            <Button className={classes.btn}>See All Musical Concerts</Button>
          </Link>
        </div>
        <div>
          <h1>Stand-up Comedy</h1>
          {comedyShows.map((comedyShow) => {
            return (
              <EventItem
                key={comedyShow.id}
                artist={comedyShow.artist}
                date={formatWithOrdinalSuffix(new Date(comedyShow.date))}
                location={comedyShow.location}
                city={comedyShow.city}
                country={comedyShow.country}
                description={comedyShow.description}
                img={comedyShow.img}
                text="Get tickets"
              />
            );
          })}
          <Link to="/comedy-shows" onClick={handleClick}>
            <Button className={classes.btn}>
              See All Stand-up Comedy Shows
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
