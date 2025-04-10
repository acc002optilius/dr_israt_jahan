import React, { useEffect, useRef, useState } from "react";
import Container from "../../Layout/Container";
import SectionTitle from "../../Layout/Title/SectionTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import { FaAmbulance, FaHandHoldingUsd, FaStethoscope } from "react-icons/fa";
import { PiGlobeStandBold, PiHeartbeatBold } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import rounndShape from "../../assets/WhyChoosUs/round.png";
import img1 from "../../assets/Statistics/doctor.png";
import img2 from "../../assets/Statistics/doctor-visit.png";
import img3 from "../../assets/Statistics/department.png";
import img4 from "../../assets/Statistics/staff.png";
import pageBg from "../../assets/Statistics/pageBg.jpg";
import CountUp from "react-countup";
import PrimaryButton from "../../Layout/Button/PrimaryButton";
import { LuFileText } from "react-icons/lu";
import { useInView } from "react-intersection-observer";

const Statistics = ({ translations, statistics }) => {
  // Merge API data with static JSON data
  const departmentsJsonData = [
    {
      icon: img1,
      title: "Doctors",
      key: "Doctors",
      count: statistics?.doctors || 1,
      suffix: "",
    },
    {
      icon: img2,
      title: "Patients Served",
      key: "Patients_Served",
      count: statistics?.patients || 3,
      suffix: "+",
    },
    {
      icon: img3,
      title: "Departments",
      key: "Departments",
      count: statistics?.departments || 4,
      suffix: "",
    },
    {
      icon: img4,
      title: "Trained Staff",
      key: "Trained_Staff",
      count: statistics?.staffs || 200,
      suffix: "",
    },
  ];

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  // Track when the component is in view
  const [ref, inView] = useInView({
    triggerOnce: false, // This will allow it to trigger each time it comes into view
    threshold: 0.1,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // Json Data Translation
  const getTranslatedText = (key, fallback) => {
    if (!translations || !selectedLanguage) return fallback;

    const items = translations[key];
    if (!items || !Array.isArray(items)) return fallback;

    const matched = items.find(
      (item) => item.lang_code === selectedLanguage.lang_code
    );
    return matched?.value || fallback;
  };

  const localizedData = departmentsJsonData.map((item) => ({
    ...item,
    title: getTranslatedText(item.key, item.title),
    desc: getTranslatedText(item.descKey, item.desc),
  }));

  // Static Translation
  const getTranslation = (key, defaultText) => {
    if (!translations || !selectedLanguage) return defaultText;

    const translationArray = translations[key];
    if (!translationArray) return defaultText;

    const translation = translationArray.find(
      (item) => item.lang_code === selectedLanguage?.lang_code
    );
    return translation ? translation.value : defaultText;
  };

  return (
    <div
      ref={ref}
      className="relative py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg overflow-hidden"
      style={{
        backgroundImage: `url(${pageBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay with offset color */}
      <div className="absolute inset-0 bg-[#000] bg-opacity-[0.6]"></div>

      <div className="relative z-10">
        <Container>
          <div className="grid lg:grid-cols-12 items-center gap-y-6 ">
            <div className="lg:col-span-5 "
              data-aos="fade-right"
            >
              <SectionTitle
                className="!text-secondary"
                text={getTranslation(
                  "What_Make_Us_The_Best_Among_Others",
                  "What Make Us the Best Among Others?"
                )}
              />
              <MinTitle
                className="py-3 text-secondary"
                text={getTranslation(
                  "What_Make_Us_The_Best_Among_Others_Desc",
                  "Unmatched expertise and distinguished accomplishments in vascular surgery and healthcare leadership."
                )}
              />
              <div className="inline-block pt-2">
                <PrimaryButton
                  className="capitalize font-medium"
                  text={getTranslation(
                    "Make_An_Appointment",
                    "Make An Appointment"
                  )}
                  icon={<LuFileText />}
                />
              </div>
            </div>
            <div className="lg:col-span-7 relative flex justify-center md:justify-end ">
              <div className="grid grid-cols-2 gap-x-5 gap-y-5 lg:gap-y-0 pt-4 items-start lg:items-start">
                {localizedData?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`group px-4 lg:px-16 py-6 bg-white bg-opacity-90 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 mt-0 ${index % 2 === 1 ? 'lg:mt-5' : ''}`}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
                    >
                      <div className="">
                        <div className="w-[50px] m-auto">
                          <img src={item.icon} alt="" className="m-auto" />
                        </div>

                        <div className=" text-center">
                          <MidTitle className="text-lg font-bold text-primary" />
                          <div className="font-bold text-2xl pt-4">
                            {inView ? (
                              <CountUp
                                className=""
                                key={
                                  inView
                                    ? `count-up-${item.key}`
                                    : `count-up-reset`
                                } // Reset counter when revisited
                                start={0} // Always start from 0
                                end={item.count}
                                suffix={item.suffix}
                                duration={2}
                              />
                            ) : (
                              `0${item.suffix}`
                            )}
                          </div>

                          <MinTitle
                            className="text-sm text-medium text-primary"
                            text={
                              item.title?.length > 60
                                ? item.title.slice(0, 60) + "..."
                                : item.title
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Statistics;
