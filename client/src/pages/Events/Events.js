import React, { useEffect, useState, useContext } from "react";
import classes from "./Events.module.css";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import Button from "../../components/common/Button/Button";
import ConfirmModal from "../../components/common/Modal/ConfirmAndErrorModal";
import axios from "../../api/axios";
import { formatTime } from "../../helpers/timeFormat";
import { LoadingContext } from "../../context/LoadingContext";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const Events = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const getAllEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAllEvents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/events/${id}`, {
        headers: { "auth-token": token },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LoggedInNav header="Events" btn="true" />
      {showDeleteModal && (
        <ConfirmModal
          title="Are you sure?"
          message="You are about to delete an event from the system. Please proceed with caution."
          btnText="Delete event"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDelete(selectedEventId);
            setShowDeleteModal(false);
          }}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        events.map((event) => {
          return (
            <div key={event._id} className={`${classes["event-item"]}`}>
              <div className={classes.flex}>
                <div className={classes["img-container"]}>
                  <img src={event.img} alt="event" />
                </div>
                <div className={classes.left}>
                  <Link to={`update-event/${event._id}`}>
                    <h2>{event.artist}</h2>
                  </Link>
                  <div className={classes.gap}>
                    <span className={classes.date}>
                      {formatTime(event.date)}
                    </span>
                    <span className={classes.location}>
                      {event.city}, {event.country}
                    </span>
                  </div>
                </div>
              </div>
              <div className={classes.right}>
                <Button
                  className={classes.btn}
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedEventId(event._id);
                  }}
                >
                  Delete Event
                </Button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Events;
