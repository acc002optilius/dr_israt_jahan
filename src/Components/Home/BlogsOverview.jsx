import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "../../Layout/Title/SectionTitle";
import Container from "../../Layout/Container";
import { useSelector } from "react-redux";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import { api } from "../../Api/Api";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

// Import Swiper styles
import "swiper/css";
import DoctorCard from "../../Layout/Card/DoctorCard";
import PrimaryButton from "../../Layout/Button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../Layout/Button/LoadingButton";
import ServiceCard from "../../Layout/Card/ServiceCard";
import CaseStudisCard from "../../Layout/Card/CaseStudisCard";
import BlogCard from "../../Layout/Card/BlogCard";
import DOMPurify from "dompurify";
import htmlTruncate from "html-truncate";
const BlogsOverview = ({ translations, data }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const navigate = useNavigate();
  const viewAllBlogs = () => {
    console.log("ok");

    navigate("/blogs");
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
              className="!text-center w-full lg:w-[50%] text-primary m-auto py-2"
              text={getTranslation(
                "Latest_Blogs_home_included_section_desc",
                "Our commitment to excellence has earned us recognition as one of the nation's top healthcare providers."
              )}
            />
          </div>
          <div data-aos="fade-up" className="pt-6">
            <div className="">
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                slidesPerGroup={1}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={false} // 🔁 This makes the autoplay loop continuously
                modules={[Autoplay]}
                breakpoints={{
                  1: { slidesPerView: 1 },
                  406: { slidesPerView: 2 },
                  576: { slidesPerView: 3 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 3 },
                  1200: { slidesPerView: 3 },
                }}
                className="mySwiper"
              >
                {data?.slice(0, visibleItems).map((item, index) => {
                  const content = getTranslatedContent(item);
                  // console.log(content);

                  return (
                    <SwiperSlide key={index}>
                      <BlogCard
                        title={content?.title}
                        slug={item?.slug}
                        description={content?.description}
                        socialNetworks={item?.social_networks}
                        thumbnail={item?.thumbnail}
                        category={item?.category}
                        cardAnimation="zoom-in"
                        displayDate={item.display_date}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          {data?.length > visibleItems && (
            <div className="mt-4 text-center mx-auto">
              <div className="inline-block pt-4">
                <LoadingButton
                  className="inline-block"
                  loadingTime="1000"
                  text="View All Blogs"
                  onClick={viewAllBlogs}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BlogsOverview;
