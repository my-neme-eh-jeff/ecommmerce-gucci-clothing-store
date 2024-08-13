import CarouselComponent from "./CarouselComponent";
import ImageClusterGridComponent from "./ImageClusterGridComponent";

export default function CollectionsSection() {
  return (
    <div className="flex flex-col">
      <CarouselComponent />
      <ImageClusterGridComponent />
    </div>
  );
}
