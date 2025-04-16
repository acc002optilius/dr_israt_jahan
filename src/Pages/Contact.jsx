import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../Layout/Container";
import { TbEyeCheck, TbMailFilled, TbTargetArrow } from "react-icons/tb";
import {
  FaHandHoldingMedical,
  FaMapLocationDot,
  FaPhone,
  FaPhoneFlip,
} from "react-icons/fa6";
import MinTitle from "../Layout/Title/MinTitle";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionTitle from "../Layout/Title/SectionTitle";
import { contactPageApi } from "../Api/Api";
import axios from "axios";
import { getTranslation } from "../Utils/Translation/translationUtils";
import ContactForm from "../Components/Form/ContactForm";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import {
  MdAccessTime,
  MdOutlineMail,
  MdOutlinePhoneInTalk,
  MdPhoneEnabled,
} from "react-icons/md";
import { TfiPinterest } from "react-icons/tfi";
import { BsThreads } from "react-icons/bs";
import { AiOutlinePinterest, AiOutlineTikTok } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { LuTimerOff } from "react-icons/lu";
import { IoMdLocate } from "react-icons/io";
import LocationMap from "../Components/Contact/LocationMap";
const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [translations, setTranslatios] = useState({});
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const contactData = useSelector((state) => state.commonData?.siteCommonData);
  const {
    site_footer_logo,
    short_bio,
    phone,
    social_links,
    payment_methods,
    app_links,
    developed_by,
    developed_by_url,
    address,
    map_location,
    email,
    closed_on,

    opening_hours,
  } = contactData;

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
    {
      title: "Tiktok",
      icon: <AiOutlineTikTok />,
      link: "https://www.tiktok.com/@optilius",
    },
  ];
  const dynamicSocialContactData = SocialContactData.filter((item) => {
    const key = `${item.title.toLowerCase()}_url`; // Dynamically generate the key
    const apiLink = social_links?.[key]; // Safely access the link from API data
    return apiLink && apiLink.trim() !== ""; // Filter out items with null or empty links
  }).map((item) => {
    const key = `${item.title.toLowerCase()}_url`;
    const apiLink = social_links?.[key];
    return {
      ...item,
      link: apiLink, // Use the link from API data
    };
  });
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // allows animation every time section enters view
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch all data in parallel
        const response = await axios.get(contactPageApi);
        setTranslatios(response.data.data.translations);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
        <Container>
          <SectionTitle
            text={getTranslation(
              translations,
              selectedLanguage,
              "Contact_Us",
              "Contact Us"
            )}
            className="text-center !text-primary"
          />
          <div className=" grid grid-cols-1 gap-8 sm:gap-12 md:gap-24 md:grid-cols-12 pt-4">
            <div className="md:col-span-7">
              <ContactForm translations={translations}/>
            </div>
            <div className="md:col-span-5">
              <ul className="mt-2 md:mt-5 ">
                {/* Address */}
                <li className="pb-3 md:pb-6">
                  <a
                    href={`${map_location}`}
                    target="_blank"
                    className="relative group"
                  >
                    <div className="flex gap-4 items-center relative inline-block">
                      <span className="text-theme text-2xl">
                        <IoMdLocate />
                      </span>
                      <MinTitle
                        className="text-primary text-md duration-300 inline-block group-hover:text-theme font-normal"
                        text={address}
                      />
                    </div>
                  </a>
                </li>
                {/* Email */}
                <li className="pb-3 md:pb-6">
                  <a
                    href={`mailto:${email}`}
                    target="_blank"
                    className="relative group"
                  >
                    <div className="flex gap-4 items-center relative inline-block">
                      <span className="text-theme text-2xl">
                        <TbMailFilled />
                      </span>
                      <MinTitle
                        className="text-primary text-md duration-300 inline-block group-hover:text-theme font-normal"
                        text={email}
                      />
                    </div>
                  </a>
                </li>
                {/* Phone */}
                <li className="pb-3 md:pb-6">
                  <a
                    href={`tel:${phone}`}
                    target="_blank"
                    className="relative group"
                  >
                    <div className="flex gap-4 items-center relative inline-block">
                      <span className="text-theme text-2xl">
                        <MdPhoneEnabled />
                      </span>
                      <MinTitle
                        className="text-primary text-md duration-300 inline-block group-hover:text-theme font-normal"
                        text={phone}
                      />
                    </div>
                  </a>
                </li>
              </ul>

              {/* Social Data */}
              {dynamicSocialContactData?.length > 0 && (
                <div className="">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2 md:gap-3 lg:gap-2  ">
                    {dynamicSocialContactData.map((item, index) => (
                      <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.link}
                        className="text-sm md:text-sm lg:text-base p-2 md:p-2 lg:p-[10px] bg-transparent hover:bg-theme  text-theme hover:text-secondary border-[1px] border-theme hover:translate-y-[-10%] duration-300 rounded-full !cursor-pointer"
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
        <div className="">
          <LocationMap map={map_location} />
        </div>
    </>
  );
};

export default Contact;

