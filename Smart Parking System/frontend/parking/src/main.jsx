import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {Toaster} from "react-hot-toast";
import {ParkingProvider} from "./context/ParkingContext";
import {ThemeProvider} from "./context/ThemeContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "16px",
          padding: "16px",
        },
      }}
    />

    <ParkingProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ParkingProvider>

  </React.StrictMode>
);
