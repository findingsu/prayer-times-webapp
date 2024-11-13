"use client";

import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context";
import { useEffect, useState, useMemo } from "react";
import { calculateTimeDifference } from "@/utils";
import { format } from "date-fns";

export const Hero = () => {
  const { location, currentPrayer, fetchPrayerTimes, loading, selectedDate } =
    useAppContext();
  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState(null);

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(new Date());
    }
  }, [location, fetchPrayerTimes]);

  useEffect(() => {
    if (currentPrayer?.nextPrayerTime) {
      const updateTime = () => {
        const timeDifference = calculateTimeDifference(
          currentPrayer.nextPrayerTime
        );
        setTimeUntilNextPrayer(timeDifference);
      };
      updateTime();
      const timerId = setInterval(updateTime, 1000);
      return () => clearInterval(timerId);
    }
  }, [currentPrayer?.nextPrayerTime]);

  const locationText = useMemo(() => {
    return loading
      ? "Loading location..."
      : location
      ? `${location.city}, ${location.country}`
      : "Location not available";
  }, [loading, location]);

  const isToday =
    format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.jpeg"
          alt="Hero Background"
          quality={100}
          fill
          priority
          className="object-cover transform scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <h1
          className="text-[--beigeTxt] text-2xl md:text-4xl font-bold text-center mb-8 
                     leading-tight"
        >
          Your Prayer Times
        </h1>

        <div className="flex flex-col gap-4 items-center">
          <div
            className="bg-white/10 backdrop-blur-xl text-[--beigeTxt] text-lg 
                        rounded-md p-5 flex items-center justify-center 
                        border border-white/15 shadow-lg w-full md:w-2/3"
          >
            <MapPinIcon className="h-6 w-6 mr-3 text-[--lightBrownTxt]" />
            <p className="font-medium">{locationText}</p>
          </div>

          {isToday && currentPrayer?.current && (
            <div
              className="bg-[--highlight] text-[--darkBrownTxt] rounded-md p-5 
                          text-2xl font-bold text-center shadow-lg 
                          transform hover:scale-105 transition-transform 
                          duration-300 w-full md:w-2/3"
            >
              <p>
                Current Prayer:{" "}
                {currentPrayer.current.charAt(0).toUpperCase() +
                  currentPrayer.current.slice(1)}
              </p>
            </div>
          )}

          {isToday && currentPrayer?.next && timeUntilNextPrayer && (
            <div
              className="bg-white/10 backdrop-blur-md rounded-md p-5 
                          text-[--beigeTxt] text-2xl shadow-lg 
                          border border-white/20 w-full md:w-2/3"
            >
              <p className="text-center">
                <span className="font-bold">
                  {currentPrayer.next.charAt(0).toUpperCase() +
                    currentPrayer.next.slice(1)}
                </span>{" "}
                in {timeUntilNextPrayer}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
