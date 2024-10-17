import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import Img1 from "../assets/hero-carousel/img1.jpg";
import Img2 from "../assets/hero-carousel/img2.jpg";
import Img3 from "../assets/hero-carousel/img3.jpg";
import Img4 from "../assets/hero-carousel/img4.jpg";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8">
      <div className="md:w-1/2 w-full text-center">
        <h1 className="capitalize md:text-5xl text-3xl font-bold md:leading-tight">
          Hotels with rooftop pools near me
        </h1>
        <p className="py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          odio nesciunt praesentium corrupti voluptatum dolore tempore
          doloribus, ipsam labore ut provident deserunt unde quasi fugiat ab
          modi nulla, excepturi culpa.
        </p>
      </div>
      <div className="md:w-1/2 w-full mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src={Img1}
              className="w-full lg:h-[420px] sm:h-96 h-80"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Img2}
              className="w-full lg:h-[420px] sm:h-96 h-80"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Img3}
              className="w-full lg:h-[420px] sm:h-96 h-80"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Img4}
              className="w-full lg:h-[420px] sm:h-96 h-80"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
