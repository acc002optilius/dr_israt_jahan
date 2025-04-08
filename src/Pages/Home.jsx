import React, { useEffect, useState } from "react";
import Container from "../Layout/Container";
import Banner from "../Components/Home/Banner/Banner";
import { commonDataApi, homeContentApi } from "../Api/Api";
import axios from "axios";
import SupportOne from "../Components/Home/SupportOne";
import CMO from "../Components/Home/CMO";
import { useDispatch, useSelector } from "react-redux";
import { setSiteCommonData } from "../Redux/Slices/siteCommonData";
import { setInitialLanguage } from "../Redux/Slices/languageSlice";

const TestComponent = () => {
  const [loading , setLoading] = useState(true)
  const [homeContentData , setHomeContentData] = useState([])
  const dispatch = useDispatch()
  const site_languages = useSelector((state) => state.commonData.siteCommonData.commonData);
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
    // Fetch Home Content Api Api
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(homeContentApi, {});  
          console.log(response);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    // Fetch Home Content Api Api
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(commonDataApi, {});
          dispatch(setSiteCommonData(response.data.data));  
          // Ensure default language is set if missing
          if (!selectedLanguage && response.data.data.site_languages?.length > 0) {
            dispatch(setInitialLanguage(response.data.data.site_languages));
          }
          console.log(response);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    const demo = useSelector((state) => console.log(state)
    )
    
  return (
<>
<Banner/>
<SupportOne/>
<CMO/>
</>
  );
};

export default TestComponent;
