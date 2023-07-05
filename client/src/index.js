import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/routes/App";
import { AuthContextProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </AuthContextProvider>
);
