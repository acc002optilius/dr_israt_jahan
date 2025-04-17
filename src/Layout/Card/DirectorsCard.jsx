import React, { useEffect } from "react";
import { api } from "../../Api/Api";
import defaultDoctorImg from "../../assets/Doctor/defaultDoctorImg.jpg";
import MinTitle from "../Title/MinTitle";
import { useSelector } from "react-redux";
// If using react-icons (recommended)

import AOS from "aos";
import "aos/dist/aos.css";
import MidTitle from "../Title/MidTitle";
const DirectorsCard = ({
  designation ,
  firstName,
  lastName,
  image,
  cardAnimation,
  key,
}) => {


  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );


  //   Handle Go Single Doctor
  const handleSingleDoctor = (id) => {
    console.log(id);

  }

  // For Animation
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);




  return (
    <div
      // data-aos={`${cardAnimation}`} data-aos-duration="2000" data-aos-delay="300"
      key={key}
      className=" overflow-hidden rounded-lg shadow-sm hover:shadow-sm duration-500 border-[1px] border-borderColor border-opacity-[0.4] hover:translate-y-[-4%]"
    >
      {/* Image with overlay effect */}
      <div className="relative aspect-square flex-1 overflow-hidden">
        <img
          src={image ? `${api}/${image}` : defaultDoctorImg}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover transition-all duration-500 "
        />
      </div>

      {/* Doctor info */}
      <div onClick={() => handleSingleDoctor(doctorId)} className="bg-transparent border-t-[1px] border-theme group-hover:border-secondary p-4 text-center flex-none duration-500 ">
        <MidTitle
          className="text-primary font-bold text-lg"
          text={`${firstName} ${lastName}`.length > 15 ? `${firstName} ${lastName}`.slice(0, 20) + "..." : `${firstName} ${lastName}`}
        />

        <MinTitle
          className="text-primary"
          text={designation?.length > 40 ? designation.slice(0, 40) + "..." : designation}
        />
      </div>
    </div>
  );
};

export default DirectorsCard;
