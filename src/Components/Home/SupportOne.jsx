import React, { useEffect } from "react";
import { supportOneJsonData } from "../../JsonData/SupportOneJsonData";
import MidTitle from "../../Layout/Title/MidTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import { motion } from 'framer-motion';
import AOS from "aos";
import "aos/dist/aos.css";
const SupportOne = () => {
    useEffect(() => {
      AOS.init({
        duration: 1000, // animation duration in ms
        once: false, // allows animation every time section enters view
      });
    }, []);
  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {supportOneJsonData.map((item, index) => {
          return (
            <div
            key={index}
            className="px-8 py-12 text-center group text-primary hover:!bg-theme transition-all duration-500 ease-in-out"
            style={{ backgroundColor: item.bg }}
            data-aos="fade-up"

          >
              <p className="text-center flex justify-center text-6xl text-theme group-hover:text-secondary">{item.icon}</p>
              <MidTitle className="py-2 font-semibold  text-primary group-hover:text-secondary" text={item.title} />
              <MinTitle className=" text-primary group-hover:text-secondary" text={item.desc} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportOne;
