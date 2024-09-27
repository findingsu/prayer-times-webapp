import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import NavBar from "./NavBar";

const HeroSection = () => {
  return (
    <section className="relative h-[65vh] w-screen flex items-center justify-center">
      <div className="absolute inset-0 ">
        <Image
          src="/assets/hero.jpeg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
        />
        {/* Dark Overlay to make text stand out */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      {/* Hero Content (Text + Button) */}
      <div className="relative z-10 text-white text-center py-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Find your prayer Times
        </h2>
        <p className="text-xl md:text-2xl mb-8">
          Accurate prayer times for your location
        </p>
        <button className="bg-[#4299E1] flex items-center text-white px-4 py-2 rounded hover:bg-[#3182CE]">
          <MapPinIcon className="h-4 w-4 mr-2" />
          Set Location
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
