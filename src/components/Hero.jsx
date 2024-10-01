"use client";

import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { calculateTimeDifference } from "@/utils";

export const Hero = () => {
  const { location, currentPrayer, fetchPrayerTimes, loading, error } =
    useAppContext();

  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState(undefined);

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(new Date());
    }
  }, [location, fetchPrayerTimes]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPrayer.nextPrayerTime) {
        setTimeUntilNextPrayer(
          calculateTimeDifference(currentPrayer.nextPrayerTime)
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrayer.nextPrayerTime]);

  if (loading)
    return <p className="text-center text-lg text-[#e2e2e1]">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };

  const currentPrayerName = capitalizeFirstLetter(currentPrayer.current);
  const nextPrayerName = capitalizeFirstLetter(currentPrayer.next);

  return (
    <section className="relative w-full min-h-[70vh] p-5 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.jpeg"
          alt="Hero Background"
          quality={100}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 w-full">
        <h1 className="text-[#e2e2e1] text-4xl md:text-5xl font-bold text-center mb-5">
          Your Prayer Times
        </h1>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="bg-[#575451] text-[#e2e2e1] text-xl rounded-lg p-5 flex items-center justify-center w-1/4">
            <MapPinIcon className="h-5 w-5 mr-2" />
            {loading ? (
              <p>Loading location...</p>
            ) : location ? (
              <p>
                {location.city}, {location.country}
              </p>
            ) : (
              <p>Location not available</p>
            )}
          </div>

          <div className="bg-[#ffc165] text-[#4A3C31] rounded-lg p-5 text-xl font-semibold text-center shadow-lg w-1/4 ">
            <p>Now: {currentPrayerName}</p>
          </div>

          <div className="bg-[#575451] rounded-lg p-5 text-[#e2e2e1] text-xl shadow-lg flex items-center justify-center w-1/4">
            <p>
              {nextPrayerName} in {timeUntilNextPrayer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
