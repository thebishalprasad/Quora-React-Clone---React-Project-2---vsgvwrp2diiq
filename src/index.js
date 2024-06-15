import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import App from "./components/App";
import { UserProvider } from "./components/Utils/UserProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
        <ToastContainer />
        <App />
    </UserProvider>
);
