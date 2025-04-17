import React, { useEffect, useState } from "react";
import SectionTitle from "../Layout/Title/SectionTitle";
import Container from "../Layout/Container";
import { useSelector } from "react-redux";
import MinTitle from "../Layout/Title/MinTitle";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { api } from "../Api/Api";
import LoadingButton from "../Layout/Button/LoadingButton";
import { BsImages } from "react-icons/bs";
import { galleryApi } from "../Api/Api";
import axios from "axios";
import { IoReloadSharp } from "react-icons/io5";

const Gallery = () => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [translations, setTranslations] = useState({});
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(galleryApi);
        setTranslations(response.data.data.translations || {});
        setData(response.data.data?.images || []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Animation
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handlLoadMore = () => {
    setVisibleItems((prev) => prev + 12); // Fixed to increment by 12 each time
  };

  // Get translation for a specific key
  const getTranslation = (key, defaultText) => {
    if (!translations || !selectedLanguage) return defaultText;

    const translationArray = translations[key];
    if (!translationArray) return defaultText;

    const translation = translationArray.find(
      (item) => item.lang_code === selectedLanguage?.lang_code
    );
    return translation ? translation.value : defaultText;
  };

  // Get caption for a specific image
  const getImageCaption = (imageData) => {
    if (!imageData.translations || !selectedLanguage)
      return imageData.caption || "";

    const translation = imageData.translations.find(
      (item) => item.lang_code === selectedLanguage.lang_code
    );
    return translation ? translation.caption : imageData.caption || "";
  };

  // Initialize Fancybox properly
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
      caption: (fancybox, slide) => {
        const imgIndex = slide.index;
        const imageData = data[imgIndex];
        return getImageCaption(imageData);
      },
    });

    return () => {
      Fancybox.unbind("[data-fancybox='gallery']");
      Fancybox.close();
    };
  }, [data, selectedLanguage]); // Re-initialize when data or language changes

  return (
    <div className="py-sectionSm md:py-sectionMd lg:py-sectionLg xl:py-sectionLg">
      <Container>
        <div
          className="text-center mb-4"
          data-aos="fade-in"
          data-aos-duration="500"
          data-aos-delay="200"
        >
          <SectionTitle
            className="!text-center"
            text={getTranslation("Gallery", "Gallery")}
          />
          <MinTitle
            className="!text-center w-full sm:w-[50%] text-primary mx-auto py-2"
            text={getTranslation(
              "Galarry_home_included_section_desc",
              "Our commitment to excellence has earned us recognition as one of the nation's top healthcare providers."
            )}
          />
        </div>

        {/* Gallery Container */}
        <div className="pt-2" data-aos="fade-up">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[...Array(visibleItems)].map((_, index) => (
                <div key={index} className="aspect-[4/4] overflow-hidden bg-skeletonLoading animate-pulse rounded-lg">
                  <div className="w-full h-full bg-skeletonLoading animate-pulse rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {data?.slice(0, visibleItems).map((item, index) => (
                <div key={index} className="group aspect-[4/4] overflow-hidden rounded-lg">
                  <a
                    href={`${api}/${item.image}`}
                    data-fancybox="gallery"
                    data-caption={getImageCaption(item)}
                    className="block object-fill w-full h-full"
                  >
                    <img
                      src={`${api}/${item.image}`}
                      alt={getImageCaption(item)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}
            </div>
          )}
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
      </Container>
    </div>
  );
};

export default Gallery;