import React, { useEffect } from "react";
import MidTitle from "../../Layout/Title/MidTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { BiSupport } from "react-icons/bi";
import { FaAmbulance, FaRegHospital } from "react-icons/fa";
import { LiaUserNurseSolid } from "react-icons/lia";
export const defaultData = [
  {
    title: "Expert Medical Staff",
    key: "Expert_Medical_Staff",
    icon: <LiaUserNurseSolid />, // You can replace this with the actual icon path or URL
    bg: "#ddebf3", // You can replace this with the actual background image path or URL
    desc: "Our highly skilled and compassionate medical team is here to provide the best healthcare services.",
    duration: "400",
    descKey: "Expert_Medical_Staff_desc",
  },
  {
    title: "24/7 Patient Support",
    key: "24_7_Patient_Support",
    icon: <BiSupport />, // You can replace this with the actual icon path or URL
    bg: "#dee5e3", // You can replace this with the actual background image path or URL
    desc: "We offer round-the-clock patient support to ensure you receive care anytime you need it.",
    duration: "1000",
    descKey: "24_7_Patient_Support_desc",
  },
  {
    title: "Emergency Services",
    key: "Emergency_Services",
    icon: <FaAmbulance />, // You can replace this with the actual icon path or URL
    bg: "#4c473c4f", // You can replace this with the actual background image path or URL
    desc: "Fast and reliable emergency medical services available 24/7 for urgent healthcare needs.",
    duration: "1400",
    descKey: "Emergency_Services_desc",
  },
  {
    title: "Modern Facilities",
    key: "Modern_Facilities",
    icon: <FaRegHospital />, // You can replace this with the actual icon path or URL
    bg: "#4c56583b", // You can replace this with the actual background image path or URL
    desc: "We provide state-of-the-art medical facilities and advanced healthcare technology.",
    duration: "2000",
    descKey: "Modern_Facilities_desc",
  },
];
const SupportOne = ({ translations }) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    AOS.init({
      // duration: 1000, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);

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

  const localizedData = defaultData.map((item) => ({
    ...item,
    title: getTranslatedText(item.key, item.title),
    desc: getTranslatedText(item.descKey, item.desc),
  }));
  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {localizedData.map((item, index) => {
          return (
            <div
              key={index}
              className="px-8 py-12 text-center group text-primary hover:!bg-theme !transition-all !duration-500 !ease-in-out"
              style={{ backgroundColor: item.bg }}
              data-aos="fade-up"
              data-aos-duration={item.duration}
            >
              <p className="text-center flex justify-center text-6xl text-theme group-hover:text-secondary">
                {item.icon}
              </p>
              <MidTitle
                className="py-2 font-semibold  text-primary group-hover:text-secondary"
                text={item.title}
              />
              <MinTitle
                className=" text-primary group-hover:text-secondary"
                text={item.desc}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportOne;
