import React, { useEffect, useState } from "react";
import classes from "./Events.module.css";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import Button from "../../components/common/Button/Button";
import ConfirmModal from "../../components/common/Modal/ConfirmModal";
import axios from "../../api/axios";
import { formatTime } from "../../helpers/timeFormat";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (err) {
        console.log(err);
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
            handleDelete();
            setShowDeleteModal(false);
          }}
        />
      )}
      {events.map((event) => {
        return (
          <div key={event._id} className={`${classes["event-item"]}`}>
            <div className={classes.flex}>
              <div className={classes["img-container"]}>
                <img src={event.img} alt="event" />
              </div>
              <div className={classes.left}>
                <h2>{event.artist}</h2>
                <div className={classes.gap}>
                  <span className={classes.date}>{formatTime(event.date)}</span>
                  <span className={classes.location}>
                    {event.city}, {event.country}
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.right}>
              <Button
                className={classes.btn}
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Event
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Events;
