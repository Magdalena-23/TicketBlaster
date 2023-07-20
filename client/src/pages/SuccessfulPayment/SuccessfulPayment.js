import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import classes from "./SuccessfulPayment.module.css";
import CartItem from "../../components/cart/CartItem/CartItem"
import Title from "../../components/common/Title/Title";
import { formatTime } from "../../helpers/timeFormat";
import PrintModal from "../../components/common/Modal/PrintModal/PrintModal";

const SuccessfulPayment = (props) => {
  const location = useLocation();
  const cartItems = location.state.cartItems;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  const handlePrint = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
     {showPrint && (
        <PrintModal
          onClose={() => setShowPrint(false)}
          selectedEvent={selectedEvent}
          print={true}
        />
      )}
      <Title>Thank you for your purchase!</Title>
      {cartItems.map((purchasedTicket) => {
        return (
          <CartItem
            className={classes.flex}
            key={purchasedTicket._id}
            artist={purchasedTicket.event.artist}
            img={purchasedTicket.event.img}
            city={purchasedTicket.event.city}
            country={purchasedTicket.event.country}
            date={formatTime(purchasedTicket.event.date)}
            price={purchasedTicket.event.price}
            quantity={purchasedTicket.quantity}
            text="Print"
            smaller={true}
            openModal={() => setShowPrint(true)}
            onPrint={() => handlePrint(purchasedTicket.event)}
          />
        );
      })}
    </div>
  );
};

export default SuccessfulPayment;
