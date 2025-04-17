import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { api, cmoInfoApi } from "../../Api/Api";
const CMO = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [translations, setTranslations] = useState({});
  const [socialLinks, setSocialLinks] = useState({});

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

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(cmoInfoApi);
        setTranslations(response.data.data.translations || {});
        setData(response.data.data || {});
        setSocialLinks(response.data?.data?.social_media || {});
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);
  const dynamicSocialContactData = SocialContactData.filter((item) => {
    const key = item.title.toLowerCase(); // Remove the "_url" suffix
    const apiLink = socialLinks?.[key]; // Access the link directly
    return apiLink && apiLink.trim() !== "";
  }).map((item) => {
    const key = item.title.toLowerCase();
    const apiLink = socialLinks?.[key];
    return {
      ...item,
      link: apiLink,
    };
  });

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
                <img
                  // src={data.image ? `${api}/${data?.image}` : cmoImg}
                  src={data.image ? `${api}/${data?.image}` : cmoImg}
                  alt=""
                  className="rounded-lg"
                />
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
                <img
                  src={
                    data.signature ? `${api}/${data?.signature}` : cmoSignature
                  }
                  alt=""
                />
              </div>
              <div className="" data-aos="fade-left">
                <MidTitle
                  className="text-theme font-bold"
                  text={`${data?.first_name} ${data?.last_name}`}
                />
                <MinTitle
                  className="text-primary py-2 opacity-[0.8] "
                  text={`${
                    data.designation
                      ? data?.designation
                      : "Chief Medical Officer"
                  }`}
                />
              </div>
              {dynamicSocialContactData?.length > 0 && (
                <div className="" data-aos="fade-left" data-aos-delay="300">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 lg:gap-2 mt-1  ">
                    {dynamicSocialContactData.map((item, index) => (
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
