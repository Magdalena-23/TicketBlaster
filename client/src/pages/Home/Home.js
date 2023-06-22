import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import classes from "./Home.module.css";
import EventItem from "../../components/events/EventItem";
import axios from "../../api/axios";
import { formatTime } from "../../helpers/timeFormat";
import Title from "../../components/common/Title/Title";

function Home() {
  const [heroEvent, setHeroEvent] = useState({});
  const [concerts, setConcerts] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);

  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchSoonestEvent = async () => {
      try {
        const response = await axios.get("/api/events/soonest?limit=1");
        const soonestEvent = response.data[0];
        setHeroEvent(soonestEvent);
      } catch (error) {
        console.error("Error fetching hero event:", error);
      }
    };

    fetchSoonestEvent();
  }, []);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(
          "/api/events/type?type=Concert&limit=5"
        );
        const concerts = response.data;
        setConcerts(concerts);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
  }, []);

  useEffect(() => {
    const fetchComedyShows = async () => {
      try {
        const response = await axios.get(
          "/api/events/type?type=Comedy&limit=5"
        );
        const comedyShows = response.data;
        setComedyShows(comedyShows);
      } catch (error) {
        console.error("Error fetching comedy shows:", error);
      }
    };

    fetchComedyShows();
  }, []);
  return (
    <>
      <div className={classes.container}>
        <img
          src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
          alt="event"
        />
        <div className={classes["event-info"]}>
          <div>
            <h3>{heroEvent.artist}</h3>
            <div>
              <span>{formatTime(heroEvent.date)}</span>
              <span className={classes.location}>
                {heroEvent.city}, {heroEvent.country}
              </span>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/event-details/${heroEvent._id}`)}
            className={classes.herobtn}
          >
            Get tickets
          </Button>
        </div>
      </div>
      <div className={classes["home-grid"]}>
        <div>
          <Title>Musical Concerts</Title>
          {concerts.map((concert) => {
            return (
              <EventItem
                key={concert._id}
                id={concert._id}
                artist={concert.artist}
                date={formatTime(new Date(concert.date))}
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
          <Title>Stand-up Comedy</Title>
          {comedyShows.map((comedyShow) => {
            return (
              <EventItem
                key={comedyShow._id}
                id={comedyShow._id}
                artist={comedyShow.artist}
                date={formatTime(new Date(comedyShow.date))}
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
