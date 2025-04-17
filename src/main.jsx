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
import Contact from "./Pages/Contact.jsx";
import Doctors from "./Pages/Doctors.jsx";
import SingleDepartment from "./Pages/SingleDepartment.jsx";
import Blog from "./Pages/Blog.jsx";
import Gallery from "./Pages/Gallery.jsx";
import CaseStudies from "./Pages/CaseStudies.jsx";
import Faq from "./Pages/Faq.jsx";
import FindDoctors from "./Pages/FindDoctors.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        {/* Single Service */}
        <Route path="/service/:slug" element={<Contact />} />
        {/* Single Service */}
        <Route path="/department/:slug" element={<SingleDepartment />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/faqs" element={<Faq />} />

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

