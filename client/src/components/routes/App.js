import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="wrapper">
          <LayoutComponent>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/user-details" element={<UserDetails />} />
                <Route path="/tickets-history" element={<TicketsHistory />} />
                <Route path="/users" element={<Users />} />
                <Route path="/events">
                  <Route index element={<Events />} />
                  <Route path="create-event" element={<CreateEvent />} />
                  <Route path="update-event/:id" element={<UpdateEvent />} />
                </Route>
                <Route
                  path="/successful-payment"
                  element={<SuccessfulPayment />}
                />
              </Route>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/event-details/:id" element={<EventDetails />} />
              <Route path="/musical-concerts" element={<MusicalConcerts />} />
              <Route path="/comedy-shows" element={<ComedyShows />} />
              <Route path="/search-results" element={<SearchResults />} />
            </Routes>
          </LayoutComponent>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
