import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

// axios.defaults.baseURL = "http://mern-stack-app-iota.vercel.app";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
