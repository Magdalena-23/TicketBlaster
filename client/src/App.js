import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header/Header";
import Login from "./components/auth/Login/Login";
import MusicalConcerts from "./pages/MusicalConcerts/MusicalConcerts";
import ComedyShows from "./pages/StandUpComedy/ComedyShows";
import Register from "./components/auth/Register/Register";
import ForgotPassword from "./components/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword/ResetPassword";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import LayoutComponent from "./components/layout/LayoutComponent/LayoutComponent";
import TicketsHistory from "./pages/TicketsHistory/TicketsHistory";
import LoggedInNav from "./components/layout/LoggedInNav/LoggedInNav";

function App() {
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
              <Route path="/tickets-history" element={<TicketsHistory />} />
            </Routes>
          </LayoutComponent>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
