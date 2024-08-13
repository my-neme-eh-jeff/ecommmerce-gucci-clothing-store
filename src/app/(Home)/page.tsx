import { Loader } from "lucide-react";
import Navbar from "./_components/Navbar";
import dynamic from "next/dynamic";
const CollectionsSection = dynamic(
  () => import("./_components/Sections/CollectionSection"),
  {
    loading: () => (
      <div className="flex place-items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    ),
  },
);
const HeroSection = dynamic(
  () => import("./_components/Sections/HeroSection"),
  {
    loading: () => (
      <div className="flex place-items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    ),
  },
);
const SpotlightSection = dynamic(
  () => import("./_components/Sections/Spotlight"),
  {
    loading: () => (
      <div className="flex place-items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    ),
    ssr: false,
  },
);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex flex-col gap-24">
        <HeroSection />
        <CollectionsSection />
        <SpotlightSection />
      </main>
    </div>
  );
}
