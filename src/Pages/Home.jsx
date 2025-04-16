import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../Components/Home/Banner/Banner";
import SupportOne from "../Components/Home/SupportOne";
import CMO from "../Components/Home/CMO";
import MissionVission from "../Components/Home/MissionVission";
import {
  commonDataApi,
  homeContentApi,
  landingSectionDataApi,
} from "../Api/Api";
import { useLoading } from "../Utils/Context/LoadingContext";
import { useDispatch, useSelector } from "react-redux";
import { setSiteCommonData } from "../Redux/Slices/siteCommonData";
import { setInitialLanguage } from "../Redux/Slices/languageSlice";
import OurDepartment from "../Components/Home/OurDepartment";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import Statistics from "../Components/Home/Statistics";
import DoctorsOverView from "../Components/Home/DoctorsOverView";
import MakeAppointment from "../Components/Home/MakeAppointment";
import OurServices from "../Components/Home/OurServices";
import Testimonial from "../Components/Home/Testimonial";
import CaseStudisOverview from "../Components/Home/CaseStudisOverview";
import GallaryOveriew from "../Components/Home/GallaryOveriew";
import BlogsOverview from "../Components/Home/BlogsOverview";
import Preloader from "../Utils/Preloader";

const Home = () => {
  const [isLoading , setIsLoading] = useState(true);
  const [homeContentData, setHomeContentData] = useState([]);
  const [bannerData, setBannerData] = useState();
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        // Fetch all data in parallel
        const [bannerResponse, contentResponse, commonDataResponse] =
          await Promise.all([
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

  console.log(homeContentData);

  return (
    <div className="">
            {isLoading && <Preloader />}
      <Banner
        bannerData={bannerData}
        translations={homeContentData.translations}
      />
      <SupportOne translations={homeContentData.translations} />
      <CMO />
      <MissionVission translations={homeContentData.translations} />
      <OurDepartment
        translations={homeContentData.translations}
        department={homeContentData?.department}
      />
      <WhyChooseUs translations={homeContentData.translations} />
      <Statistics
        translations={homeContentData.translations}
        statisticsData={homeContentData?.statistics}
      />
      <DoctorsOverView
        translations={homeContentData.translations}
        data={homeContentData?.doctors}
      />
      <MakeAppointment
        doctorsList={homeContentData.doctors}
        translations={homeContentData.translations}
      />
      <OurServices
        translations={homeContentData.translations}
        data={homeContentData?.services}
      />
      <Testimonial
        translations={homeContentData.translations}
        data={homeContentData?.testimonials}
      />
      <CaseStudisOverview
        translations={homeContentData.translations}
        data={homeContentData?.case_studies}
      />
      <GallaryOveriew
        translations={homeContentData.translations}
        data={homeContentData?.gallery}
      />
      <BlogsOverview
        translations={homeContentData.translations}
        data={homeContentData?.blogs}
      />
    </div>
  );
};

export default Home;
