import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Header from "../layout/Header/Header";
import Login from "../auth/Login/Login";
import MusicalConcerts from "../../pages/MusicalConcerts/MusicalConcerts";
import ComedyShows from "../../pages/StandUpComedy/ComedyShows";
import Register from "../auth/Register/Register";
import ForgotPassword from "../auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../auth/ResetPassword/ResetPassword";
import Footer from "../layout/Footer/Footer";
import Home from "../../pages/Home/Home";
import LayoutComponent from "../layout/LayoutComponent/LayoutComponent";
import TicketsHistory from "../../pages/TicketsHistory/TicketsHistory";
import UserDetails from "../../pages/UserDetails/UserDetails";
import Users from "../../pages/Users/Users";
import EventDetails from "../../pages/EventDetails/EventDetails";
import SearchResults from "../../pages/SearchResults/SearchResults";
import Events from "../../pages/Events/Events";
import CreateEvent from "../../pages/CreateEvent/CreateEvent";
import Cart from "../../pages/Cart/Cart";
import Checkout from "../../pages/Checkout/Checkout";
import SuccessfulPayment from "../../pages/SuccessfulPayment/SuccessfulPayment";
import UpdateEvent from "../../pages/UpdateEvent/UpdateEvent";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="wrapper">
          <LayoutComponent>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/musical-concerts" element={<MusicalConcerts />} />
              <Route path="/comedy-shows" element={<ComedyShows />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/event-details/:id" element={<EventDetails />} />
              <Route path="/update-event/:id" element={<UpdateEvent />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/users" element={<Users />} />
              <Route path="/events" element={<Events />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route
                path="/successful-payment"
                element={<SuccessfulPayment />}
              />
              {/* <Route element={<PrivateRoute />}> */}
              <Route
                path="/tickets-history"
                element={
                  <TicketsHistory
                    onClose={closeModal}
                    openModal={openModal}
                    isModalOpen={isModalOpen}
                  />
                }
              />
              {/* </Route> */}
              {/* <Route element={<PrivateRoute />}> */}
              <Route path="/user-details" element={<UserDetails />} />
              {/* </Route> */}
            </Routes>
          </LayoutComponent>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
