import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context";
import CurrentPrayers from "./CurrentPrayers";

const HeroSection = () => {
  const { location, loading } = useAppContext();

  return (
    <section className="relative w-full p-3 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.jpeg"
          alt="Hero Background"
          quality={75}
          fill
          className="object-cover filter brightness-75 contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-around items-center gap-6 md:gap-20 p-5 md:p-14 text-white">
        {/* Quran Verse Section */}
        <div className="w-full p-5 bg-[#756f6f]/40 rounded-lg text-center md:text-left">
          <h1 className="arabic text-3xl font-light text-[#e2e2e1]/90">
            سُبْحَـٰنَ ٱلَّذِىٓ أَسْرَىٰ بِعَبْدِهِۦ لَيْلًۭا مِّنَ ٱلْمَسْجِدِ
            ٱلْحَرَامِ إِلَى ٱلْمَسْجِدِ ٱلْأَقْصَا ٱلَّذِى بَـٰرَكْنَا
            حَوْلَهُۥ لِنُرِيَهُۥ مِنْ ءَايَـٰتِنَآ ۚ إِنَّهُۥ هُوَ ٱلسَّمِيعُ
            ٱلْبَصِيرُ &#1757;
          </h1>
          <h3 className="translation italic text-sm md:text-lg lg:text-xl mt-2 md:mt-4 text-[#e2e2e1d3]/90">
            "Glory be to the One Who took His servant ˹Muḥammad˺ by night from
            the Sacred Mosque to the Farthest Mosque whose surroundings We have
            blessed, so that We may show him some of Our signs. Indeed, He alone
            is the All-Hearing, All-Seeing."
          </h3>
          <p className="text-lg md:text-xl font-semibold mt-3 md:mt-5 text-[#e2e2e1d3]/90">
            Surah Al-Isra [17:1]
          </p>
        </div>

        {/* Location Pin and Current Prayers */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
          <div className="w-full bg-[#575451b0] p-4 rounded-lg flex justify-between items-center text-[#1AA599]">
            {loading ? (
              <h1>Loading location...</h1>
            ) : location ? (
              <h1 className="font-semibold">
                {location.city}, {location.country}
              </h1>
            ) : (
              <p>Location not available</p>
            )}
            <MapPinIcon className="text-[#e2e2e1d3]/70 w-6 h-6 md:w-8 md:h-8" />
          </div>
          <CurrentPrayers />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
