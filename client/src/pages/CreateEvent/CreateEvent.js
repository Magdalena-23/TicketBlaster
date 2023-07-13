import React, { useState } from "react";
import classes from "./CreateEvent.module.css";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import axios from "../../api/axios";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventPhoto, setEventPhoto] = useState("");
  const [ticketPrice, setTicketPrice] = useState();
  const [category, setCategory] = useState("Concert");
  const [date, setDate] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [relatedEvents, setRelatedEvents] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          price: ticketPrice,
        },
        { headers: { "auth-token": token } }
      );
      console.log("Event created:", response.data);
    } catch (error) {
      console.error("Error creating an event:", error);
    }
  };

  return (
    <form>
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
        <Dropdown label="Related Events:">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Dropdown>
        <Button className={`${classes.btn} ${classes["bigger-btn"]}`}>
          Add
        </Button>
      </div>
      <div className={classes.flex}>
        <div className={classes["related-event"]}>
          <div className={classes.left}>
            <div className={classes.img}>
              <img alt="" />
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes["event-info"]}>
              <h2>Norah Jones</h2>
              <span className={classes.date}>June 9th, 2023</span>
              <span className={classes.location}>Zagreb, Croatia</span>
            </div>
            <Button className={classes["remove-btn"]}>Remove</Button>
          </div>
        </div>
        <div className={classes["related-event"]}>
          <div className={classes.left}>
            <div className={classes.img}>
              <img alt="" />
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes["event-info"]}>
              <h2>Norah Jones</h2>
              <span className={classes.date}>June 9th, 2023</span>
              <span className={classes.location}>Zagreb, Croatia</span>
            </div>
            <Button className={classes["remove-btn"]}>Remove</Button>
          </div>
        </div>
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
