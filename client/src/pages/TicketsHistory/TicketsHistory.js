import React, { useState, useEffect } from "react";
import classes from "./TicketsHistory.module.css";
import EventItem from "../../components/events/EventItem";
import { formatTime } from "../../helpers/timeFormat";
import Modal from "../../components/common/Modal/Modal";
import LoggedInNav from "../../components/layout/LoggedInNav/LoggedInNav";
import { decodeJwt } from "../../helpers/jwtDecode";
import axios from "../../api/axios";

function TicketsHistory(props) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketsHistory, setTicketsHistory] = useState([]);

  const handlePrint = (event) => {
    setSelectedEvent(event);
  };

  const userId = decodeJwt();

  useEffect(() => {
    const getTicketsHistory = async () => {
      try {
        const response = await axios.get(`/api/tickets/${userId}/${true}`);

        const sortedTickets = response.data.sort((a, b) => {
          return new Date(b.event.date) - new Date(a.event.date);
        });

        setTicketsHistory(sortedTickets);
      } catch (err) {
        console.log(err);
      }
    };

    getTicketsHistory();
  }, [userId]);
  return (
    <>
      <LoggedInNav header="Tickets History" />
      {props.isModalOpen && (
        <Modal onClose={props.onClose}>
          <div className={classes.modal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="255.486"
              height="40.425"
              viewBox="0 0 255.486 40.425"
            >
              <path
                id="Path_6"
                data-name="Path 6"
                d="M.066-13.916v6.747H3.412V8.89a14.071,14.071,0,0,0,.474,4.043,4.436,4.436,0,0,0,1.505,2.314,5.373,5.373,0,0,0,2.649.976,33.236,33.236,0,0,0,3.9.2q1.282,0,2.676-.084t2.788-.084V9.559H15.846a2.638,2.638,0,0,1-1.812-.53,2.356,2.356,0,0,1-.585-1.812V-7.169h3.959v-6.747H13.448v-8.866H3.412v8.866Zm16.56-9.646v7.472H26.663v-7.472Zm0,9.646V16.25H26.663V-13.916ZM42.777-2.095H51.81a23.157,23.157,0,0,0-.53-5.158,9.741,9.741,0,0,0-1.84-3.959,8.64,8.64,0,0,0-3.513-2.565,14.476,14.476,0,0,0-5.548-.92,23.877,23.877,0,0,0-5.3.558,8.939,8.939,0,0,0-4.266,2.286A11.8,11.8,0,0,0,27.945-6.89,28.349,28.349,0,0,0,26.886,1.7a26.778,26.778,0,0,0,.948,7.89,10.894,10.894,0,0,0,2.649,4.628,8.177,8.177,0,0,0,4.1,2.147,25.9,25.9,0,0,0,5.3.5q6.412,0,9.256-3.011A9.4,9.4,0,0,0,51.2,9.726a25.954,25.954,0,0,0,.613-6.078H42.777V5.6a7.181,7.181,0,0,1-.753,3.9,2.476,2.476,0,0,1-2.147,1.059,2.382,2.382,0,0,1-1.422-.418,2.777,2.777,0,0,1-.92-1.478,13.28,13.28,0,0,1-.474-2.872q-.139-1.812-.139-4.6t.139-4.6a13.793,13.793,0,0,1,.474-2.9,2.794,2.794,0,0,1,.92-1.505,2.382,2.382,0,0,1,1.422-.418,2.251,2.251,0,0,1,2.23,1.282,6.9,6.9,0,0,1,.5,1.868A21.4,21.4,0,0,1,42.777-2.095Zm8.475-21.467V16.25H61.289V8.5l1.673-2.621L68.036,16.25H78.741L69.318-1.482l8.364-12.434H66.976L61.4-3.489h-.112V-23.562ZM91.008-3.935V-2.6h-5.52V-3.935a7.931,7.931,0,0,1,.585-3.513A2.2,2.2,0,0,1,88.22-8.563a2.256,2.256,0,0,1,2.2,1.115A7.931,7.931,0,0,1,91.008-3.935Zm-5.52,6.8h14.888V-.2a26.643,26.643,0,0,0-.753-6.886,10.777,10.777,0,0,0-2.286-4.461,8.5,8.5,0,0,0-3.792-2.426,17.275,17.275,0,0,0-5.269-.725,17.421,17.421,0,0,0-5.827.864,8.939,8.939,0,0,0-3.987,2.76,12.031,12.031,0,0,0-2.286,4.907,31.955,31.955,0,0,0-.725,7.36,35.646,35.646,0,0,0,.641,7.3,11.461,11.461,0,0,0,2.147,4.879A8.279,8.279,0,0,0,82.2,16.055a19.64,19.64,0,0,0,6.078.809q6.245,0,8.977-2.816T100.1,5.656H91.064q0,3.067-.753,4.154A2.4,2.4,0,0,1,88.22,10.9a2.657,2.657,0,0,1-1.9-.809q-.836-.809-.836-3.262ZM98.2-13.916v6.747h3.346V8.89a14.071,14.071,0,0,0,.474,4.043,4.436,4.436,0,0,0,1.505,2.314,5.373,5.373,0,0,0,2.649.976,33.236,33.236,0,0,0,3.9.2q1.282,0,2.676-.084t2.788-.084V9.559h-1.561a2.638,2.638,0,0,1-1.812-.53,2.356,2.356,0,0,1-.585-1.812V-7.169h3.959v-6.747h-3.959v-8.866H101.547v8.866ZM124.8,1.195q0-2.453.112-4.07a11.584,11.584,0,0,1,.418-2.593,2.525,2.525,0,0,1,.864-1.366,2.372,2.372,0,0,1,1.394-.39,2.475,2.475,0,0,1,1.45.39,2.525,2.525,0,0,1,.864,1.366,11.583,11.583,0,0,1,.418,2.593q.112,1.617.112,4.07,0,2.4-.112,4.015A11.583,11.583,0,0,1,129.9,7.8a2.525,2.525,0,0,1-.864,1.366,2.475,2.475,0,0,1-1.45.39,2.372,2.372,0,0,1-1.394-.39,2.525,2.525,0,0,1-.864-1.366,11.584,11.584,0,0,1-.418-2.593Q124.8,3.592,124.8,1.195ZM114.762-23.562V16.25h9.7V12.124h.112a7.413,7.413,0,0,0,2.565,3.624,7.43,7.43,0,0,0,4.293,1.115q5.018,0,7.026-3.959T140.466.526a34.734,34.734,0,0,0-.641-7.277,13.765,13.765,0,0,0-1.812-4.684,6.676,6.676,0,0,0-2.9-2.509,9.683,9.683,0,0,0-3.9-.753,7.9,7.9,0,0,0-3.819.92,5.447,5.447,0,0,0-2.481,3.262H124.8V-23.562Zm25.928,0V16.25h10.037V-23.562Zm22.08,33.846a2.12,2.12,0,0,1-1.784-.892,3.9,3.9,0,0,1-.669-2.4,5.6,5.6,0,0,1,.446-2.426,3.253,3.253,0,0,1,1.617-1.478,7.93,7.93,0,0,1,2.035-.641,1.964,1.964,0,0,0,1.366-.753h.111V5.321a7.536,7.536,0,0,1-.725,3.736A2.565,2.565,0,0,1,162.77,10.284Zm3.736,5.966h9.7a7.67,7.67,0,0,1-.781-2.788,36.752,36.752,0,0,1-.167-3.736V-4.994a11.547,11.547,0,0,0-.864-4.823,7.113,7.113,0,0,0-2.453-2.955,9.9,9.9,0,0,0-3.792-1.505,25.9,25.9,0,0,0-4.823-.418,21.106,21.106,0,0,0-3.736.362,10.435,10.435,0,0,0-3.736,1.45,8.867,8.867,0,0,0-2.9,3.067,10.3,10.3,0,0,0-1.171,5.269h8.7a5.561,5.561,0,0,1,.725-3.206,2.6,2.6,0,0,1,2.119-.809q2.565,0,2.565,2.788a3.127,3.127,0,0,1-.669,2.147,4.385,4.385,0,0,1-2.286,1.143l-3.959.948a18.339,18.339,0,0,0-4.015,1.366A7.8,7.8,0,0,0,152.4,1.78a7.019,7.019,0,0,0-1.366,2.7,14.328,14.328,0,0,0-.418,3.68,13.4,13.4,0,0,0,.446,3.569,7.132,7.132,0,0,0,1.45,2.788,6.129,6.129,0,0,0,2.593,1.756,11.265,11.265,0,0,0,3.875.585,8.431,8.431,0,0,0,4.154-1,5.935,5.935,0,0,0,2.649-3.011h.111q.112.948.223,1.784A7.9,7.9,0,0,0,166.506,16.25Zm17.9-9.367h-8.81q0,4.963,2.76,7.472t9.061,2.509a17.952,17.952,0,0,0,5.1-.669,9.992,9.992,0,0,0,3.792-2.007,9.258,9.258,0,0,0,2.37-3.178,9.722,9.722,0,0,0,.836-4.07,8.763,8.763,0,0,0-1.087-4.656,8.631,8.631,0,0,0-2.7-2.788,13.768,13.768,0,0,0-3.485-1.589q-1.868-.558-3.485-1.059a12.852,12.852,0,0,1-2.7-1.143,2.092,2.092,0,0,1-1.087-1.924,2.14,2.14,0,0,1,.725-1.729,2.75,2.75,0,0,1,1.84-.613,2.677,2.677,0,0,1,1.979.7,3.774,3.774,0,0,1,.7,2.649h8.7q0-9.479-11.319-9.479a17.484,17.484,0,0,0-5.325.725,10.531,10.531,0,0,0-3.736,2.007,8.156,8.156,0,0,0-2.2,2.983,9.358,9.358,0,0,0-.725,3.708,8.643,8.643,0,0,0,1.087,4.6,8.918,8.918,0,0,0,2.7,2.816,14.693,14.693,0,0,0,3.485,1.673q1.868.613,3.485,1.171a11.839,11.839,0,0,1,2.7,1.282,2.335,2.335,0,0,1,1.087,2.063,2.258,2.258,0,0,1-.864,1.9,3.228,3.228,0,0,1-2.035.669,2.4,2.4,0,0,1-2.119-1.059,3.126,3.126,0,0,1-.558-1.282A7.974,7.974,0,0,1,184.4,6.882Zm13.1-20.8v6.747h3.346V8.89a14.071,14.071,0,0,0,.474,4.043,4.436,4.436,0,0,0,1.505,2.314,5.373,5.373,0,0,0,2.649.976,33.235,33.235,0,0,0,3.9.2q1.282,0,2.676-.084t2.788-.084V9.559h-1.561a2.638,2.638,0,0,1-1.812-.53,2.356,2.356,0,0,1-.585-1.812V-7.169h3.959v-6.747H210.89v-8.866H200.853v8.866Zm31.058,9.981V-2.6h-5.52V-3.935a7.931,7.931,0,0,1,.585-3.513,2.2,2.2,0,0,1,2.147-1.115,2.256,2.256,0,0,1,2.2,1.115A7.931,7.931,0,0,1,228.565-3.935Zm-5.52,6.8h14.888V-.2a26.643,26.643,0,0,0-.753-6.886,10.777,10.777,0,0,0-2.286-4.461,8.5,8.5,0,0,0-3.792-2.426,17.275,17.275,0,0,0-5.269-.725,17.421,17.421,0,0,0-5.827.864,8.939,8.939,0,0,0-3.987,2.76,12.031,12.031,0,0,0-2.286,4.907,31.954,31.954,0,0,0-.725,7.36,35.647,35.647,0,0,0,.641,7.3,11.461,11.461,0,0,0,2.147,4.879,8.279,8.279,0,0,0,3.959,2.676,19.64,19.64,0,0,0,6.078.809q6.245,0,8.977-2.816t2.844-8.392h-9.033q0,3.067-.753,4.154a2.4,2.4,0,0,1-2.091,1.087,2.657,2.657,0,0,1-1.9-.809q-.836-.809-.836-3.262Zm14.33-16.783V16.25h10.037V-.2q0-3.011,1.478-4.182a6.538,6.538,0,0,1,4.154-1.171q.613,0,1.227.056t1.282.167V-14.7h-1.617a6.5,6.5,0,0,0-4.07,1.422,8.03,8.03,0,0,0-2.676,4.154h-.112v-4.8Z"
                transform="translate(-0.066 23.562)"
              />
            </svg>
            <div className={classes["img-container"]}>
              <img
                src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
                alt="event"
              />
            </div>
            <div className={classes["modal-info"]}>
              <div className={classes.left}>
                <h1>{selectedEvent.artist}</h1>
                <span className={classes.date}>
                  {formatTime(selectedEvent.date)}
                </span>
                <span className={classes.location}>
                  {selectedEvent.city}, {selectedEvent.country}
                </span>
              </div>
              <div className={classes.right}>
                <img
                  src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
                  alt="event"
                  className={classes.barcode}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className={classes.grid}>
        {ticketsHistory.length === 0 ? (
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
                openModal={props.openModal}
                text="Print"
                onPrint={handlePrint}
                event={event.event}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default TicketsHistory;
