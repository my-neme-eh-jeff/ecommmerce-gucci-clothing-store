import Image from "next/image";
import GridClusterImage1 from "@/Assets/Images/GridClusterImage1.png";
import GridClusterImage2 from "@/Assets/Images/GridClusterImage2.png";
import GridClusterImage3 from "@/Assets/Images/GridClusterImage3.png";
import GridClusterImage4 from "@/Assets/Images/GridClusterImage4.png";
import GridClusterImage5 from "@/Assets/Images/GridClusterImage5.png";
import { HeartIcon } from "@/Assets/Icons";

export default function ImageClusterGridComponent() {
  return (
    <div className="lg:overflow-scroll relative mx-4 space-y-4 lg:mx-0 lg:mt-10 lg:h-[76rem] lg:space-y-0 xl:mt-4 xl:h-[100rem]">
      <div className="sm:static sm:mb-4 sm:h-auto sm:w-full md:static md:mb-8 md:h-auto md:w-full md:px-4 lg:absolute lg:left-[8rem] lg:top-[4rem] lg:h-[18rem] lg:w-[13rem] xl:left-[14.688rem] xl:top-[1.938rem] xl:h-[21rem] xl:w-[16rem]">
        <Image
          className="h-full w-full rounded-lg border border-gray-300 object-cover"
          alt="Purse Image Gucci"
          loading="lazy"
          src={GridClusterImage1}
          style={{ borderRadius: "40px" }}
        />
        <h3 className="text-center uppercase">Product</h3>
      </div>
      <div className="sm:static sm:mb-4 sm:h-auto sm:w-full md:static md:mb-8 md:h-auto md:w-full md:px-4 lg:absolute lg:left-[40rem] lg:top-[6rem] lg:h-[28rem] lg:w-[28rem] xl:left-[69.125rem] xl:top-[5.938rem] xl:h-[34rem] xl:w-[34rem]">
        <Image
          className="h-full w-full rounded-lg border border-gray-300 object-cover"
          alt="Jacket Image"
          loading="lazy"
          src={GridClusterImage2}
          style={{ borderRadius: "40px" }}
        />
        <h3 className="text-center uppercase">Product</h3>
      </div>
      <div className="sm:static sm:mb-4 sm:h-auto sm:w-full md:static md:mb-8 md:h-auto md:w-full md:px-4 lg:absolute lg:left-[1rem] lg:top-[30rem] lg:h-[12rem] lg:w-[12rem] xl:left-[5.438rem] xl:top-[40.063rem] xl:h-[14rem] xl:w-[14rem]">
        <Image
          className="h-full w-full rounded-lg border border-gray-300 object-cover"
          alt="Purse Image 2"
          loading="lazy"
          src={GridClusterImage3}
          style={{ borderRadius: "40px" }}
        />
        <h3 className="text-center uppercase">Product</h3>
      </div>
      <div className="sm:static sm:mb-4 sm:h-auto sm:w-full md:static md:mb-8 md:h-auto md:w-full md:px-4 lg:absolute lg:left-[7rem] lg:top-[46rem] lg:h-[22rem] lg:w-[22rem] xl:left-[19.875rem] xl:top-[63rem] xl:h-[28rem] xl:w-[28rem]">
        <Image
          className="h-full w-full rounded-lg border border-gray-300 object-cover"
          alt="Shoes Image"
          loading="lazy"
          src={GridClusterImage4}
          style={{ borderRadius: "40px" }}
        />
        <h3 className="text-center uppercase">Product</h3>
      </div>
      <div className="sm:static sm:h-auto sm:w-full md:static md:h-auto md:w-full md:px-4 lg:absolute lg:left-[40rem] lg:top-[45rem] lg:h-[20rem] lg:w-[20rem] xl:left-[73.625rem] xl:top-[60.875rem] xl:h-[24rem] xl:w-[24rem]">
        <Image
          className="h-full w-full rounded-lg border border-gray-300 object-cover"
          alt="Single Shoe Image"
          loading="lazy"
          src={GridClusterImage5}
          style={{ borderRadius: "40px" }}
        />
        <h3 className="text-center uppercase">Product</h3>
      </div>
      <HeartIcon className="absolute hidden animate-pulse overflow-hidden lg:left-[25rem] lg:top-[27rem] lg:block lg:h-[14rem] lg:w-[14rem] xl:left-[48.25rem] xl:top-[39.438rem] xl:h-[18rem] xl:w-[18rem]" />
    </div>
  );
}
