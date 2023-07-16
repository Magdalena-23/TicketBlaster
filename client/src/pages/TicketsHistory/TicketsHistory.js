import React, { useState, useEffect, useContext } from "react";
import classes from "./TicketsHistory.module.css";
import EventItem from "../../components/events/EventItem";
import { formatTime } from "../../helpers/timeFormat";
import PrintModal from "../../components/common/Modal/PrintModal/PrintModal";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import { decodeJwt } from "../../helpers/jwtDecode";
import axios from "../../api/axios";
import { LoadingContext } from "../../context/LoadingContext";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";

function TicketsHistory() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [ticketsHistory, setTicketsHistory] = useState(null);

  const handlePrint = (event) => {
    setSelectedEvent(event);
  };

  const userId = decodeJwt();

  useEffect(() => {
    setIsLoading(true);
    const getTicketsHistory = async () => {
      try {
        const response = await axios.get(`/api/tickets/${userId}/${true}`);

        const sortedTickets = response.data
          .filter((x) => x.event)
          .sort((a, b) => {
            return new Date(b.event.date) - new Date(a.event.date);
          });

        setTicketsHistory(sortedTickets);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getTicketsHistory();
  }, [userId]);

  return (
    <>
      <LoggedInNav header="Tickets History" />
      {showPrint && (
        <PrintModal
          onClose={() => setShowPrint(false)}
          selectedEvent={selectedEvent}
        />
      )}
      <div className={classes.grid}>
        {isLoading || ticketsHistory === null ? (
          <LoadingSpinner />
        ) : ticketsHistory.length === 0 ? (
          <span className={classes["no-items-found"]}>No tickets found</span>
        ) : (
          ticketsHistory.map((event) => {
            return (
              <EventItem
                className={
                  new Date() > new Date(event.event.date)
                    ? classes.disabled
                    : ""
                }
                key={event.event._id}
                id={event.event._id}
                artist={event.event.artist}
                date={formatTime(event.event.date)}
                country={event.event.country}
                city={event.event.city}
                description={event.event.description}
                img={event.event.img}
                text="Print"
                qrcode={event.qrCode}
                openModal={() => setShowPrint(true)}
                onPrint={() => handlePrint(event.event)}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default TicketsHistory;
