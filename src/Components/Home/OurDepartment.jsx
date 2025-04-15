import React, { useEffect } from "react";
import SectionTitle from "../../Layout/Title/SectionTitle";
import Container from "../../Layout/Container";
import { useSelector } from "react-redux";
import MinTitle from "../../Layout/Title/MinTitle";
import MidTitle from "../../Layout/Title/MidTitle";
import { api } from "../../Api/Api";
import AOS from "aos";
import "aos/dist/aos.css";
const OurDepartment = ({ translations, department }) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  
  // Animation
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
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
        name: item.name,
        short_description: item.short_description,
      };
    }

    // Find matching translation for current language
    const translation = item.translations.find(
      (t) => t.lang_code === selectedLanguage.lang_code
    );


    return {
      name: translation?.name || item.name,
      short_description:
        translation?.short_description || item.short_description,
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
          <SectionTitle
            className="!text-center"
            text={getTranslation("Our_Departments", "Our Departments")}
          />
          <MinTitle
            className="!text-center w-full lg:w-[50%] text-primary m-auto py-2"
            text={getTranslation(
              "Our_Department_Home_Desc",
              "Our commitment to excellence has earned us recognition as one of the nation's top healthcare providers."
            )}
          />
          <div className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {department?.map((item, index) => {
                const content = getTranslatedContent(item);
                console.log(content);
                
                return (
                  <div
                    key={index}
                    data-aos="zoom-in"
                    data-aos-duration="800"
                    onClick={() => handleGoSingleDepartMentPage(item.slug)}
                    className="p-6 bg-theme  border-[1px] border-theme rounded-md group hover:!bg-transparent !transition-all !duration-500 !ease-in-out"
                  >
                    <div className="bg-[#DEE5E3] w-[50px] h-[50px] text-theme group-hover:bg-theme group-hover:text-[#DEE5E3] flex justify-center items-center m-auto rounded-full border-[1px] border-theme">
                    <i className={`${item.icon}`}></i>
                      {/* <img
                        src={`${api}/${item.icon}`}
                        alt=""
                        className="w-full h-full object-fill"
                        loading="lazy"
                      /> */}
                    </div>
                    <MidTitle
                      className="font-semibold text-secondary !text-lg text-center group-hover:text-theme pt-2 truncate"
                      text={content.name}
                    />

                    <MinTitle
                      className="text-secondary text-center py-2 group-hover:text-theme "
                      text={
                        content.short_description.length > 80
                          ? content.short_description.slice(0, 80) + "..."
                          : content.short_description
                      }
                    />
                    <p className="text-secondary text-center text-sm cursor-pointer group-hover:text-theme hover:underline inline-block flex justify-center duration-300">
                      {getTranslation("Read_More", "Read More")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurDepartment;
