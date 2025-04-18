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
import { useNavigate } from "react-router-dom";
const BlogCard = ({
  title,
  thumbnail,
  cardAnimation,
  slug,
  description,
  category,
  translations,
  displayDate,
}) => {
  const navigate = useNavigate()
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
    const temp = document.createElement("div");
    temp.innerHTML = sanitized;
    const textContent = temp.textContent || temp.innerText || "";

    // Truncate plain text (not HTML)
    return textContent.length > 120
      ? `${textContent.substring(0, 120)}...`
      : textContent;
  };

  const handleSingleBlog = (slug) => {
    navigate(`/blog/${slug}`)
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
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
      data-aos-delay="300"
      className="group relative   transition-all duration-300 h-full flex flex-col border-[1px] border-borderColor rounded-lg"
    >
      <MinTitle
        className=" absolute top-0 left-0 text-secondary py-1 md:py-2 !text-sm px-4 m-3 z-[2] bg-theme rounded-full transition-all duration-500 "
        text={
          getTranslatedDepartmentName()?.length > 20
            ? getTranslatedDepartmentName().slice(0, 30) + "..."
            : getTranslatedDepartmentName()
        }
      />
      {/* Image container */}
      <div className="relative aspect-[12/9] rounded-t-lg flex-1 overflow-hidden">
        <img
          src={thumbnail ? `${api}/${thumbnail}` : defaultDoctorImg}
          alt={`${title}`}
          className="w-full h-full object-fill transition-all duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-6">
        {/* Date */}
        <div className="date text-primary opacity-[0.7] flex items-center gap-2 text-sm py-1">
          <p className=" ">
            <SlCalender />
          </p>
          <p className=" ">{displayDate}</p>
        </div>
        {/* Title */}
        <MidTitle
          className="text-primary font-semibold text-lg my-2 line-clamp-2 cursor-pointer hover:text-theme duration-300"
          text={title}
          onClick={() => handleSingleBlog(slug)}
        />

        {/* desc */}
        <MinTitle
          className="text-left font-normal text-tertiary line-clamp-4 h-[70px] md:h-[100px]"
          text={getSanitizedDescription()}
        />
        <p
          onClick={() => handleSingleBlog(slug)}
          className="text-theme flex items-center  md:mt-2 lg:mt-4 gap-2 cursor-pointer hover:underline transition-all hover:ml-4 duration-500"
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
  );
};

export default BlogCard;
