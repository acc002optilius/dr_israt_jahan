import React from "react";
import { supportOneJsonData } from "../../JsonData/SupportOneJsonData";
import MidTitle from "../../Layout/Title/MidTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import { motion } from 'framer-motion';
const SupportOne = () => {
  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {supportOneJsonData.map((item, index) => {
          return (
            <motion.div
            key={index}
            className="px-8 py-12 text-center group text-primary hover:!bg-theme transition-all duration-500 ease-in-out"
            style={{ backgroundColor: item.bg }}
            initial={{ opacity: 0, y: 50 }} // Initial position (hidden and below)
            animate={{ opacity: 1, y: 0 }} // Final position (fully visible and in place)
            transition={{ duration: 0.5 }} // Duration of the animation
          >
              <p className="text-center flex justify-center text-6xl text-theme group-hover:text-secondary">{item.icon}</p>
              <MidTitle className="py-2 font-semibold  text-primary group-hover:text-secondary" text={item.title} />
              <MinTitle className=" text-primary group-hover:text-secondary" text={item.desc} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportOne;
