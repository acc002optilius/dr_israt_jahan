import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import Header from "./Components/Header/Header";
import ScrollToTop from "./Utils/ScrollToTop";

import Preloader from "./Utils/Preloader";
import { LoadingProvider, useLoading } from "./Utils/Context/LoadingContext";
import axios from "axios";
import { commonDataApi } from "./Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setInitialLanguage } from "./Redux/Slices/languageSlice";
import { setSiteCommonData } from "./Redux/Slices/siteCommonData";
import Newsletter from "./Components/Footer/Newsletter";
import Footer from "./Components/Footer/Footer";


function AppWrapper() {
  return (
    <LoadingProvider>
      <App />
    </LoadingProvider>
  );
}

function App() {
    const { setIsLoading } = useLoading();
    const dispatch = useDispatch()
    const selectedLanguage = useSelector(
      (state) => state.language.selectedLanguage
    );
  const { isLoading } = useLoading();
 // Fetch CommonData Api
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(commonDataApi, {});
        dispatch(setSiteCommonData(response.data.data));
        // Ensure default language is set if missing
        if (
          !selectedLanguage &&
          response.data.data.site_languages?.length > 0
        ) {
          dispatch(setInitialLanguage(response.data.data.site_languages));
        }
        // console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="relative">
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
      <Newsletter/>
      <Footer/>
    </div>
  );
}

export default AppWrapper;