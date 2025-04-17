import React, { useEffect, useState } from "react";
import SectionTitle from "../Layout/Title/SectionTitle";
import Container from "../Layout/Container";
import { useSelector } from "react-redux";
import MinTitle from "../Layout/Title/MinTitle";
import { api, caseStudiesApi } from "../Api/Api";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../Layout/Button/LoadingButton";
import axios from "axios";
import { blogsApi } from "../Api/Api";
import BlogCard from "../Layout/Card/BlogCard";
import { IoReloadSharp } from "react-icons/io5";
import CaseStudisCard from "../Layout/Card/CaseStudisCard";

const CaseStudies = () => {
  const [visibleItems, setVisibleItems] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [translations, setTranslations] = useState({});
  const [department, setDepartment] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(caseStudiesApi);
        console.log(response);

        setTranslations(response.data.data.translations || {});
        setData(response.data.data?.case_studies || []);

        // Extract unique categories from blogs
        const uniqueDepartment = [];
        response.data.data?.case_studies?.forEach((item) => {
          if (
            item.department &&
            !uniqueDepartment.some((cat) => cat.slug === item.department.slug)
          ) {
            uniqueDepartment.push(item.department);
          }
        });
        setDepartment(uniqueDepartment);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handlLoadMore = () => {
    setVisibleItems((prev) => prev + 12);
  };

  // Animation
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  // Get translated category name
  const getTranslatedCategoryName = (category) => {
    if (!category || !category.translations || !selectedLanguage) {
      return category?.name || "";
    }

    const translation = category.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );

    return translation?.name || category.name || "";
  };

  // Get translated content for blog items
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

    const translation = item.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );

    return {
      title: translation?.title || item.title,
      description: translation?.description || item.description,
    };
  };

  // Static translation
  const getTranslation = (key, defaultText) => {
    if (!translations || !selectedLanguage) return defaultText;

    const translationArray = translations[key];
    if (!translationArray) return defaultText;

    const translation = translationArray.find(
      (item) => item.lang_code === selectedLanguage?.lang_code
    );
    return translation ? translation.value : defaultText;
  };

  // Filter blogs by selected category
  const filteredCasestudy = selectedCategory
    ? data.filter((item) => item.department?.slug === selectedCategory)
    : data;

  return (
    <div className="">
      <Container>
        <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
          <div className="" data-aos="fade-in">
            <SectionTitle
              className="!text-center"
              text={getTranslation("Case_Study", "Case Study")}
            />
            <MinTitle
              className="!text-center w-full sm:w-[50%] text-primary m-auto py-2"
              text={getTranslation(
                "Case_Study_home_included_section_desc",
                "Case Studies That Inspire Confidence"
              )}
            />
          </div>

          {/* Category Filter */}
          <div className="flex justify-end pt-6">
            <select
              className="py-2 pr-[20px] pl-[8px] text-base rounded-md text-primary cursor-pointer border-[1px] border-borderColor focus:!border-theme focus:outline-none focus:ring-0 text-text-sm md:text-sm lg:text-base mt-1 lg:mt-2 inline-block"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setVisibleItems(12); // Reset visible items when changing category
              }}
            >
              <option value="">
                {getTranslation("Select_By_Department", "Select By Department")}
              </option>
              {department.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {getTranslatedCategoryName(item)}
                </option>
              ))}
            </select>
          </div>

          <div data-aos="fade-up" className="pt-4">
            <div className="">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {[...Array(visibleItems)].map((_, index) => (
                    <div
                      data-aos="zoom-out-up"

                      key={index}
                      className="border-[1px] aspect-[8/8] border-primary border-opacity-[0.2]  bg-skeletonLoading bg-opacity-[0.4] animate-pulse relative"
                    >
                      {/* <div className=" overflow-hidden rounded-lg bg-skeletonLoading animate-pulse max-h-[300px]">
                        <div className="w-full h-full bg-skeletonLoading animate-pulse rounded-t-lg" />
                      </div> */}
                      <div className="p-4 py-6 absolute bottom-0 left-0 w-full">
                        <div className="category w-[40%] h-2 bg-skeletonLoading animate-pulse rounded-lg"></div>
                        <div className="name w-[80%] h-3 mt-6 rounded-lg bg-skeletonLoading animate-pulse"></div>
                        <div className="name w-[40%] h-3 mt-2 rounded-lg bg-skeletonLoading animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {filteredCasestudy
                    ?.slice(0, visibleItems)
                    .map((item, index) => {
                      const content = getTranslatedContent(item);
                      // const department = getTranslatedCategoryName(item.category);

                      return (
                        <CaseStudisCard
                          title={content?.title}
                          slug={item?.slug}
                          shortDesc={content?.description}
                          socialNetworks={item?.social_networks}
                          image={item?.thumbnail}
                          department={item?.department}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {filteredCasestudy?.length > visibleItems && (
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

export default CaseStudies;
