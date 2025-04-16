import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "../Layout/Title/SectionTitle";
import Container from "../Layout/Container";
import { useSelector } from "react-redux";
import MinTitle from "../Layout/Title/MinTitle";
import MidTitle from "../Layout/Title/MidTitle";
import { api } from "../Api/Api";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

// Import Swiper styles
import "swiper/css";
import DoctorCard from "../Layout/Card/DoctorCard";
import PrimaryButton from "../Layout/Button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../Layout/Button/LoadingButton";
import ServiceCard from "../Layout/Card/ServiceCard";
import CaseStudisCard from "../Layout/Card/CaseStudisCard";
import DOMPurify from "dompurify";
import htmlTruncate from "html-truncate";
import axios from "axios";
import { blogsApi } from "../Api/Api";
import BlogCard from "../Layout/Card/BlogCard";
import { IoReloadSharp } from "react-icons/io5";
const Blog = () => {
  const [visibleItems, setVisibleItems] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [translations, setTranslations] = useState({});
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        // Fetch all data in parallel
        const response = await axios.get(blogsApi);
        console.log(response);

        setTranslations(response.data.data.translations || {});
        setData(response.data.data?.blogs || []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();

    return () => {
      setIsLoading(false);
    };
  }, []);

  const navigate = useNavigate();
  const handlLoadMore = () => {
    setVisibleItems((prev) => prev + visibleItems);
  };

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  // Animation
  useEffect(() => {
    AOS.init({
      once: false, // allows animation every time section enters view
    });
  }, []);
  //   Go Single DepartMent Page
  const handleGoSingleDepartMentPage = (slug) => {
    console.log(slug);
  };

  // Api Data Translation
  // Get translated content for department items
  const getTranslatedContent = (item) => {
    if (
      !selectedLanguage ||
      !item.translations ||
      item.translations.length === 0
    ) {
      return {
        title: item.title,
        description: item.description,
      };
    }

    // Find matching translation for current language
    const translation = item.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );

    return {
      title: translation?.title || item.title,
      description: translation?.description || item.description,
    };
  };

  //Static Translate
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
    <div className="">
      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
          <div className="" data-aos="fade-up">
            <SectionTitle
              className="!text-center"
              text={getTranslation("Latest_Blogs", "Latest Blogs")}
            />
            <MinTitle
              className="!text-center w-full sm:w-[50%] text-primary m-auto py-2"
              text={getTranslation(
                "Blog_Page_Latest_Blogs_included_section_desc",
                "Our commitment to excellence has earned us recognition as one of the nation's top healthcare providers."
              )}
            />
          </div>
          <div data-aos="fade-up" className="pt-6">
            <div className="">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {[...Array(visibleItems)].map((_, index) => (
                    <div
                      key={index}
                      className="border-[1px] border-primary border-opacity-[0.2] rounded-lg"
                    >
                      <div className="aspect-[12/9] overflow-hodden rounded-lg bg-skeletonLoading animate-pulse max-h-[300px]">
                        <img className="w-full h-full object-fit vertical-middle group-hover/outer:scale-125 group-hover/outer:translate-x-0 group-hover/outer:translate-y-0 transition-transform duration-500 ease-in-out transform origin-center bg-skeletonLoading animate-pulse rounded-t-lg" />
                      </div>

                      <div className="p-4 py-6">
                        <div className="category w-[40%]  h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
                        <div className="name w-[80%] h-3 mt-6 rounded-lg bg-skeletonLoading animate-pulse"></div>
                        <div className="name w-[40%] h-3 mt-2 rounded-lg bg-skeletonLoading animate-pulse"></div>
                        <div className="description">
                          <div className="category w-full mt-6 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
                          <div className="category w-[50%] mt-2 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
                          <div className="category w-ful mt-2 h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {data?.slice(0, visibleItems).map((item, index) => {
                    const content = getTranslatedContent(item);
                    return (
                      <BlogCard
                        key={index}
                        title={content?.title}
                        slug={item?.slug}
                        description={content?.description}
                        socialNetworks={item?.social_networks}
                        thumbnail={item?.thumbnail}
                        category={item?.category}
                        cardAnimation="zoom-in"
                        displayDate={item.display_date}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {data?.length > visibleItems && (
            <div className="mt-4 text-center mx-auto">
              <div className="inline-block pt-4">
                <LoadingButton
                  className="inline-block"
                  loadingTime="1000"
                  text="Load More"
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

export default Blog;
