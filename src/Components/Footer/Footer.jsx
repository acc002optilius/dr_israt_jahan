import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import MidTitle from "../../Layout/Title/MidTitle";
import {
  FaArrowRightLong,
  FaInstagram,
  FaLocationDot,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IoIosCall, IoMdMail } from "react-icons/io";
import {
  MdAccessTime,
  MdAddCall,
  MdKeyboardDoubleArrowRight,
  MdOutlineMail,
  MdOutlinePhoneInTalk,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaTwitter,
} from "react-icons/fa";
import MinTitle from "../../Layout/Title/MinTitle";
import { AiOutlinePinterest, AiOutlineTikTok } from "react-icons/ai";
import { ImPinterest } from "react-icons/im";
import { PiThreadsLogoFill } from "react-icons/pi";
import { TfiPinterest } from "react-icons/tfi";
import { BsThreads } from "react-icons/bs";
import Container from "../../Layout/Container";
import ExtraMidTitle from "../../Layout/Title/ExtraMidTitle";
import downloadPlaystore from "../../assets/Footer/downloadPlaystore.png";
import downloadAppstore from "../../assets/Footer/downloadAppstore.png";
import { useSelector } from "react-redux";
import { api, siteVisitorsApi } from "../../Api/Api";
import Swal from "sweetalert2";
import { FiMapPin } from "react-icons/fi";
import { LuTimerOff } from "react-icons/lu";
import axios from "axios";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import "sweetalert2/src/sweetalert2.scss";

export const contactData = [
  {
    sub: "Location",
    title: "#01, Road-09, Block-B, Bosila, Dhaka , Bangladesh",
    icon: <FaLocationDot />,
    link: "https://www.google.com/maps/search/23.741658,+90.350006?coh=219680&utm_campaign=tt-rcs&entry=tts&g_ep=EgoyMDI0MTExMi4wIPu8ASoASAFQAw%3D%3D",
  },
  {
    sub: "Mail",
    title: "hello@optilius.com",
    icon: <IoMdMail />,
    link: "mailto:demo@domain.com",
    // <a rel="noopener noreferrer" href="mailto:demo@domain.com" target="_blank"><p class="text-xs md:text-md lg:text-base text-primary text-theme">hello@optilius.com</p></a>
  },
  {
    sub: "Number",
    title: "+8801963965350",
    icon: <MdAddCall />,
    link: "tel:+8801963965350",
  },
];
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
export const infomationLink = [
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "About Us",
    link: "about-us",
  },

  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    name: "Term Condition",
    link: "/term-condition",
  },
];

export const quickLink = [
  // {
  //   name: "Store Location",
  //   link: "/services/webDesigAndDev",
  // },
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Doctors",
    link: "/doctors",
  },
  {
    name: "FAQ",
    link: "/faqs",
  },
  {
    name: "Privacy Policy",
    link: "/privacy-Policy",
  },
  {
    name: "Term & condition",
    link: "/term-condition",
  },
];

// export const paymentMethod = [
//   {
//     image: bkash,
//   },
//   {
//     image: dutch,
//   },
//   {
//     image: mastercard,
//   },
//   {
//     image: nogod,
//   },
//   {
//     image: pp,
//   },
//   {
//     image: stripe,
//   },
//   {
//     image: visa,
//   },
// ];

