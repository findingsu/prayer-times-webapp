"use client";

import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context";
import { CurrentPrayers } from "./CurrentPrayers";

export const Hero = () => {
  const { location, loading } = useAppContext();

  return (
    <section className="relative w-screen min-h-[65vh] md:max-h-[calc(25vh-5rem)] sm:max-h-[calc(25vh-5rem)] p-3 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.jpeg"
          alt="Hero Background"
          quality={100}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>
      <div className="z-10 inline-flex w-screen justify-between items-center gap-6 p-8 md:p-14 text-white text-center transition-all duration-300 ease-in-out border">
        {/* Quran quote - hidden on smaller screens */}
        <div className="max-w-6xl w-full p-5 mx-auto bg-[#756f6f]/40 rounded-lg hidden xl:block transition-all duration-300 ease-in-out">
          <h1 className="arabic text-2xl font-light text-[#e2e2e1]/90">
            سُبْحَـٰنَ ٱلَّذِىٓ أَسْرَىٰ بِعَبْدِهِۦ لَيْلًۭا مِّنَ ٱلْمَسْجِدِ
            ٱلْحَرَامِ إِلَى ٱلْمَسْجِدِ ٱلْأَقْصَا ٱلَّذِى بَـٰرَكْنَا
            حَوْلَهُۥ لِنُرِيَهُۥ مِنْ ءَايَـٰتِنَآ ۚ إِنَّهُۥ هُوَ ٱلسَّمِيعُ
            ٱلْبَصِيرُ &#1757;
          </h1>
          <h3 className="translation italic text-xs sm:text-sm md:text-lg lg:text-xl mt-2 md:mt-4 text-[#e2e2e1d3]/90">
            "Glory be to the One Who took His servant ˹Muḥammad˺ by night from
            the Sacred Mosque to the Farthest Mosque whose surroundings We have
            blessed, so that We may show him some of Our signs. Indeed, He alone
            is the All-Hearing, All-Seeing."
          </h3>
          <p className="text-base sm:text-lg md:text-xl font-semibold mt-3 md:mt-5 text-[#e2e2e1d3]/90">
            Surah Al-Isra [17:1]
          </p>
        </div>

        {/* Location and Current Prayers */}
        <div className="w-full max-w-6xl mt-5 transition-all duration-300 ease-in-out">
          <div className="w-full bg-[#575451b0] p-5 rounded-lg flex justify-center items-center gap-3 text-[#e2e2e1d3]/90 text-xl mb-5">
            <MapPinIcon className="text-[#e2e2e1d3]/70 w-6 h-6 " />
            {loading ? (
              <h1>Loading location...</h1>
            ) : location ? (
              <h1 className="font-semibold">
                {location.city}, {location.country}
              </h1>
            ) : (
              <p>Location not available</p>
            )}
          </div>
          <CurrentPrayers />
        </div>
      </div>
    </section>
  );
};
