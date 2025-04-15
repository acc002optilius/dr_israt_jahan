import React, { useEffect } from "react";
import { api } from "../../Api/Api";
import defaultDoctorImg from "../../assets/Doctor/defaultDoctorImg.jpg";
import MinTitle from "../Title/MinTitle";
import { useSelector } from "react-redux";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoArrowRedoSharp } from "react-icons/io5";
import SecondaryButton from "../Button/SecondaryButton";
import { getTranslation } from "../../Utils/Translation/translationUtils";

const CaseStudisCard = ({
  title,
  image,
  cardAnimation,
  key,
  slug,
  shortDesc,
  department,
  translations
}) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const handleSingleService = (slug) => {
    console.log(slug);
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
    });
  }, []);

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
      className="group relative overflow-hidden  shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
    >
      <MinTitle
        className="absolute top-0 left-0 text-secondary py-2 !text-sm px-4 m-3 z-[2] bg-theme rounded-full opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto"
        text={
          getTranslatedDepartmentName()?.length > 20
            ? getTranslatedDepartmentName().slice(0, 30) + "..."
            : getTranslatedDepartmentName()
        }
      />
      {/* Image container */}
      <div className="relative aspect-[8/8] flex-1 overflow-hidden">
        <img
          src={image ? `${api}/${image}` : defaultDoctorImg}
          alt={`${title}`}
          className="w-full h-full object-fill transition-all duration-500 group-hover:scale-105"
        />

        {/* Initial title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-theme bg-opacity-[0.6] transition-all duration-300 group-hover:opacity-0">
          <MinTitle
            className="text-white font-medium text-lg"
            text={
              `${title} `.length > 120
                ? `${title}`.slice(0, 120) + "..."
                : ` ${title}`
            }
          />
        </div>
        {/* Color overlay that slides up on hover */}
        <div className="absolute inset-0 bg-theme bg-opacity-[0.6] opacity-0 group-hover:opacity-80 transition-all duration-500 origin-bottom transform scale-y-0 group-hover:scale-y-100"></div>
        {/* Depart Ment */}

        {/* Hover content that slides up */}
        <div className="absolute inset-0 flex flex-col items-start p-4 justify-end pb-8 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500">
          <MinTitle
            onClick={() => handleSingleService(slug)}
            className="text-white font-bold text-lg mb-2 hover:underline"
            text={
              `${title} `.length > 120
                ? `${title}`.slice(0, 120) + "..."
                : ` ${title}`
            }
          />
          <p
            onClick={() => handleSingleService(slug)}
            className="text-secondary flex items-center gap-2 cursor-pointer hover:underline transition-all hover:ml-4 duration-300"
          >
            {getTranslation(
              translations,
              selectedLanguage,
              "Read_More",
              "Read More"
            )}{" "}
            <IoArrowRedoSharp className="text-lg" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudisCard;
