import React, { useRef, useState, useEffect } from "react";
import MidTitle from "../Layout/Title/MidTitle";
import { MdKeyboardArrowDown } from "react-icons/md";
import ExtraMidTitle from "../Layout/Title/ExtraMidTitle";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import axios from "axios";
import MinTitle from "../Layout/Title/MinTitle";
import { faqDataApi } from "../Api/Api";
import Container from "../Layout/Container";
import ExtraMinTitle from "../Layout/Title/ExtraMinTitle";
import { useSelector } from "react-redux";

const Faq = () => {
  const [loading, setLoading] = useState(true);
  const [faqOpen, setFaqOpen] = useState({});
  const [faqData, setFaqData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const contentRefs = useRef({});
  const categoryRefs = useRef({});
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(faqDataApi, {});
        console.log(response);

        setFaqData(response.data.data.faqs);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const initialFaqState = {};
    faqData.forEach((category) => {
      initialFaqState[category.category] = null; // No FAQs open initially
    });
    setFaqOpen(initialFaqState);
    if (faqData.length > 0) {
      setActiveCategory(faqData[0].category);
    }
  }, [faqData]);

  const handleFaq = (category, index) => {
    const faqKey = `${category}-${index}`;
    setFaqOpen((prevState) => ({
      ...prevState,
      [category]: prevState[category] === faqKey ? null : faqKey,
    }));
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const element = categoryRefs.current[category];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const getTranslatedCategory = (category) => {
    if (!category || typeof category !== "object") return "";
    if (!selectedLanguage || !category.translations)
      return category.category || "";

    const translation = category.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );

    return translation?.name || category.category || "";
  };

  const getTranslatedFAQ = (faqItem) => {
    if (!faqItem) return { question: "", answer: "" };
    if (!selectedLanguage || !faqItem.faq_translations)
      return {
        question: faqItem.question,
        answer: faqItem.answer,
      };
    const translation = faqItem.faq_translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );
    return {
      question: translation?.question || faqItem.question,
      answer: translation?.answer || faqItem.answer,
    };
  };

  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg bg-secondary">
      <Container>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 ">
            <div className="md:col-span-3 bg-skeletonLoading animate-pulse h-screen rounded-lg"></div>
            <div className="md:col-span-9 bg-skeletonLoading animate-pulse h-screen rounded-lg"></div>
          </div>
        ) : (
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Sidebar: Categories */}
              <div className="md:col-span-3 z-[4] sticky top-[55px] md:top-[80px] lg:top-[100px] left-0 bg-secondary">
                <div
                  style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}
                  className="px-5 py-2 rounded-lg border-opacity-[0.3]"
                >
                  {faqData.map((item, index) => (
                    <div
                      key={item.id} // Use a unique key
                      onClick={() => handleCategoryClick(item.category)}
                      className={`cursor-pointer ${
                        index !== faqData.length - 1
                          ? "border-b-[1px] border-tertiary border-opacity-[0.3]"
                          : ""
                      }`}
                    >
                      <MinTitle
                        className={`text-primary font-semibold py-2 md:py-2 lg:py-6 ${
                          activeCategory === item.category
                            ? "font-bold text-primary"
                            : "text-opacity-[0.4]"
                        }`}
                        text={getTranslatedCategory(item)} // Ensure this returns a string
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content: FAQ List */}
              <div
                style={{ boxShadow: "0px 0px 5px 0px rgba(0 0 0 / 10%)" }}
                className="md:col-span-9 sticky top-0 p-6 rounded-lg"
              >
                <div className="question">
                  {faqData.map((categoryItem) => (
                    <div
                      key={categoryItem.category}
                      ref={(el) =>
                        (categoryRefs.current[categoryItem.category] = el)
                      }
                      className="mb-6"
                    >
                      <MinTitle
                        text={getTranslatedCategory(categoryItem)}
                        className="text-primary !uppercase font-medium text-opacity-[0.8] pb-4"
                      />

                      {categoryItem.content.map((faqItem, index) => {
                        const faqKey = `${categoryItem.category}-${index}`;
                        const translatedFAQ = getTranslatedFAQ(faqItem);
                        return (
                          <div
                            key={faqKey}
                            onClick={() =>
                              handleFaq(categoryItem.category, index)
                            }
                            className="bg-theme bg-opacity-[0.0] py-2 lg:py-4 cursor-pointer border-b-[1px] border-tertiary border-opacity-[0.3]"
                          >
                            <div className="flex items-center justify-between">
                              <MinTitle
                                text={translatedFAQ.question}
                                className={`font-medium ${
                                  faqOpen[categoryItem.category] === faqKey
                                    ? "!text-theme"
                                    : "text-tertiary"
                                }`}
                              />
                              <span
                                className={`text-lg md:text-xl lg:text-xl text-primary text-opacity-[0.6] transform transition-transform duration-300 ${
                                  faqOpen[categoryItem.category] === faqKey
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                              >
                                {faqOpen[categoryItem.category] === faqKey ? (
                                  <LuMinus />
                                ) : (
                                  <GoPlus />
                                )}
                              </span>
                            </div>

                            <div
                              ref={(el) => (contentRefs.current[faqKey] = el)}
                              style={{
                                height:
                                  faqOpen[categoryItem.category] === faqKey
                                    ? `${
                                        contentRefs.current[faqKey]
                                          ?.scrollHeight || 0
                                      }px`
                                    : "0px",
                              }}
                              className="overflow-hidden transition-all duration-500 cursor-text"
                            >
                              <MinTitle
                                text={translatedFAQ.answer}
                                className="pt-2 lg:pt-4 font-normal text-tertiary leading-[24px]"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Faq;
