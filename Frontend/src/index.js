import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

// backend url : https://mern-stack-app-theta.vercel.app/

axios.defaults.baseURL = "https://mern-stack-app-theta.vercel.app/";
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
