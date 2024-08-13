"use client";
import CarouselImage1 from "@/Assets/Images/CarouselImage1.png";
import CarouselImage2 from "@/Assets/Images/CarouselImage2.png";
import CarouselImage3 from "@/Assets/Images/CarouselImage3.png";
import CarouselImage4 from "@/Assets/Images/CarouselImage4.png";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./carouselComponentStyles.css";
import Link from "next/link";

export default function CarouselComponent() {
  const carouselProducts = [
    {
      image: CarouselImage1,
      title: "CHAPA GUCCI 1",
    },
    {
      image: CarouselImage2,
      title: "CHAPA GUCCI 2",
    },
    {
      image: CarouselImage3,
      title: "CHAPA GUCCI 3",
    },
    {
      image: CarouselImage4,
      title: "CHAPA GUCCI 4",
    },
    {
      image: CarouselImage1,
      title: "CHAPA GUCCI 5",
    },
  ];

  return (
    <div className="mx-4 lg:mx-6 xl:mx-8">
      <h1 className="mb-4 text-5xl uppercase drop-shadow-md">Collections</h1>
      <div className="h-[40rem]">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1536: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          grabCursor={true}
          loop={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          className="carouselSwiperComponent"
        >
          {carouselProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="group flex h-[40rem] flex-col gap-3">
                <div className="h-[36rem] w-full bg-gray-200">
                  <Image
                    height={400}
                    width={400}
                    alt={product.title}
                    src={product.image}
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                <Link href="/" className="w-fit">
                  <span className="ml-2 w-fit bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
                    {product.title}
                  </span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
