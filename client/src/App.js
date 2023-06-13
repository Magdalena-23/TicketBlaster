import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Login from "./components/auth/Login";
import MusicalConcerts from "./components/Events/MusicalConcerts";
import ComedyShows from "./components/Events/ComedyShows";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Footer from "./components/Layout/Footer";
import Home from "./components/Events/Home";
import LayoutComponent from "./components/Layout/LayoutComponent";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <LayoutComponent>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/musical-concerts" element={<MusicalConcerts />} />
            <Route path="/comedy-shows" element={<ComedyShows />} />
          </Routes>
        </LayoutComponent>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
