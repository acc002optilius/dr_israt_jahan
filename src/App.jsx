import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import Header from "./Components/Header/Header";
import ScrollToTop from "./Utils/ScrollToTop";

import Preloader from "./Utils/Preloader";
import { LoadingProvider, useLoading } from "./Utils/Context/LoadingContext";


function AppWrapper() {
  return (
    <LoadingProvider>
      <App />
    </LoadingProvider>
  );
}

function App() {
  const { isLoading } = useLoading();

  return (
    <div className="relative">
      {isLoading && <Preloader />}
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default AppWrapper;