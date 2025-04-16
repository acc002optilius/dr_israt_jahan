import React, { useEffect, useState, useRef } from "react";
import SectionTitle from "../../Layout/Title/SectionTitle";
import Container from "../../Layout/Container";
import { useSelector } from "react-redux";
import MinTitle from "../../Layout/Title/MinTitle";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { api } from "../../Api/Api";
import LoadingButton from "../../Layout/Button/LoadingButton";
import { useMediaQuery } from "react-responsive";
import { BsImages } from "react-icons/bs";

const GalleryOverview = ({ translations, data }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const intervalRef = useRef(null);
  const galleryRef = useRef(null);
  const navigate = useNavigate();
  
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  // Animation
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  // Initialize Fancybox
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  // Enhanced auto-scroll logic for both mobile and desktop
  useEffect(() => {
    if (!data?.length || !galleryRef.current) return;

    const scrollToItem = (index) => {
      const gallery = galleryRef.current;
      const itemCount = Math.min(data.length, 6);
      const itemWidth = gallery.scrollWidth / itemCount;
      
      setExpandedIndex(index);
      
      gallery.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    };

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (!isHovered) {
          const nextIndex = (expandedIndex + 1) % Math.min(data.length, 6);
          scrollToItem(nextIndex);
        }
      }, 2000); // Scroll every 2 seconds
    };

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only start auto-scroll if not touched (on mobile) or not hovered (on desktop)
    if (!isTouched || !isMobile) {
      startAutoScroll();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [data, expandedIndex, isMobile, isTouched, isHovered]);

  const handleItemClick = (index) => {
    setExpandedIndex(index);
    setIsTouched(true);
  };

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      setIsHovered(true);
      setExpandedIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const handleScroll = () => {
    if (isMobile && galleryRef.current) {
      const gallery = galleryRef.current;
      const scrollPosition = gallery.scrollLeft;
      const itemWidth = gallery.scrollWidth / Math.min(data.length, 6);
      const newIndex = Math.round(scrollPosition / itemWidth);
      
      if (newIndex !== expandedIndex) {
        setExpandedIndex(newIndex);
        handleTouchStart();
      }
    }
  };

  const handleTouchStart = () => {
    setIsTouched(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => {
      setIsTouched(false);
    }, 10000);
  };

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
    <div className="section_gap ">
      <Container>
        <div
          className="text-center mb-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <SectionTitle
            className="!text-center"
            text={getTranslation("Gallery", "Gallery")}
          />
          <MinTitle
            className="!text-center w-full lg:w-[50%] text-primary mx-auto py-2"
            text={getTranslation(
              "Galarry_home_included_section_desc",
              "Our commitment to excellence has earned us recognition as one of the nation's top healthcare providers."
            )}
          />
        </div>

        {/* Gallery Container */}
        <div
          ref={galleryRef}
          className={`flex overflow-x-auto snap-x snap-mandatory gap-2.5 rounded-xl ${
            isMobile ? "h-[250px] pb-4" : "h-[500px]"
          }`}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Hide scrollbar */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {data?.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className={`relative transition-all duration-500 ease-in-out overflow-hidden cursor-pointer snap-center ${
                isMobile 
                  ? "flex-shrink-0" // Prevent shrinking on mobile
                  : index === expandedIndex ? "flex-[6]" : "flex-1"
              }`}
              style={isMobile ? { width: 'calc(50% - 10px)' } : {}}
              onClick={() => handleItemClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={`${api}/${item.image}`}
                data-fancybox="gallery"
                data-caption={item.caption}
              >
                <img
                  src={`${api}/${item.image}`}
                  alt={item.caption}
                  className={`w-full h-full ${
                    !isMobile && index !== data.length - 1 ? "border-r-2 border-white" : ""
                  } object-cover`}
                />
              </a>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-4 lg:hidden">
          {data?.slice(0, 6).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === expandedIndex ? "bg-theme" : "bg-gray-300"
              }`}
              onClick={() => {
                const gallery = galleryRef.current;
                const itemWidth = gallery.scrollWidth / Math.min(data.length, 6);
                gallery.scrollTo({
                  left: itemWidth * index,
                  behavior: 'smooth'
                });
                setExpandedIndex(index);
                setIsTouched(true);
              }}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <div className="inline-block pt-4">
            <LoadingButton
              className="inline-block"
              loadingTime="1000"
              icon={<BsImages />}
              text={getTranslation("View All", "View All")}
              onClick={() => navigate("/gallery")}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GalleryOverview;