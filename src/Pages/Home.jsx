import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../Components/Home/Banner/Banner";
import SupportOne from "../Components/Home/SupportOne";
import CMO from "../Components/Home/CMO";
import MissionVission from "../Components/Home/MissionVission";
import { commonDataApi, homeContentApi, landingSectionDataApi } from "../Api/Api";
import { useLoading } from "../Utils/Context/LoadingContext";
import { useDispatch, useSelector } from "react-redux";
import { setSiteCommonData } from "../Redux/Slices/siteCommonData";
import { setInitialLanguage } from "../Redux/Slices/languageSlice";
import OurDepartment from "../Components/Home/OurDepartment";

const Home = () => {
  const { setIsLoading } = useLoading();
  const [homeContentData, setHomeContentData] = useState([]);
  const [bannerData, setBannerData] = useState();
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        // Fetch all data in parallel
        const [bannerResponse, contentResponse, commonDataResponse] = await Promise.all([
          axios.get(landingSectionDataApi),
          axios.get(homeContentApi),
        ]);

        setBannerData(bannerResponse.data.data);
        setHomeContentData(contentResponse.data.data);
        
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();

    return () => {
      setIsLoading(false);
    };
  }, [dispatch, setIsLoading]);
 // Fetch CommonData Api
 useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(commonDataApi, {});
      dispatch(setSiteCommonData(response.data.data));  
      // Ensure default language is set if missing
      if (!selectedLanguage && response.data.data.site_languages?.length > 0) {
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
    <div className="">
      <Banner bannerData={bannerData} translations={homeContentData.translations} />
      <SupportOne translations={homeContentData.translations}/>
      <CMO />
      <MissionVission translations={homeContentData.translations} />
      <OurDepartment translations={homeContentData.translations} department={homeContentData?.department}/>

    </div>
  );
};

export default Home;