"use client";
import { HeartIcon } from "lucide-react";
import SpotLightImage from "@/Assets/Images/SpotlightImage.png";
import Image from "next/image";
import { ArrowRight, CloudIcon } from "@/Assets/Icons";
import { Spotlight } from "./SpotlightWrapper";
import ShimmerButton from "@/components/ShimmerButton";

export default function SpotlightSection() {
  return (
    <div className="relative mx-auto mb-20 h-auto w-[400px] max-w-[1500px] justify-center overflow-clip rounded-[30px] bg-red-600 p-8 sm:w-full sm:rounded-[41px] md:rounded-[55px] lg:rounded-[73px]">
      <Spotlight
        className="md:left-25 left-16 top-0 sm:-left-10 sm:-top-20 md:-top-15 lg:-top-20 lg:left-0"
        fill="#8D899C"
      />
      {/* <div className="absolute left-16 top-20 z-50 h-2 w-2 bg-black"></div> */}
      <div className="flex flex-wrap justify-center sm:flex-nowrap md:justify-normal">
        <h3 className="mb-1 block w-full text-2xl text-white sm:hidden">
          Spotlight on:
        </h3>
        <div className="min-w-[250px] max-w-[300px] place-content-center md:mr-24 md:max-w-none lg:h-[475px] lg:w-[500px]">
          <Image
            src={SpotLightImage}
            alt="GUCCI Jacket"
            loading="lazy"
            className="rounded-[30px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[53px]"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="my-auto flex grow flex-col sm:ml-14 md:ml-0 md:flex-grow-0">
          <h3 className="mb-1 hidden text-2xl text-white sm:block">
            Spotlight on:
          </h3>
          <h1 className="mt-4 flex w-full justify-center text-nowrap text-center text-4xl font-bold leading-[0.7] text-white sm:hidden">
            The makers stich
          </h1>
          <h1 className="hidden text-5xl font-bold leading-[0.8] text-white sm:block md:text-6xl lg:text-9xl">
            The
          </h1>
          <h1 className="hidden text-5xl font-bold leading-[0.8] text-white sm:block md:text-6xl lg:text-9xl">
            makers
          </h1>
          <h1 className="hidden text-5xl font-bold leading-[0.8] text-white sm:block md:text-6xl lg:text-9xl">
            stich
          </h1>
          <ShimmerButton className="mt-4 flex h-10 w-full place-items-center justify-center rounded-md bg-white text-xl text-black sm:h-12 sm:w-48 md:h-14 md:w-56 lg:h-16 lg:w-64">
            View Collection
            <ArrowRight className="ml-1" />
          </ShimmerButton>
        </div>
      </div>
      <CloudIcon className="absolute -right-7 bottom-20 hidden lg:block lg:h-[115px] lg:w-[230px] xl:h-[139.52px] xl:w-[264px]" />
      <HeartIcon className="absolute right-6 top-10 hidden fill-red-600 text-white md:block md:h-16 md:w-16 lg:h-24 lg:w-24" />
    </div>
  );
}
