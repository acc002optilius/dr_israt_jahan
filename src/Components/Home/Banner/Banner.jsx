// Banner.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { api } from "../../../Api/Api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import MinTitle from "../../../Layout/Title/MinTitle";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../Layout/Button/PrimaryButton";
import SecondaryButton from "../../../Layout/Button/SecondaryButton";
import { LuFileText } from "react-icons/lu";
import { MdOutlineFindReplace } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";


// Custom arrow components
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full cursor-pointer hover:bg-opacity-70 transition-all duration-300"
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full cursor-pointer hover:bg-opacity-70 transition-all duration-300"
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

const Banner = ({ bannerData , translations}) => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const { phone } = useSelector((state) =>
    (state.commonData?.siteCommonData)
  );
    const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  useEffect(() => {
    AOS.init({
      // duration: 1000, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true, // This enables infinite looping
    speed: 1000, // Transition speed between slides
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 5000, // Time each slide is shown (matches zoom duration)
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: "0", padding: "0" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor:
            currentSlide === i ? "var(--theme-color)" : "rgba(255,255,255,0.5)",
          border:
            currentSlide === i
              ? "2px solid #fff"
              : "2px solid rgba(255,255,255,0.5)",
          margin: "0 2px",
          transition: "all 0.3s ease",
          bottom: "-120px",
        }}
      ></div>
    ),
  };
  
  //   // Function to get translated content
  const getTranslatedContent = (sliderItem) => {
    if (!selectedLanguage || !sliderItem.translations) return sliderItem;
    
    const translation = sliderItem.translations.find(
      (trans) => trans.lang_code === selectedLanguage.lang_code
    );
    
    if (translation) {
      return {
        ...sliderItem,
        title: translation.title || sliderItem.title,
        subtitle: translation.subtitle || sliderItem.subtitle,
        description: translation.description || sliderItem.description,
        btn_text: translation.btn_text || sliderItem.btn_text
      };
    }
    
    return sliderItem;
  };


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
    <div className="w-full relative overflow-hidden group">
      <Slider {...settings}>
        {bannerData?.sliders?.map((item, index) => {
          const translatedItem = getTranslatedContent(item);
          return (
            <div key={index} className="  relative">
              {/* Image with zoom effect */}
              <div className="relative w-full  aspect-[7/3] overflow-hidden">
                <img
                  src={`${api}/${item.image}`}
                  alt={`Banner ${index + 1}`}
                  className={`w-full h-full object-fill transition-all duration-[5000ms] ease-in-out ${
                    currentSlide === index ? "scale-110" : "scale-100"
                  }`}
                  style={{
                    transition: "transform 5000ms ease-in-out",
                  }}
                />
<div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Optional text content */}
              <div className="absolute top-0 py-sectionLg left-1/2 transform -translate-x-1/2 text-white z-10 w-full">
                {translatedItem.subtitle && (
                  <MinTitle
                    className={`text-4xl text-center text-secondary font-bold mb-2 transition-all duration-500 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    text={translatedItem.subtitle}
                  />
                )}
                {translatedItem.title && (
                  <p
                    className={`text-6xl leading-[70px] font-bold m-auto py-4 w-[80%] text-center transition-all duration-500 delay-200 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    {translatedItem.title}
                  </p>
                )}
                {translatedItem.description && (
                  <MinTitle
                    className={`text-4xl w-[40%] m-auto text-center text-secondary font-medium mb-2 transition-all duration-500 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    text={translatedItem.description}
                  />
                )}
                <a href={`tel:${phone}`} className="hotline text-xl py-3 px-4 bg-transparent border-[1px] border-seconary w-[30%] block my-6  mx-auto text-center  ">
                  <span className="font-semibold"> {getTranslation(
                  "Hotline",
                  "Hotline"
                )} </span>: <span className="!text-medium">{phone}</span>
                </a>
                <div className="btnList grid grid-cols-2 gap-6 w-[50%]  m-auto">
                  <PrimaryButton  className="capitalize font-medium" text={getTranslation(
                  "Make_An_Appointment",
                  "Make An Appointment "
                )} icon={<LuFileText />}/>
                  <SecondaryButton className="capitalize font-medium" text={getTranslation(
                  "Find_A_Doctor",
                  "Find A Doctor"
                )}  icon={<RiUserSearchFill />}/>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Banner;
