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
import LoggedInNav from "../layout/LoggedInNav/LoggedInNav";
import PrivateRoute from "./PrivateRoute";
import EventDetails from "../../pages/EventDetails/EventDetails";

const App = () => {
  console.log("app");
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="wrapper">
          <LayoutComponent>
            <LoggedInNav />
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
              <Route path="/event-details/:id" element={<EventDetails />} />
              <Route element={<PrivateRoute />}>
                <Route path="/tickets-history" element={<TicketsHistory />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/user-details" element={<UserDetails />} />
              </Route>
            </Routes>
          </LayoutComponent>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
