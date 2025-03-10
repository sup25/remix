import React, { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { AiOutlineLine } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "@remix-run/react";
import { slides } from "./slides";

const Slider = () => {
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [iconSize, setIconSize] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      setIconSize(isMobileView ? 50 : 80);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const swiperParams = {
    modules: [Navigation, Autoplay],
    slidesPerView: isMobile ? 1 : 3,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    speed: 600,
    navigation: {
      prevEl: ".prev-slide",
      nextEl: ".next-slide",
    },
  };

  return (
    <div className="w-full  flex items-center justify-center">
      <div className="relative w-full max-w-screen-xl h-fit bg-gray-50 pb-20  ">
        <Swiper
          {...swiperParams}
          key={isMobile ? "mobile" : "desktop"}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className={`w-full h-[600px]`}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              virtualIndex={index}
              className="py-10 px-3 lg:px-0 w-full flex flex-col"
            >
              <Link to={"/products"}>
                <div className="relative w-full h-full   overflow-hidden rounded-xl bg-gray-800 shadow-lg">
                  <img
                    src={slide.imageUrl}
                    className="w-full h-full object-cover"
                    alt={`Slide ${index + 1}`}
                    loading="lazy"
                  />
                </div>
                <p className="text-black font-Arima font-bold text-2xl mt-3">
                  {slide.cat}
                </p>
              </Link>
            </SwiperSlide>
          ))}
          {/* Navigation Arrows */}
          {!isMobile && (
            <>
              <button className="prev-slide absolute left-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-black hover:bg-white/50 transition-all duration-300">
                <BiChevronLeft className="w-6 h-6" />
              </button>
              <button className="next-slide absolute right-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-black hover:bg-white/60 transition-all duration-300">
                <BiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </Swiper>
        {/* Slide Counter with line icons */}
        <div className="absolute flex  left-1/2 -translate-x-1/2 text-white/70  font-light px-3 py-2 rounded-full">
          {slides.map((_, index) => (
            <AiOutlineLine
              key={index}
              className={`mx-1 transition duration-300 ease-in-out ${
                index === activeIndex ? "text-black font-bold" : "text-black/50"
              }`}
              size={iconSize}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
