// Banner.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {


    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };


  return (
    <div className="w-full h-[400px] overflow-hidden">
      <Slider {...settings}>
        <div>
          <img
            src="/images/banner1.jpg"
            alt="Banner 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/images/banner2.jpg"
            alt="Banner 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/images/banner3.jpg"
            alt="Banner 3"
            className="w-full h-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
