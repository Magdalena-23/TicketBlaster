import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CreateEvent.module.css";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import ErrorModal from "../../components/common/Modal/ConfirmAndErrorModal";
import axios from "../../api/axios";
import { formatTime } from "../../helpers/timeFormat";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventPhoto, setEventPhoto] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [category, setCategory] = useState("Concert");
  const [date, setDate] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [relatedEventsOptions, setRelatedEventsOptions] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [selectedRelatedEventId, setSelectedRelatedEventId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setEventPhoto(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  useEffect(() => {
    const fetchRelatedEvents = async () => {
      try {
        const response = await axios.get(`/api/events/type?type=${category}`);
        setRelatedEventsOptions(response.data);
        setRelatedEvents([response.data[0], response.data[1]]);
        setSelectedRelatedEventId(response.data[0]._id);
      } catch (error) {
        console.error("Error fetching related events:", error);
      }
    };
    fetchRelatedEvents();
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceValue = parseFloat(ticketPrice);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/events",
        {
          img: eventPhoto,
          artist: eventName,
          date,
          description: eventDetails,
          city: selectedCity,
          country: selectedCountry,
          eventType: category,
          price: priceValue,
          relatedEvents,
        },
        { headers: { "auth-token": token } }
      );
      navigate("/events");
      console.log("Event created:", response.data);
    } catch (error) {
      setShowModal(true);
      console.error("Error creating an event:", error);
    }
  };

  const handleAddRelatedEvent = (e) => {
    e.preventDefault();
    if (selectedRelatedEventId) {
      const selectedEvent = relatedEventsOptions.find(
        (event) => event._id === selectedRelatedEventId
      );

      // Check if the event is already present in the relatedEvents array
      const isEventAlreadyAdded = relatedEvents.some(
        (event) => event._id === selectedEvent._id
      );

      const isMaximumEventsReached = relatedEvents.length >= 2;

      if (!isEventAlreadyAdded && !isMaximumEventsReached) {
        setRelatedEvents((prevRelatedEvents) => [
          ...prevRelatedEvents,
          selectedEvent,
        ]);
      }

      // setSelectedRelatedEventId("");
    }
  };

  return (
    <form>
      {showModal && (
        <ErrorModal
          title="Failed to create an event."
          message="Please try again."
          btnText="OK"
          onConfirm={() => setShowModal(false)}
          hideBtn={true}
        >
          Failed to update the event. Please try again.
        </ErrorModal>
      )}
      <LoggedInNav header="Events" />
      <div className={classes.flex}>
        <div className={classes["flex-column"]}>
          <Input
            label="Event Name"
            type="text"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
          <div className={classes["upload-wrapper"]}>
            <label htmlFor="upload" className={classes["upload-button"]}>
              Upload Event Art
            </label>
            <input
              type="file"
              id="upload"
              name="upload"
              accept="image/*"
              onChange={convertToBase64}
            />
          </div>
          <div className={classes["img-container"]}>
            <img src={eventPhoto} alt="" />
            {!eventPhoto && (
              <span className={classes["alt-text"]}>Event Photo</span>
            )}
          </div>
        </div>
        <div className={classes["flex-column"]}>
          <div className={classes.flex}>
            <Dropdown
              label="Category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Concert">Musical Concert</option>
              <option value="Comedy">Stand-Up Comedy</option>
            </Dropdown>
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Input
            isTextArea={true}
            className={classes["event-details"]}
            label="Event Details"
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
          />
          <div className={classes.flex}>
            <div className={classes["flex-column"]}>
              <Input
                label="City"
                type="text"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              />
              <Input
                label="Ticket Price"
                type="number"
                value={ticketPrice}
                onChange={(e) => {
                  setTicketPrice(e.target.value);
                }}
              />
            </div>
            <Input
              label="Country"
              type="text"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <Dropdown
          label="Related Events:"
          value={selectedRelatedEventId}
          onChange={(e) => setSelectedRelatedEventId(e.target.value)}
        >
          {relatedEventsOptions.map((event) => {
            return (
              <option key={event._id} value={event._id}>
                {event.artist} - {formatTime(event.date)} - {event.city},{" "}
                {event.country}
              </option>
            );
          })}
        </Dropdown>
        <Button
          onClick={handleAddRelatedEvent}
          className={`${classes.btn} ${classes["bigger-btn"]}`}
        >
          Add
        </Button>
      </div>
      <div className={classes.flex}>
        {relatedEvents.map((relatedEvent) => {
          return (
            <div key={relatedEvent._id} className={classes["related-event"]}>
              <div className={classes.left}>
                <div className={classes.img}>
                  <img alt="" />
                </div>
              </div>
              <div className={classes.right}>
                <div className={classes["event-info"]}>
                  <h2>{relatedEvent.artist}</h2>
                  <span className={classes.date}>
                    {formatTime(relatedEvent.date)}
                  </span>
                  <span className={classes.location}>
                    {relatedEvent.city}, {relatedEvent.country}
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setRelatedEvents(
                      relatedEvents.filter((e) => e._id !== relatedEvent._id)
                    );
                  }}
                  className={classes["remove-btn"]}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes["btn-container"]}>
        <Button
          onClick={handleSubmit}
          className={`${classes.btn} ${classes["bigger-btn"]} ${classes["save-btn"]}`}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreateEvent;
