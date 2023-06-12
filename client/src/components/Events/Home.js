import React from "react";
import MusicalConcerts from "./MusicalConcerts";
import ComedyShows from "./ComedyShows";
import HeroSection from "./HeroSection";
import classes from "./Home.module.css";

function Home() {
  return (
    <>
      <HeroSection />
      <div className={classes["home-grid"]}>
        <MusicalConcerts />
        <ComedyShows />
      </div>
    </>
  );
}

export default Home;