const Footer = () => {
  const [siteVisitors, setSiteVisitors] = useState([]);
  const footerData = useSelector((state) => state.commonData?.siteCommonData);
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
  } = footerData;
  // siteVisitorsApi
  // Site Visitor Api Feched Here
  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all data in parallel
        const response = await axios.get(siteVisitorsApi);
        setSiteVisitors(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    };
    fetchAllData();
  }, [siteVisitors]);

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


  const handleAppLinkClick = (link) => {
    if (!link) {
      Swal.fire({
        title: "Link Not Available",
        text: "The app link is currently unavailable. Please check back later.",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "Close",
        showConfirmButton: false, // This removes the "OK" button
      });
    } else {
      window.open(link, "_blank");
    }
  };

  // Translation For Menu
  const { footer_translations } = useSelector(
    (state) => state.commonData?.siteCommonData
  );
  const selectedLanguage = useSelector(
    (state) => state.language?.selectedLanguage?.lang_code
  ); // e.g. "bn", "en"
  const getTranslatedValue = (translations, key, fallback) => {
    const matches = translations?.[key];
    if (!matches) return fallback;

    const translation = matches.find(
      (item) => item.lang_code === selectedLanguage
    );
    return translation?.value || fallback;
  };
  const translatedInfoLinks = infomationLink.map((item) => ({
    ...item,
    name: getTranslatedValue(
      footer_translations?.page,
      item.name.replace(/ /g, "_"),
      item.name
    ),
  }));

  const translatedQuickLinks = quickLink.map((item) => ({
    ...item,
    name: getTranslatedValue(
      footer_translations?.quick_links,
      item.name.replace(/ /g, "_"),
      item.name
    ),
  }));

  // For Static Translate
  // Page Translation
  const otherStaticTranslationData = useSelector(
    (state) => state.commonData?.siteCommonData?.footer_translations?.other
  );

  // Function to get translated text
  const getTranslation = (key, defaultText) => {
    if (!otherStaticTranslationData || !selectedLanguage) return defaultText;

    const translationArray = otherStaticTranslationData[key];
    if (!translationArray) return defaultText;

    const translation = translationArray.find(
      (item) => item.lang_code === selectedLanguage
    );
    return translation ? translation.value : defaultText;
  };

  return (
    <>
      <div className="  bg-theme !z-[6] relative">
        <Container>
          <div className="py-12 grid justify-between grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-6">
            <div className="col-span-1 ">
              <NavLink to="/" className="logo flex gap-x-2 items-center">
                <img
                  src={
                    site_footer_logo ? `${api}/${site_footer_logo}` : `${logo}`
                  }
                  alt=""
                  className="w-[100px] md:w-[120px] lg:w-[180px] rounded-lg px-2 py-1 bg-secondary"
                />
              </NavLink>
              {/* Footer_Short_Bio */}
              <MinTitle
                className="text-secondary pt-5"
                text={
                  short_bio
                    ? `${short_bio}`
                    : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nemo quae laborum. Totam, consequuntur assumenda."
                }
              />
              {dynamicSocialContactData?.length > 0 && (
                <div className="">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 lg:gap-2 mt-3 sm:mt-2 lg:mt-4 ">
                    {dynamicSocialContactData.map((item, index) => (
                      <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.link}
                        className="text-sm md:text-sm lg:text-sm p-1 md:p-1 lg:p-2 bg-secondary hover:bg-transparent  text-theme hover:text-secondary border-[1px] border-secondary hover:translate-y-[-10%] duration-300 rounded-full !cursor-pointer"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {/* <MidTitle
                className="text-secondary"
                text={getTranslation(
                  "Got_Quistion",
                  "Got Question? Call us 24/7"
                )}
              /> */}
            </div>
            <div className="col-span-3">
              <div className=" grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-6 md:gap-8  lg:gap-6">
                {/* Quick Links */}
                <div className="lg:col-span-3">
                  <ExtraMidTitle
                    text={getTranslation("Quick_Links", "Quick Links")}
                    className="inline-block  !text-secondary font-bold"
                  />
                  <ul className="mt-2 md:mt-5 ">
                    {translatedQuickLinks.map((item, index) => (
                      <li key={index} className="pb-0 md:pb-2">
                        <NavLink
                          to={item.link}
                          className="relative group inline-block"
                        >
                          <div className="flex gap-2 items-center relative inline-block">
                            <span>
                              <MdKeyboardDoubleArrowRight className="text-secondary text-md" />
                            </span>
                            <MinTitle
                              className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                              text={item.name}
                            />
                          </div>
                          {/* After pseudo-element equivalent */}
                          <span className="absolute left-0 top-full h-[1px] w-0 bg-white duration-300 group-hover:w-full"></span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Contact Information */}
                <div className="lg:col-span-4">
                  <ExtraMidTitle
                    text={getTranslation(
                      "Contact_Information",
                      "Contact Information"
                    )}
                    className="inline-block  !text-secondary font-bold"
                  />
                  <ul className="mt-2 md:mt-5 ">
                    {/* Address */}
                    <li className="pb-1 md:pb-3">
                      <a
                        href={`${map_location}`}
                        target="_blank"
                        className="relative group"
                      >
                        <div className="flex gap-2 items-center relative inline-block">
                          <span className="text-secondary text-lg">
                            <FiMapPin />
                          </span>
                          <MinTitle
                            className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                            text={address}
                          />
                        </div>
                      </a>
                    </li>
                    {/* Phone */}
                    <li className="pb-1 md:pb-3">
                      <a
                        href={`tel:${phone}`}
                        target="_blank"
                        className="relative group"
                      >
                        <div className="flex gap-2 items-center relative inline-block">
                          <span className="text-secondary text-lg">
                            <MdOutlinePhoneInTalk />
                          </span>
                          <MinTitle
                            className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                            text={phone}
                          />
                        </div>
                      </a>
                    </li>
                    {/* Email */}
                    <li className="pb-1 md:pb-3">
                      <a
                        href={`mailto:${email}`}
                        target="_blank"
                        className="relative group"
                      >
                        <div className="flex gap-2 items-center relative inline-block">
                          <span className="text-secondary text-lg">
                            <MdOutlineMail />
                          </span>
                          <MinTitle
                            className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                            text={email}
                          />
                        </div>
                      </a>
                    </li>
                    {/* Open Time */}
                    <li className="pb-1 md:pb-3">
                      <div className="flex gap-2 items-center relative inline-block">
                        <span className="text-secondary text-lg">
                          <MdAccessTime />
                        </span>
                        {opening_hours && (
                          <MinTitle
                            className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                            text={opening_hours}
                          />
                        )}
                      </div>
                    </li>
                    {/* Close Time */}
                    <li className="pb-1 md:pb-3">
                      <div className="flex gap-2 items-center relative inline-block">
                        <span className="text-secondary text-lg">
                          <LuTimerOff />
                        </span>
                        {closed_on?.length > 0 && (
                          <MinTitle
                            className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                            text={closed_on.join(" - ")}
                          />
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Visit Count  */}
                <div className="lg:col-span-3">
                  <ExtraMidTitle
                    text={getTranslation("Visitor_Count", "Visitor Count")}
                    className="inline-block  !text-secondary font-bold"
                  />
                  <ul className="mt-2 md:mt-5 ">
                    {/* Total Visitor */}
                    <li className="pb-1 md:pb-3">
                      <MinTitle
                        className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                        text={`Today's Visitor : ${siteVisitors?.today} `}
                      />
                    </li>
                    <li className="pb-1 md:pb-3">
                      <MinTitle
                        className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                        text={`Total Visitor : ${siteVisitors?.total}`}
                      />
                    </li>
                    <li className="pb-1 md:pb-3">
                      <MinTitle
                        className="text-secondary text-md duration-300 inline-block group-hover:text-secondary font-normal"
                        text={`Unique Visitor  : ${siteVisitors?.unique}`}
                      />
                    </li>

                  </ul>
                </div>
                {/* Download App */}
                <div className="lg:col-span-2 ">
                  <ExtraMidTitle
                    text={getTranslation("Download_App", "Download app")}
                    className="inline-block  !text-secondary font-bold"
                  />
                  <div className="grid grid-cols-1 gap-3 pt-4">
                    <a
                      onClick={() =>
                        handleAppLinkClick(app_links?.google_play_store)
                      }
                    >
                      <div className="playStore !cursor-pointer aspect-[12/4] h-[30px] md:h-[50px]">
                        <img
                          className=" object-fill align-middle rounded-md overflow-hidden"
                          src={downloadPlaystore}
                          alt="Download on Google Play"
                        />
                      </div>
                    </a>
                    <a
                      onClick={() => handleAppLinkClick(app_links?.apple_store)}
                    >
                      <div className="playStore !cursor-pointer aspect-[12/4] h-[30px] md:h-[50px] ">
                        <img
                          className=" object-fill align-middle rounded-md overflow-hidden"
                          src={downloadAppstore}
                          alt="Download on the App Store"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* payment Method */}
          {/* <div className="flex justify-center items-center gap-2 mt-12">
            {payment_methods?.map((item, index) => {
              const image = `${api}/${item.icon}`;
              return (
                <div
                  key={index}
                  className="aspect-[6/4] max-h-[20px] rounded-sm overflow-hidden"
                >
                  <img className="w-full h-full" src={image} alt={item.name} />
                </div>
              );
            })}
          </div> */}
          {/* Bottom Footer */}
          <div className=" pt-5 bg-theme border-t-[1px] border-tertiary pb-[20px] md:pb-[75px] lg:pb-5 ">
            <Container>
              <p className="text-xs sm:text-xm md:text-sm  font-medium text-center text-secondary">
                © 2024{" "}
                <a
                  className="font-bold"
                  target="_blank"
                  href={
                    developed_by_url
                      ? `${developed_by_url}`
                      : "https://optilius.com/"
                  }
                >
                  {developed_by ? developed_by : "Optilius Digital"} .
                </a>{" "}
                All rights reserved.
              </p>
            </Container>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
