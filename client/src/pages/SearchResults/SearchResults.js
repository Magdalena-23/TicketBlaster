import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import classes from "./SearchResults.module.css";
import EventItem from "../../components/events/EventItem";
import Title from "../../components/common/Title/Title";
import { formatTime } from "../../helpers/timeFormat";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/api/events?search=${searchQuery}`);
        const results = response.data;
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);
  return (
    <div>
      <Title>Search Results for: {searchQuery}</Title>
      {searchResults.length !== 0 ? (
        searchResults.map((searchItem) => {
          return (
            <EventItem
              key={searchItem._id}
              id={searchItem._id}
              artist={searchItem.artist}
              date={formatTime(searchItem.date)}
              city={searchItem.city}
              country={searchItem.country}
              description={searchItem.description}
              img={searchItem.img}
              text="Get tickets"
            />
          );
        })
      ) : (
        <p className={classes["no-matches-found"]}>No events found</p>
      )}
    </div>
  );
};

export default SearchResults;
