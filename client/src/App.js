import { BrowserRouter, Route, Routes } from "react-router-dom";

import HeroSection from "./components/Events/HeroSection";
import Header from "./components/Layout/Header";
import Login from "./components/auth/Login";
import MusicalConcerts from "./components/Events/MusicalConcerts";
import ComedyShows from "./components/Events/ComedyShows";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HeroSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/musical-concerts" element={<MusicalConcerts />} />
            <Route path="/comedy-shows" element={<ComedyShows />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
