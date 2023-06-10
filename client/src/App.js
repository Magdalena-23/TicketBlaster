import { BrowserRouter, Route, Routes } from "react-router-dom";

import HeroSection from "./components/Events/HeroSection";
import Header from "./components/Layout/Header";
import Login from "./components/auth/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
