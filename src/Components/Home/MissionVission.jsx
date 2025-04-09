import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../../Layout/Container";
import { TbEyeCheck, TbTargetArrow } from "react-icons/tb";
import { FaHandHoldingMedical } from "react-icons/fa6";
import MinTitle from "../../Layout/Title/MinTitle";
import AOS from "aos";
import "aos/dist/aos.css";
const defaultData = [
  {
    key: "Mission",
    descKey: "Mission_Desc",
    title: "Mission",
    desc: "To create a sacred connection in healthcare, where every life is honored, every journey is guided with love, and every hope is nurtured.",
    icon: <TbTargetArrow />,
    bg: "#D74FA4",
  },
  {
    key: "Vision",
    descKey: "Vision_Desc",
    title: "Vision",
    desc: "To be a sanctuary or guiding light in healthcare, transforming lives with love, trust, and the promise of a healthier tomorrow. Creating a world where health is the foundation of a fulfilled life.",
    icon: <TbEyeCheck />,
    bg: "#8531DA",
  },
  {
    key: "Values",
    descKey: "Values_Desc",
    title: "Values",
    desc: "Elements in the subjects that have some purposes & goals for the business company.",
    icon: <FaHandHoldingMedical />,
    bg: "#B43B20",
  },
];

const MissionVission = ({ translations }) => {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
    useEffect(() => {
      AOS.init({
        duration: 1000, // animation duration in ms
        once: false, // allows animation every time section enters view
      });
    }, []);


  // Translation
  const getTranslatedText = (key, fallback) => {
    if (!translations || !selectedLanguage) return fallback;

    const items = translations[key];
    if (!items || !Array.isArray(items)) return fallback;

    const matched = items.find((item) => item.lang_code === selectedLanguage.lang_code);
    return matched?.value || fallback;
  };

  const localizedData = defaultData.map((item) => ({
    ...item,
    title: getTranslatedText(item.key, item.title),
    desc: getTranslatedText(item.descKey, item.desc),
  }));

  return (
    <div className="bg-theme bg-opacity-[0.3]">
      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-3 gap-4 md:gap-6">
          {localizedData.map((item, index) => (
            <div data-aos="zoom-in-up" key={index}>
              <div className="w-[160px] h-[160px] bg-[#E5E7EB] m-auto inline-block rounded-full flex items-center justify-center border-theme relative">
                <div>
                  <p className="flex justify-center text-6xl" style={{ color: item.bg }}>
                    {item.icon}
                  </p>
                  <p className="font-bold pt-1 text-2xl text-center" style={{ color: item.bg }}>
                    {item.title}
                  </p>
                </div>
                <div
                  className="absolute w-[180px] h-[90px] bottom-[-5%] left-[px] z-[-1]"
                  style={{
                    backgroundColor: item.bg,
                    borderBottomLeftRadius: "300px",
                    borderBottomRightRadius: "300px",
                  }}
                ></div>
              </div>
              <MinTitle className="pt-5 text-center text-primary" text={item.desc} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MissionVission;
