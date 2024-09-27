import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context";

const HeroSection = () => {
  const { location, loading } = useAppContext();

  return (
    <section className="relative h-[70vh] w-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}

      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.jpeg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
          className="filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Text */}
      <div className="z-10 text-center py-10 md:py-16 w-full flex flex-col items-center">
        <div className="text-white max-w-4xl p-5 rounded-lg bg-[#756f6f]/40 mt-10">
          <div className="relative rounded-xl">
            <h1 className="arabic text-4xl font-light text-[#e2e2e1fd]/90">
              سُبْحَـٰنَ ٱلَّذِىٓ أَسْرَىٰ بِعَبْدِهِۦ لَيْلًۭا مِّنَ
              ٱلْمَسْجِدِ ٱلْحَرَامِ إِلَى ٱلْمَسْجِدِ ٱلْأَقْصَا ٱلَّذِى
              بَـٰرَكْنَا حَوْلَهُۥ لِنُرِيَهُۥ مِنْ ءَايَـٰتِنَآ ۚ إِنَّهُۥ
              هُوَ ٱلسَّمِيعُ ٱلْبَصِيرُ &#1757;
            </h1>
          </div>
          <h3 className="translation mt-1 text-lg md:text-xl text-[#e2e2e1d3]/90 italic">
            "Glory be to the One Who took His servant ˹Muḥammad˺ by night from
            the Sacred Mosque to the Farthest Mosque whose surroundings We have
            blessed, so that We may show him some of Our signs. Indeed, He alone
            is the All-Hearing, All-Seeing."
          </h3>
          <p className="text-[#e2e2e1d3]/90 text-xl font-semibold mt-9">
            Surah Al-Isra [17:1]
          </p>
        </div>

        {/* Location Pin */}
        <div className="w-1/5 max-w-md bg-[#575451b0] p-4 rounded-lg text-xl flex justify-around items-center mt-5">
          {loading ? (
            <h1>Loading location...</h1>
          ) : location ? (
            <h1 className="text-[#1AA599] font-semibold">
              {location.city}, {location.country}
            </h1>
          ) : (
            <p>Location not available</p>
          )}
          <MapPinIcon className="text-[#e2e2e1d3]/70" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
