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
const TestimonialCard = ({
  name,
  firstName,
  lastName,
  image,
  shortDesc,
  designation,
  cardAnimation,
  key,
  slug,
}) => {
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
      className="group relative  rounded-xl   transition-all duration-300 h-full flex flex-col bg-secondary  gap-4 px-4 py-6 md:px-8 md:py-12 overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-2 items-start">
        {/* Image with overlay effect */}
        <div className="col-span-2">
          <div className="relative aspect-[4/4] max-h-[80px] flex-1 rounded-full overflow-hidden border-[4px] border-secondary shadow-lg">
            <img
              src={image ? `${api}/${image}` : defaultDoctorImg}
              alt={`${name}`}
              className="w-full h-full lign-middle object-fill transition-all duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="col-span-10 pl-4">
          <MinTitle
            className="text-primary font-medium h-[120px] overflow-hidden"
            text={`"${
              shortDesc?.length > 200
                ? shortDesc.slice(0, 200) + "..."
                : shortDesc
            }"`}
          />
          <MinTitle
            className="text-theme font-bold text-lg pt-2 md:pt-4"
            text={`${firstName} ${lastName}`}
          />
          <MinTitle
            className="text-primary pt-1 opacity-[0.7]"
            text={`${
              designation?.length > 60
                ? designation.slice(0, 60) + "..."
                : designation
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
