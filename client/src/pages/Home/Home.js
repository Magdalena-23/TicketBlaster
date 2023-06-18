import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import classes from "./Home.module.css";
import EventItem from "../../components/events/EventItem";
import { concertsData } from "../../dummyData";

function Home() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
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
          {/* povik do backend i mapiranje event.map((musicalEvent) => {<eventItem/>}) */}
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
          <Link to="/musical-concerts" onClick={handleClick}>
            <Button className={classes.btn}>See All Musical Concerts</Button>
          </Link>
        </div>
        <div>
          <h1>Stand-up Comedy</h1>
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
