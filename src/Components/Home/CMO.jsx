import React, { useEffect } from "react";
import Container from "../../Layout/Container";
import cmoImg from "../../assets/cmoImg.png";
import SectionTitle from "../../Layout/Title/SectionTitle";
import MinTitle from "../../Layout/Title/MinTitle";
import cmoSignature from "../../assets/cmoSignature.png";
import MidTitle from "../../Layout/Title/MidTitle";
import {
  FaArrowRightLong,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { TfiPinterest } from "react-icons/tfi";
import { BsThreads } from "react-icons/bs";
import { AiOutlineTikTok } from "react-icons/ai";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
const CMO = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);
  const SocialContactData = [
    {
      title: "Linkedin",
      icon: <FaLinkedinIn />,
      link: "https://bd.linkedin.com/company/optilius",
    },
    {
      title: "Facebook",
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/optilius",
    },
    {
      title: "Twitter",
      icon: <FaXTwitter />,
      link: "https://x.com/optiliusHQ",
    },

    {
      title: "Youtube",
      icon: <FaYoutube />,
      link: "https://www.youtube.com/@optilius",
    },
    {
      title: "Instagram",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/optilius/",
    },
    {
      title: "Pinterest",
      icon: <TfiPinterest />,
      link: "https://www.pinterest.com/optiliushq/",
    },
    {
      title: "Threads",
      icon: <BsThreads />,
      link: "https://www.threads.net/@optilius",
    },
  ];
  // const dynamicSocialContactData = SocialContactData.filter((item) => {
  //   const key = `${item.title.toLowerCase()}_url`; // Dynamically generate the key
  //   const apiLink = social_links?.[key]; // Safely access the link from API data
  //   return apiLink && apiLink.trim() !== ""; // Filter out items with null or empty links
  // }).map((item) => {
  //   const key = `${item.title.toLowerCase()}_url`;
  //   const apiLink = social_links?.[key];
  //   return {
  //     ...item,
  //     link: apiLink, // Use the link from API data
  //   };
  // });
  return (
    <div>
      <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg bg-secondary overflow-x-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12  items-center justify-between gap-12 md:gap-0">
            <div className="col-span-6">
              <div
                className="shadow-lg w-full md:w-[80%]"
                data-aos="fade-right" 
                
              >
                <img src={cmoImg} alt="" className="rounded-lg" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="" data-aos="fade-left" data-aos-delay="300">

              <SectionTitle
                className=" w-full lg:w-[70%]"
                text="Welcome to Our
               Healthcare"
                data-aos="fade-right"
              />
              <MinTitle
                className="py-4 text-primary"
                text={`"At our healthcare center, we prioritize patient well-being and deliver compassionate care. Our dedicated team of professionals is here to ensure the highest standards of medical excellence for you and your family."`}
              />
              </div>
              <div
                className="max-w-[200px] hover:scale-110 duration-500"
                data-aos="fade-left"
              >
                <img src={cmoSignature} alt="" />
              </div>
              <div className="" data-aos="fade-left">
                <MidTitle
                  className="text-theme font-bold"
                  text="Dr. Israt Jahan"
                />
                <MinTitle
                  className="text-primary py-2 opacity-[0.8] "
                  text="Chief Medical Officer"
                />
              </div>
              {SocialContactData?.length > 0 && (
                <div className="" data-aos="fade-left" data-aos-delay="300">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 lg:gap-2 mt-1  ">
                    {SocialContactData.map((item, index) => (
                      <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.link}
                        className="text-sm p-2 bg-theme hover:bg-tertiary  text-secondary hover:translate-y-[-10%] duration-300 rounded-md !cursor-pointer"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CMO;
