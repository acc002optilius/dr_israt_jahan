import React, { useEffect } from "react";
import { api } from "../../Api/Api";
import defaultDoctorImg from "../../assets/Doctor/defaultDoctorImg.jpg";
import MinTitle from "../Title/MinTitle";
import { useSelector } from "react-redux";
// If using react-icons (recommended)
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoArrowRedoSharp } from "react-icons/io5";
const CaseStudisCard = ({ name, image, cardAnimation, key, slug, shortDesc }) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  //   Handle Go Single Doctor
  const handleSingleService = (slug) => {
    console.log(slug);
  };

  // For Animation
  useEffect(() => {
    AOS.init({
      duration: 500, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);
  // Get translated department name
  const getTranslatedDepartmentName = () => {
    if (department?.translations && selectedLanguage?.lang_code) {
      const translation = department.translations.find(
        (trans) => trans.lang_code === selectedLanguage.lang_code
      );
      return translation?.name || department.name;
    }
    return department?.name || "";
  };

  return (
    <div
      data-aos={`${cardAnimation}`}
      data-aos-duration="1000"
      data-aos-delay="500"
      key={key}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
    >
      {/* Image with overlay effect */}
      <div className="relative aspect-[6/4] flex-1 overflow-hidden">
        <img
          src={image ? `${api}/${image}` : defaultDoctorImg}
          alt={`${name}`}
          className="w-full h-full object-fill transition-all duration-500 group-hover:scale-105"
        />

        {/* Color overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-color)] to-transparent opacity-0 group-hover:opacity-[0.6]  transition-opacity duration-300"></div>

        {/* Social buttons (shown on hover) */}
        <div className="absolute inset-0 flex items-center pb-4 justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/30">
          <p
            onClick={() => handleSingleService(slug)}
            className="text-2xl cursor-pointer text-secondary animate-pulse"
          >
            <IoArrowRedoSharp />
          </p>
        </div>
      </div>

      {/* Doctor info */}
      <div
        onClick={() => handleSingleService(slug)}
        className="bg-theme border-t-[1px] border-theme group-hover:border-theme p-4 text-center flex-none duration-500 cursor-pointer"
      >
        <MinTitle
          className="text-secondary font-bold text-lg"
          text={
            `${name} `.length > 40 ? `${name}`.slice(0, 40) + "..." : ` ${name}`
          }
        />
      </div>
      <MinTitle
        className="text-primary bg-theme bg-opacity-[0.3] p-4"
        text={
          shortDesc?.length > 200 ? shortDesc.slice(0, 200) + "..." : shortDesc
        }
      />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quaerat, molestiae cumque veniam architecto ratione odit vel! Facere atque iure temporibus id odio. Illum debitis nostrum eligendi, sequi odio libero.
    </div>
  );
};

export default CaseStudisCard;
