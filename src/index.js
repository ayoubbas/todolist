import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupForm from "./pages/SignUp";
import Signin from "./pages/SignIn";

const onValid = () => {
  console.log("hhhhhhhh");
};

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "signup", element: <SignupForm onValid={onValid} /> },
  { path: "signin", element: <Signin onValid={onValid} /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
