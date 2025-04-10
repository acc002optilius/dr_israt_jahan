import React, { useEffect } from "react";
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
import why2 from "../../assets/WhyChoosUs/why-02.jpg";
import why1 from "../../assets/WhyChoosUs/why-01.jpg";
import why3 from "../../assets/WhyChoosUs/why-03.jpg";
const whyChooseData = [
  {
    icon: <FaAmbulance />,
    title: "24/7 Service & Check",
    key: "home_why_choose_title_24_7_service",
    descKey: "home_why_choose_desc_24_7_service",
    desc: "We provide round-the-clock medical support and routine health checks for your peace of mind.",
  },
  {
    icon: <FaStethoscope />,
    title: "Medichine Expert",
    key: "home_why_choose_title_medichine_expert",
    descKey: "home_why_choose_desc_medichine_expert",
    desc: "Our team includes specialists with deep expertise in modern medical treatments and care.",
  },
  {
    icon: <PiHeartbeatBold />,
    title: "Emergency Help",
    key: "home_why_choose_title_emergency_help",
    descKey: "home_why_choose_desc_emergency_help",
    desc: "Fast and responsive emergency services to handle any urgent health situations efficiently.",
  },
  {
    icon: <FaUserDoctor />,
    title: "Qualified Doctors",
    key: "home_why_choose_title_qualified_doctors",
    descKey: "home_why_choose_desc_qualified_doctors",
    desc: "Our doctors are certified, experienced, and dedicated to delivering exceptional medical care.",
  },
  {
    icon: <PiGlobeStandBold />,
    title: "World Class Treatment",
    key: "home_why_choose_title_world_class_treatment",
    descKey: "home_why_choose_desc_world_class_treatment",
    desc: "We offer globally recognized healthcare standards and advanced medical technology.",
  },
  {
    icon: <FaHandHoldingUsd />,
    title: "Affordable Prices",
    key: "home_why_choose_title_affordable_prices",
    descKey: "home_why_choose_desc_affordable_prices",
    desc: "Quality medical services that are budget-friendly and accessible to everyone.",
  },
];

const WhyChooseUs = ({ translations }) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);

  // Json Data Translation
  // Translation
  const getTranslatedText = (key, fallback) => {
    if (!translations || !selectedLanguage) return fallback;

    const items = translations[key];
    if (!items || !Array.isArray(items)) return fallback;

    const matched = items.find(
      (item) => item.lang_code === selectedLanguage.lang_code
    );
    return matched?.value || fallback;
  };

  const localizedData = whyChooseData.map((item) => ({
    ...item,
    title: getTranslatedText(item.key, item.title),
    desc: getTranslatedText(item.descKey, item.desc),
  }));

  // Static Translation
  // Function to get translated text
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
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg bg-theme bg-opacity-[0.3]   overflow-hidden ">
      <Container>
        <div className="grid lg:grid-cols-12  items-center gap-y-6 gap-x-6">
          <div className="col-span-7 order-2 md:order-1" data-aos="fade-right">
            <SectionTitle
              text={getTranslation("Why_Choose_Us", "Why Choose Us")}
            />
            <MinTitle
              className="py-2"
              text={getTranslation(
                "Why_Choose_Us_Desc",
                "Our commitment to excellence has earned us recognition as one of the nation's top healthcare providers."
              )}
            />
            <div className="grid lg:grid-cols-2 gap-4 pt-4 ">
              {localizedData?.map((item, index) => {
                return (
                  <div key={index} className="group">
                    <div className="flex gap-3 items-start ">
                      <div className="icon text-base p-[14px] text-secondary bg-theme rounded-full border-[1px] border-theme group-hover:bg-transparent group-hover:text-theme duration-300">
                        {item.icon}
                      </div>
                      <div className="">
                        <MidTitle
                          className="text-lg font-semibold text-primary"
                          text={item.title}
                        />
                        <MinTitle
                          className="text-sm text-medium text-primary"
                          text={
                            item.desc.length > 60
                              ? item.desc.slice(0, 60) + "..."
                              : item.desc
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-5 relative flex justify-end order-1 md:order-2s">
            <div className="image">
              <div className="flex gap-2 items-center ">
                <img
                  src={why2}
                  alt=""
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="aspect-[4/4] max-h-[110px] md:max-h-[220px] object-fill rounded-[20%] border-[4px] border-borderColor"
                />
                <img
                  src={why1}
                  alt=""
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  className="aspect-[1/1.7] max-h-[220px] md:max-h-[350px] object-fill rounded-full border-[4px] border-borderColor"
                />
              </div>
              <img
                src={why3}
                alt=""
                data-aos="fade-up"
                data-aos-duration="1000"
                className="absolute bottom-0 md:bottom-[-20%] right-[30%] aspect-[1/1] max-h-[110px] md:max-h-[200px] object rounded-full border-[4px] border-borderColor"
              />
            </div>
            <img
        className="absolute top-[10%] right-[10%] z-10 w-[80%] m-auto z-[-2]"
        src={rounndShape}
        alt="Spinning Shape"
        data-aos="zoom-in"
        data-aos-duration="1000"
        style={{
          animation: "spin 6s linear infinite", // Apply the animation here
        }}
      />
            <style>
              {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
             animation: spin 2s linear infinite;
          }
        `}
            </style>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhyChooseUs;
