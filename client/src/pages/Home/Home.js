import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import classes from "./Home.module.css";
import EventItem from "../../components/events/EventItem";
import { format } from "date-fns";
import axios from "../../api/axios";

function Home() {
  const [concerts, setConcerts] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  function formatWithOrdinalSuffix(date) {
    return format(date, "MMMM do, yyyy");
  }

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get("/api/events?type=Concert&limit=5");
        const concerts = response.data;
        setConcerts(concerts);
        console.log(concerts);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    const fetchComedyShows = async () => {
      try {
        const response = await axios.get("/api/events?type=Comedy&limit=5");
        const comedyShows = response.data;
        setComedyShows(comedyShows);
        console.log(comedyShows);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
    fetchComedyShows();
  }, []);
  return (
    <>
      <div className={classes.container}>
        <img
          src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
          alt="concert"
        />
        <div className={classes["event-info"]}>
          <div>
            <h3>Rage Against The Machine</h3>
            <div>
              <span>June 9th 2023, </span>
              <span>Vienna, Austria</span>
            </div>
          </div>
          <button>Get tickets</button>
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
