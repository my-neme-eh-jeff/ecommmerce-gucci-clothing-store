import { ArrowRight } from "@/Assets/Icons";
import Image from "next/image";
import Link from "next/link";
import BoxReveal from "./BoxReveal";
import MagneticButtonWrapper from "./MagneticButtonWrapper";
import MainHeading from "./MainHeading";

export default async function HeroSection() {
  return (
    <div className="relative min-h-fit md:min-h-screen">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#f6cfb212] to-[#9d4e9a12]"></div>
      <div className="relative flex h-full flex-col items-center justify-center gap-y-20 pt-20">
        <div className="relative flex justify-center gap-2 md:gap-3 lg:gap-5 xl:gap-7">
          <MainHeading />
          <div className="absolute left-[48%] -z-10 -translate-x-1/2 -translate-y-1/2 transform md:top-80 lg:top-96 xl:top-[29rem]">
            <Image
              alt="CHAPA Model"
              src={"/HeroSectionModel.png"}
              placeholder="blur"
              width={1200}
              height={1000}
              priority
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGNgYGBg+LJ3hfn/A5ucQGww+H/hxOT/75+vBHEAwWgL7GHMobcAAAAASUVORK5CYII="
              className="hidden h-auto w-auto md:flex md:w-[1000px] lg:w-[700px] lg:max-w-[1200px] xl:w-[1200px]"
            />
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col items-center justify-between md:flex-row xl:mt-20 xl:px-28 xl:py-16">
          <div className="flex place-items-center gap-x-4">
            <MagneticButtonWrapper>
              <button className="text-lg background-clip[padding-box] w-fit rounded-full bg-[#FAC4A2] px-[35px] py-[50px] font-semibold transition-all duration-300 hover:bg-[#FAC4A2] hover:shadow-[0_0_0_4px_#FAC4A2] focus:outline-none focus:ring-2 focus:ring-[#FAC4A2] focus:ring-offset-2">
                CHAPA
              </button>
            </MagneticButtonWrapper>
            <p className="max-w-80">
              The world&apos;s most iconic nightclub where heritage, music and
              glamour combine. An electric mix of authenticity, spontaneity, fun
              and kudos.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="group mb-8 flex place-items-center gap-x-4 text-center">
              <Link
                href={"/"}
                className="relative text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
              >
                New Collections
                <span className="absolute bottom-0 left-0 h-1 scale-x-0 transform bg-black transition-all duration-1000 group-hover:scale-x-100"></span>
              </Link>
              <ArrowRight className="mt-2 fill-red-500 transition-transform group-hover:translate-x-[10px]" />
            </div>
            <div className="flex flex-col items-center space-y-2 text-xl md:items-start md:text-2xl lg:text-3xl xl:text-4xl">
              <BoxReveal duration={0.5} delay={0.25}>
                <Link href="/" className="group w-fit">
                  Woman
                </Link>
              </BoxReveal>
              <BoxReveal duration={0.5} delay={0.35}>
                <Link href="/" className="group w-fit">
                  Man
                </Link>
              </BoxReveal>
              <BoxReveal duration={0.55} delay={0.45}>
                <Link href="/" className="group w-fit">
                  Children
                </Link>
              </BoxReveal>
              <BoxReveal duration={0.5} delay={0.6}>
                <Link href="/" className="group w-fit">
                  Accessories
                </Link>
              </BoxReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
