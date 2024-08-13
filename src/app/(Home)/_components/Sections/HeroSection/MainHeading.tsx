import { CharacterA, CharacterC, CharacterH, CharacterP } from "./TitleSVG";

export default function MainHeading() {
  return (
    <>
      <span className="relative h-auto w-12 sm:w-20 md:w-36 lg:w-48 xl:w-52">
        <CharacterC width="100%" height="100%" />
      </span>
      <span className="relative h-auto w-12 sm:w-20 md:w-36 lg:w-48 xl:w-52">
        <CharacterH width="100%" height="100%" />
      </span>
      <span className="relative h-auto w-12 sm:w-20 md:w-36 lg:w-48 xl:w-52">
        <CharacterA width="100%" height="100%" />
      </span>
      <span className="relative h-auto w-12 sm:w-20 md:w-36 lg:w-48 xl:w-52">
        <CharacterP width="100%" height="100%" />
      </span>
      <span className="relative h-auto w-12 sm:w-20 md:w-36 lg:w-48 xl:w-52">
        <CharacterA width="100%" height="100%" />
      </span>
    </>
  );
}

export const LogoVersion = () => (
  <>
    <div className="flex gap-1 md:gap-2">
      <span className="relative h-auto w-6 sm:w-8">
        <CharacterC width="100%" height="100%" />
      </span>
      <span className="relative h-auto w-6 sm:w-8">
        <CharacterH width="100%" height="100%" />
      </span>
      <span className="relative h-auto w-6 sm:w-8">
        <CharacterA width="100%" height="100%" />
      </span>
      <span className="relative h-auto w-6 sm:w-8">
        <CharacterP width="100%" height="100%" />
      </span>
      <span className="relative h-auto w-6 sm:w-8">
        <CharacterA width="100%" height="100%" />
      </span>
    </div>
  </>
);
