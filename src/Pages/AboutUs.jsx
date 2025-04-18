import React, { useEffect, useState } from "react";
import Container from "../Layout/Container";
import MissionVission from "../Components/Home/MissionVission";
import aboutStaticImage from "../assets/About-Us/about.jpg";
import SectionTitle from "../Layout/Title/SectionTitle";
import { getTranslation } from "../Utils/Translation/translationUtils";
import axios from "axios";
import { aboutUsApi } from "../Api/Api";
import { useSelector } from "react-redux";
import MinTitle from "../Layout/Title/MinTitle";
import MidTitle from "../Layout/Title/MidTitle";
import { FaUserMd, FaFlask, FaLaptopMedical } from "react-icons/fa";
import LoadingButton from "../Layout/Button/LoadingButton";
import { IoReloadSharp } from "react-icons/io5";
import DoctorCard from "../Layout/Card/DoctorCard";
import DirectorsCard from "../Layout/Card/DirectorsCard";
const defaultData = [
  {
    key: "Qualified_Team",
    descKey: "Qualified_Team_Desc",
    title: "Qualified Clinical Team",
    desc: "Our team of doctors are pioneers in their field, high standard of medical ethics, and are committed to patient well-being and safety.",
    icon: <FaUserMd />,
    bg: "#1D9BF0", // Custom color – you can change it as needed
  },
  {
    key: "Innovation_Focused",
    descKey: "Innovation_Focused_Desc",
    title: "Focused on Innovation",
    desc: "Our doctors are masters in innovation and procedures and have many research publications in international and national medical journals.",
    icon: <FaFlask />,
    bg: "#17C964", // Custom color
  },
  {
    key: "Latest_Technologies",
    descKey: "Latest_Technologies_Desc",
    title: "Use of Latest Technologies",
    desc: "Manipal Hospital has some of the most cutting-edge technology in the world. We are one of the few centers globally that has this much advanced medical equipment and technology.",
    icon: <FaLaptopMedical />,
    bg: "#F5A524", // Custom color
  },
];
const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [translations, setTranslations] = useState({});
  const [visibleItems, setVisibleItems] = useState(12);
  // Fetch About Page Api

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(aboutUsApi);
        console.log(response);

        setTranslations(response.data.data.translations || {});
        setData(response.data.data?.board_of_directors || []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  // Handle Load More
  const handlLoadMore = () => {
    setVisibleItems((prev) => prev + visibleItems);
  };
  // Translatioins
  // Translation
  const getTranslatedText = (key, fallback) => {
    if (!translations || !selectedLanguage) return fallback;

    const items = translations[key];
    if (!items || !Array.isArray(items)) return fallback;

    const matched = items.find(
      (item) => item.lang_code === selectedLanguage.lang_code
    );
    return matched?.value || fallback;
  };

  const localizedData = defaultData.map((item) => ({
    ...item,
    title: getTranslatedText(item.key, item.title),
    desc: getTranslatedText(item.descKey, item.desc),
  }));

  // Get translated content for blog items
  const getTranslatedContent = (item) => {
    if (
      !selectedLanguage ||
      !item.translations ||
      item.translations.length === 0
    ) {
      return {
        designation: item.designation,
      };
    }

    const translation = item.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );

    return {
      designation: translation?.designation || item.designation,
    };
  };
  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg overflow-x-hidden">
      <Container>
        <div className="grid grid-cols-2 gap-6 pb-sectionSm md:pb-sectionMd lg:pb-sectionLg xl:pb-sectionLg items-start">
          <div
            className="aspect-[4/3] mt-3"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <img
              src={aboutStaticImage}
              alt=""
              className="w-full h-full object-fill"
            />
          </div>
          <div
            className=""
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <SectionTitle
              text={getTranslation(
                translations,
                selectedLanguage,
                "About_Us",
                "About Us"
              )}
            />
            <MinTitle
              className={"py-2"}
              text={getTranslation(
                translations,
                selectedLanguage,
                "About_Us_Page_Section_Desc",
                "At our Health Care Centre, we are committed to providing comprehensive, compassionate, and patient-focused care for individuals and families."
              )}
            />
            <div className="grid gap-y-3 pt-4">
              {localizedData.map((item, index) => (
                <div
                  className="flex gap-4 items-start"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                  key={index}
                >
                  <p className="text-lga p-3 bg-theme text-secondary rounded-full">
                    {item.icon}
                  </p>
                  <div className="">
                    <MinTitle
                      className=" text-primary   font-bold"
                      text={item.title}
                    />

                    <MinTitle className=" text-primary " text={item.desc} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <MissionVission translations={translations} />

      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
          <div className="" data-aos="fade-in">
            <SectionTitle
              className="!text-center"
              text={getTranslation("Doctors", "Doctors")}
            />
            <MinTitle
              className="!text-center w-full sm:w-[50%] text-primary m-auto py-2"
              text={getTranslation(
                "Doctors_home_included_section_desc",
                "We have a team of experienced and qualified doctors who can provide you with the best possible care."
              )}
            />
          </div>
          <div className="">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(visibleItems)].map((_, index) => (
                  <div
                    data-aos="zoom-out-up"
                    key={index}
                    className="border-[1px] aspect-[4/5] rounded-lg border-primary border-opacity-[0.2]  bg-skeletonLoading bg-opacity-[0.4] animate-pulse relative"
                  >
                    {/* <div className=" overflow-hidden rounded-lg bg-skeletonLoading animate-pulse max-h-[300px]">
                        <div className="w-full h-full bg-skeletonLoading animate-pulse rounded-t-lg" />
                      </div> */}
                    <div className="p-4 py-6 absolute bottom-0 left-0 w-full">
                      <div className="name w-[80%] h-3 mt-6 rounded-lg bg-skeletonLoading animate-pulse m-auto"></div>
                      <div className="name w-[40%] h-3 mt-3 rounded-lg bg-skeletonLoading animate-pulse m-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                { data?.slice(0, visibleItems).map((item, index) => {
                  const content = getTranslatedContent(item);
                  console.log(content);

                  return (
                    <DirectorsCard
                      firstName={item?.first_name}
                      lastName={item?.last_name}
                      doctorId={item?.doctor_id}
                      designation={content.designation}
                      socialNetworks={item?.social_networks}
                      image={item?.image}
                      cardAnimation="none"
                    />
                  );
                })}
              </div>
            )}
          </div>
          {data?.length > visibleItems && (
            <div className="mt-4 text-center mx-auto">
              <div className="inline-block pt-4">
                <LoadingButton
                  className="inline-block"
                  loadingTime="1000"
                  text="View More"
                  icon={<IoReloadSharp />}
                  onClick={handlLoadMore}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
