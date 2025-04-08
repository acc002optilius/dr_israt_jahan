import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import ScrollToTop from "./Utils/ScrollToTop";
import Header from "./Components/Header/Header";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Render application layout
  return (
    <div className="relative">
        <Header/>
        {/* <ScrollToTop /> */}

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
        <Outlet /> {/* Pass data via context */}
    </div>
  );
}

export default App;






