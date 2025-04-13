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
import { SlCalender } from "react-icons/sl";
import MidTitle from "../Title/MidTitle";
import { MdDescription } from "react-icons/md";
import DOMPurify from "dompurify";
import htmlTruncate from "html-truncate";
const BlogCard = ({
  title,
  thumbnail,
  cardAnimation,
  key,
  slug,
  description,
  category,
  translations,
  displayDate,
}) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

//   Description 
 // Sanitize and truncate description
 const getSanitizedDescription = () => {
    if (!description) return "";
    
    // Sanitize the HTML
    const sanitized = DOMPurify.sanitize(description);
    
    // Create a temporary element to get text content
    const temp = document.createElement('div');
    temp.innerHTML = sanitized;
    const textContent = temp.textContent || temp.innerText || '';
    
    // Truncate plain text (not HTML)
    return textContent.length > 150 
      ? `${textContent.substring(0, 150)}...` 
      : textContent;
  };

console.log(description);

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
    if (category?.translations && selectedLanguage?.lang_code) {
      const translation = category.translations.find(
        (trans) => trans.lang_code === selectedLanguage.lang_code
      );
      return translation?.name || category.name;
    }
    return category?.name || "";
  };

  return (
    <div
      data-aos={`${cardAnimation}`}
      data-aos-duration="1000"
      data-aos-delay="500"
      key={key}
      className="group relative   shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border-[1px] border-borderColor rounded-lg"
    >
      <MinTitle
        className=" absolute top-0 left-0 text-secondary py-2 !text-sm px-4 m-3 z-[2] bg-theme rounded-full transition-all duration-500 "
        text={
          getTranslatedDepartmentName()?.length > 20
            ? getTranslatedDepartmentName().slice(0, 30) + "..."
            : getTranslatedDepartmentName()
        }
      />
      {/* Image container */}
      <div className="relative aspect-[6/4] rounded-t-lg flex-1 overflow-hidden">
        <img
          src={thumbnail ? `${api}/${thumbnail}` : defaultDoctorImg}
          alt={`${title}`}
          className="w-full h-full object-fill transition-all duration-500 group-hover:scale-105"
        />

        {/* Initial title at bottom */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-theme bg-opacity-[0.6] transition-all duration-300 group-hover:opacity-0"> */}

        {/* </div> */}
        {/* Color overlay that slides up on hover */}
        {/* <div className="absolute inset-0 bg-theme bg-opacity-[0.6] opacity-0 group-hover:opacity-80 transition-all duration-500 origin-bottom transform scale-y-0 group-hover:scale-y-100"></div> */}
        {/* Depart Ment */}

        {/* Hover content that slides up */}
        {/* <div className="absolute inset-0 flex flex-col items-start p-4 justify-end pb-8 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500">
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
        </div> */}
      </div>
      <div className="px-4 py-6">
        {/* Date */}
        <div className="date flex items-center gap-2 ">
          <p className="text-xs text-tertiary">
            <SlCalender />
          </p>
          <p className="text-xs text-primary text-tertiary">{displayDate}</p>
        </div>
        {/* Title */}
        <MidTitle
          className="text-primary font-semibold text-lg py-2"
          text={
            `${title} `.length > 120
              ? `${title}`.slice(0, 120) + "..."
              : ` ${title}`
          }
        />
        {/* Title */}
        <MinTitle
          className="text-left font-normal text-tertiary "
          text={getSanitizedDescription()}
        />
      </div>
    </div>
  );
};

export default BlogCard;
