import React, { useEffect, useState } from "react";
import Container from "../Layout/Container";

import axios from "axios";
import {  termConditionPageContentApi } from "../Api/Api";
import SectionTitle from "../Layout/Title/SectionTitle";
import PolicyCard from "../Components/Policy/PolicyCard";
const TermCondition = () => {
  const [pageData , setPageData] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(termConditionPageContentApi , {})
      setPageData(response?.data?.data?.content?.content)
      console.log(response);
      
    }
    fetchData()
  },[])
  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg bg-secondary ">
      <Container>
        <div className="flex items-center justify-between pb-sectionSm lg:pb-sectionMd">
          <SectionTitle className="font-semibold !text-primary" text="Term & Condition" />
          {/* <Breadcrumb /> */}
        </div>
        <PolicyCard pageData={pageData} />
      </Container>
    </div>
  );
};

export default TermCondition;
