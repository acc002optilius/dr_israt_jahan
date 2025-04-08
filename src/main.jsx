import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { StrictMode } from "react";
import { Provider, useSelector } from "react-redux"; // Import Redux's Provider
import './index.css';
import Error from "./Pages/Error.jsx";
import Home from "./Pages/Home.jsx";
import App from "./App.jsx";
import { store } from "./Redux/Store/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Route>
    </>
  )
);

// Wrap the entire app in the Redux Provider
// In main.jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

